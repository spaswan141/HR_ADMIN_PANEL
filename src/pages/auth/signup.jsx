import React from "react";
import "./signup.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InputField from "../../components/inputField/Input";
import { useNavigate } from "react-router-dom";
import api from "../../axios/axiosInterceptor";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// Validation schema
const schema = z
  .object({
    fullName: z
      .string()
      .nonempty("Full Name is required")
      .min(5, "Full Name must be at least 5 characters"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .nonempty("Confirm Password is required")
      .min(8, "Confirm Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, reset,formState: { isValid } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      const response = await api.post("/auth/register", data);

      if (response.status === 200) {
        toast.success("User registered successfully");


        reset();
        // navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Header with Logo */}
      <header className="header">
        <div className="logo-box"></div>
        <h3 className="logo-text">LOGO</h3>
      </header>

      {/* Main Content */}
      <div className="register-container">
        {/* Left Section */}
        <div className="left-panel">
          <img
            src="/src/assets/dashboard.png"
            alt="Dashboard Preview"
            className="dashboard-img"
          />
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          </h2>
          <p>
            Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-panel">
          <h2>Welcome to Dashboard</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="Full Name"
              placeholder="Full Name"
              name="fullName"
              control={control}
              required
            />
            <InputField
              label="Email"
              placeholder="Email"
              name="email"
              control={control}
              required
            />
            <InputField
              type="password"
              label="Password"
              placeholder="Password"
              name="password"
              control={control}
              required
            />
            <InputField
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              name="confirmPassword"
              control={control}
              required
            />

           <button  type="submit" className={`register-btn ${!isValid && 'disable_class'}`}>
              Register
            </button>
          </form>

          <p className="login-text">
            Already have an account?{" "}
            <a
              onClick={() => {
                navigate("/login");
              }}
              style={{ cursor: "pointer" }}
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
