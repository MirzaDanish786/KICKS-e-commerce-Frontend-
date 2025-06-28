import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Logo from "../../../assets/images/Logo.png";
import toast from "react-hot-toast";
import Loading from "../../reuseable/Loading";

const OTP_LENGTH = 6;

const VerifyResetOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Handle OTP box change
  const handleOtpChange = (e, idx) => {
    const { value } = e.target;
    if (!/^[0-9]?$/.test(value)) return; // Only allow single digit number

    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    setErrorMsg("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email) {
      setErrorMsg("Email is required.");
      return;
    }
    if (otp.some((d) => d === "")) {
      setErrorMsg("Please enter all 6 digits of the OTP.");
      return;
    }
    if (!newPassword) {
      setErrorMsg("Please enter a new password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/verify-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          resetOtp: otp.join(""),
          newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || 'Passowrd reset successfully!')
        setSuccessMsg(data.message || "Password reset successfully!");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setErrorMsg(data.message || "Failed to reset password.");
        toast.error(data.message || 'Something went wrong!')
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-full flex flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      { loading && <Loading/>}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-10 w-auto" src={Logo} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Enter the <span className="font-semibold">6-digit OTP</span> sent to your email and your new password.
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="bg-white p-6 rounded-md shadow-lg space-y-6" onSubmit={handleSubmit} autoComplete="off">
          {/* {errorMsg && (
            <div className="text-red-600 text-center text-sm">{errorMsg}</div>
          )}
          {successMsg && (
            <div className="text-green-600 text-center text-sm">{successMsg}</div>
          )} */}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm"
                required
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Modern OTP Inputs */}
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-900 mb-2">
              6-digit OTP
            </label>
            <div className="flex justify-center gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-12 h-12 text-center border border-gray-300 rounded-md text-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={handlePaste}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  autoFocus={idx === 0}
                  aria-label={`OTP Digit ${idx + 1}`}
                  required
                />
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-900">
              New Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="new-password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                placeholder="Enter new password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition disabled:bg-indigo-300"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyResetOtp;