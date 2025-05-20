import React, { useState } from 'react'

const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  // const {signup, isSigningUp} = useAuthStore();

  const validateForm = () => {
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
   
  }
  

  return (
      <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
          
          <form class="space-y-4">
            <div>
              <label className="input validator">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  type="text"
                  required
                  placeholder="Username"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minlength="3"
                  maxlength="30"
                  title="Only letters, numbers or dash"
                />
              </label>
              <p className="validator-hint">
                Must be 3 to 30 characters
                <br />containing only letters, numbers or dash
              </p>

            </div>.

            <div>
                        <label className="input validator">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input type="email" placeholder="mail@site.com" required />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center">
                <input type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                <span class="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" class="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>

            <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
              Sign In
            </button>
          </form>

          <div class="mt-6 text-center text-sm text-gray-600">
            Don't have an account? 
            <a href="#" class="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</a>
          </div>
        </div>
      </div>
  )
}

export default SignUp
