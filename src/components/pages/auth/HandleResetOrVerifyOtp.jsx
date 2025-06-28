import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../../assets/images/Logo.png";

// MUI imports
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import Loading from "../../reuseable/Loading";

const HandleResetOrVerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Send verify email otp
  const sendVerifyEmailOTP = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/send-verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      });
      console.log(email)

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Failed to send OTP')
        console.log(data)
        throw new Error(data.message || "Failed to send OTP");
      }
      else{
        toast.success(data.message || 'OTP send successfully')
      }

      return data;
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  };

  // Send reset otp
  const sendResetPasswordOTPEmail = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/send-reset-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      });
      console.log(email)


      const data = await response.json();

      if (!response.ok) {
        console.log(data)
        toast.error(data.message || 'Failed to send OTP')
        throw new Error(data.message || "Failed to send OTP");
      }
      else{
        toast.success(data.message || 'OTP send successfully')
      }

      return data;
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg("");
    setLoading(true);
    try {
      const isVerifyEmail = await fetch(`${API_BASE_URL}/api/auth/check-email-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
        }),
      });

      if (isVerifyEmail.ok) {
        await sendResetPasswordOTPEmail();
        navigate("/verify-reset-otp");
      }
      else{
        toast.error('Please verify your account first!')
        await sendVerifyEmailOTP()
        navigate('/verify-email')
      }

    } catch (error) {
      // Show dialog if API says "Please verify your account first!"
      if (error.message === "Please verify your account first!") {
        setOpenDialog(true);
      } else {
        setErrorMsg(error.message || "An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }

  };

  const handleVerifyNow = () => {
    setOpenDialog(false);
    navigate("/verify-email"); // <-- Set your actual verify email route if different
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {loading && <Loading/>}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={Logo} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Forgot your password?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Enter your email and we'll send you a 6-digit OTP to reset your
          password.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {errorMsg && (
            <div className="text-red-600 text-center text-sm">{errorMsg}</div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                value={email}
                autoComplete="email"
                required
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300"
              disabled={loading || !email}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send OTP"
              )}
            </button>
          </div>
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

      {/* Dialog for verify account */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Verify Your Account</DialogTitle>
        <DialogContent>
          Please verify your account first to continue. Click below to verify
          your email.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVerifyNow} variant="contained" color="primary">
            Verify Now
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HandleResetOrVerifyOtp;
