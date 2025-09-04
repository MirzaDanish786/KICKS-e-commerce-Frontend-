import React, { useState, useEffect } from "react";
import { useNavigate, Link, data } from "react-router-dom";
import useRedirectIfAuthenticated from "../../../hooks/useRedirectIfAuthenticated";
import Logo from "../../../assets/images/Logo.png";
import toast from 'react-hot-toast';
import Loading from "../../reuseable/Loading";
import { useSearchParams } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const [searchParams] = useSearchParams()
  const isEmailUpdated = searchParams.get('emailUpdated');
  const newEmail = searchParams.get('newEmail');
  
  useEffect(() => {
  if (isEmailUpdated === "true" && newEmail) {
    setEmail(newEmail); // Pre-fill the email field
    toast.success("Email successfully changed!");
  }
}, [isEmailUpdated, newEmail]);
  
  useRedirectIfAuthenticated();

  const login = async (email, password) => {
    setErrorMsg("");
    setIsLoading(true)
    let response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: "include",
    });
    if (response.ok) {
      setEmail("");
      setPassword("");
      navigate("/");
      toast.success("Login successful!");
    } else {
      const errData = await response.json();
      toast.error(errData.message || 'Invalid credentials')
      setErrorMsg(errData.message || "Login failed.");
    }
    setIsLoading(false)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleSendOTP = async() => {
    setIsLoading(true)
    let response = await fetch(`${API_BASE_URL}/api/auth/send-otp`,{
      method: 'POST',
      credentials: 'include',
    }
    )
    let data = await response.json();
    setIsLoading(false)
    console.log(data)
  }
  

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {isLoading && <Loading/>}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src={Logo} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                name="email"
                id="email"
                autoComplete="email"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                value={password}
                id="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {/* Forgot password link */}
            <div className="mt-2 text-right">
              <Link
                to="/send-otp"
                className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                onClick={handleSendOTP}
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;