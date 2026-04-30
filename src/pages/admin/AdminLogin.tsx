import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
export function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Femous2024') {
      sessionStorage.setItem('admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid password');
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#2B3A55]/10">
            <Lock className="h-8 w-8 text-[#2B3A55]" />
          </div>
          <h1 className="font-fraunces text-2xl text-[#2B3A55]">
            Admin Access
          </h1>
          <p className="mt-2 font-inter text-sm text-gray-500">
            Enter your password to access the dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter password"
              className={`w-full rounded-lg border p-4 font-inter outline-none transition-colors ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#D4A373]'}`} />
            
            {error &&
            <p className="mt-2 font-inter text-sm text-red-500">{error}</p>
            }
          </div>
          <button
            type="submit"
            className="mt-4 rounded-lg bg-[#D4A373] py-4 font-inter font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]">
            
            Login
          </button>
        </form>
      </div>
    </div>);

}