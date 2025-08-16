import React from 'react';
import './signup.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import InputField from '../../components/InputField/Input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../axios/axiosInterceptor';
import useAuthStore from '../../store/authStore';
import SideImage from "../../assets/dashboard.png"
// ✅ Form validation schema
const schema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email address'),
  password: z.string().nonempty('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.login); // Zustand login action

  const { control, handleSubmit,formState: { isValid } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log('Form Data:', data);
      const response = await api.post('/auth/login', data);

      if (response.status === 200) {
        toast.success('Login successful');

        // ✅ Update Zustand store (sets isAuthenticated = true)
        loginUser(response.data.token, response.data.user);

        navigate('/candidates', { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <header className="header">
        <div className="logo-box"></div>
        <p className="logo-text">LOGO</p>
      </header>

      {/* Main */}
      <div className="register-container">
        {/* Left */}
        <div className="left-panel">
          <img
           src={SideImage}
            alt="Dashboard Preview"
            className="dashboard-img"
          />
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod
          </h2>
          <p>
            Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Right */}
        <div className="right-panel">
          <h2>Welcome to Dashboard</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="Email"
              placeholder="Email"
              name="email"
              control={control}
              rules={{ required: 'Email is required' }}
              required
            />
            <InputField
              type="password"
              label="Password"
              placeholder="Password"
              name="password"
              control={control}
              rules={{ required: 'Password is required' }}
              required
            />

            <button  type="submit" className={`register-btn ${!isValid && 'disable_class'}`}>
              Login
            </button>
          </form>

          <p className="login-text">
            Don&apos;t have an account?{' '}
            <a
              onClick={() => navigate('/signup')}
              style={{ cursor: 'pointer' }}
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
