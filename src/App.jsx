import { useMemo, useState } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { supabase } from './supabase'

function App() {
  const [isSignup, setIsSignup] = useState(false)
  const [country, setCountry] = useState(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const countryOptions = useMemo(() => countryList().getData(), [])

  async function handleSignup() {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        country: country?.value,
      },
    },
  })

  if (error) {
    console.error('Signup error:', error.message)
  } else {
    console.log('Account created:', data)
  }
}

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Quiblyx</h1>
        <p>Test your knowledge. Climb the leaderboards.</p>

        {isSignup && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Select
              options={countryOptions}
              value={country}
              onChange={setCountry}
              placeholder="Select your country/region"
              isSearchable
            />
          </>
        )}

        <input
          type="email"
          placeholder={isSignup ? 'Email' : 'Username or email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>
          {isSignup ? 'Create Account' : 'Log In'}
        </button>

        <p className="signup-text">
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}

          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Log in' : 'Create one'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default App