import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/Logo.png";
import toast from 'react-hot-toast';
import Loading from "../../reuseable/Loading";


const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [isLoading, setIsLoading] = useState(false)

  // Handle text input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle profile picture selection
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    setIsLoading(true)
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    if (res.ok) {
      toast.success(data.message || 'Account Created!')
      navigate("/");
    } else {
      toast.error(data.message || 'Something went wrong!')
      setError(data.message || "Signup failed");
    }
    setIsLoading(false)
  };

  return (
    <div className="max-w-md mx-auto py-10">
      {isLoading && <Loading/>}
      <img src={Logo} alt="Logo" className="h-10 mx-auto mb-4" />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex justify-center mb-4">
          <label htmlFor="profilePic" className="cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-indigo-500 overflow-hidden">
              {preview ? (
                <img src={preview} className="object-cover w-full h-full" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                  Add Image
                </div>
              )}
            </div>
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="hidden"
            />
          </label>
        </div>

        {error && (
          <div className="text-red-500 text-sm mb-2 text-center">{error}</div>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
