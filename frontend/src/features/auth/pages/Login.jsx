import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useSelector } from 'react-redux'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handleLogin } = useAuth()

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)

  const navigate= useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    await handleLogin({ email, password })
    navigate('/')
  }


  if(user){
    navigate('/')
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#07090f]">
      <div className="w-full max-w-md flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-24 h-24 rounded-xl bg-slate-900 shadow-hard border-2 border-slate-700 rotate-[-2deg] flex items-center justify-center">
            <span className="text-6xl text-violet-300">✎</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-100">Assistant Dribble</h1>
          <p className="text-base text-slate-400">Your Personal Assistant.</p>
        </div>

        <div className="relative paper-card rotate-[1deg] rounded-[28px] bg-slate-950 border-2 border-slate-800 shadow-hard-lg p-8">
          <div className="absolute -top-3 -left-4 h-6 w-12 rounded-sm bg-slate-900 opacity-80 rotate-[-15deg] border-x border-slate-700" />
          <div className="absolute -bottom-2 -right-3 h-6 w-10 rounded-sm bg-slate-900 opacity-80 rotate-[25deg] border-x border-slate-700" />

          <header className="mb-6">
            <h2 className="text-3xl font-semibold text-slate-100">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-400">Log in to your messy desk.</p>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">Email Address</label>
              <div className="group relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dribble@gmail.com"
                  className="w-full border-b-2 border-slate-700 bg-transparent py-3 px-1 text-base text-slate-100 outline-none transition focus:border-violet-400 custom-cursor placeholder:text-slate-500"
                  required
                />
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-violet-400 transition-all duration-300 group-focus-within:w-full" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">Password</label>
                <button type="button" className="text-sm text-slate-400 transition hover:text-slate-100">
                  Forgot?
                </button>
              </div>
              <div className="group relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border-b-2 border-slate-700 bg-transparent py-3 px-1 text-base text-slate-100 outline-none transition focus:border-violet-400 custom-cursor placeholder:text-slate-500"
                  required
                />
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-violet-400 transition-all duration-300 group-focus-within:w-full" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-[28px] bg-violet-600 py-4 text-base font-semibold text-white shadow-hard-primary border-2 border-violet-500 transition hover:bg-violet-500 wobble-hover"
            >
              <span className="flex items-center justify-center gap-3">
                <span>Login</span>
                <span className="text-lg">➔</span>
              </span>
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 w-full px-8">
            <div className="h-px flex-1 bg-slate-700" />
            <span className="text-xs uppercase tracking-[0.28em] text-slate-500">Or continue with</span>
            <div className="h-px flex-1 bg-slate-700" />
          </div>

          <div className="flex gap-4">
            <button className="h-16 w-16 rounded-3xl bg-slate-900 border-2 border-slate-700 shadow-hard transition hover:rotate-6">
              <span className="text-2xl text-slate-100">G</span>
            </button>
            <button className="h-16 w-16 rounded-3xl bg-slate-900 border-2 border-slate-700 shadow-hard transition hover:-rotate-6">
              <span className="text-3xl text-slate-100">🔒</span>
            </button>
          </div>

          <p className="text-sm text-slate-400">
            Don’t have an account?{' '}
            <Link to="/register" className="font-semibold text-violet-300 underline decoration-violet-300/30 hover:text-violet-200">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
