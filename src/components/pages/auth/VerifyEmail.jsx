import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../reuseable/Loading";

const OTP_LENGTH = 6;

export default function VerifyEmail({ onSubmit, loading }) {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Handle OTP box change
  const handleChange = (e, idx) => {
    const { value } = e.target;
    if (!/^[0-9]?$/.test(value)) return; // Only single digit number

    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    setError("");

    // Move focus to next box
    if (value && idx < OTP_LENGTH - 1) {
      inputRefs.current[idx + 1].focus();
    }
  };

  // Handle backspace to move focus
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    const pasted = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
      .split("");
    if (pasted.length === OTP_LENGTH) {
      setOtp(pasted);
      inputRefs.current[OTP_LENGTH - 1].focus();
    }
    e.preventDefault();
  };

  const verifyEmail = async () => {
    setIsLoading(true)
    let response = await fetch(`${API_BASE_URL}/api/auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ verifyOtp: otp.join("") }),
      credentials: "include",
    });
    let data = await response.json();
    setIsLoading(false)
    if (response.ok) {
      toast.success(data.message || "Account verified!");
      navigate("/login");
    } else {
      toast.error(data.message || "Something went wrong!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyEmail();
    if (otp.some((d) => d === "")) {
      setError("Please enter all 6 digits.");
      return;
    }
    setError("");
    onSubmit && onSubmit(otp.join(""));
  };
 
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-lg">
      {isLoading && <Loading/>}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Verify Your Email
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Please enter the <span className="font-semibold">6-digit code</span>{" "}
        sent to your email.
      </p>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="flex justify-center gap-3 mb-4">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-12 h-12 text-center border border-gray-300 rounded-md text-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              ref={(el) => (inputRefs.current[idx] = el)}
              autoFocus={idx === 0}
              aria-label={`OTP Digit ${idx + 1}`}
            />
          ))}
        </div>
        {/* {error && <div className="text-red-500 text-center mb-2">{error}</div>} */}
        <button
          type="submit"
          className="w-full py-2 mt-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition disabled:bg-indigo-300"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
      {/* Optionally add resend code link */}
      <p className="text-sm text-center text-gray-500 mt-4">
        Didn't receive the code?{" "}
        <button className="text-indigo-600 hover:underline">Resend</button>
      </p>
    </div>
  );
}
