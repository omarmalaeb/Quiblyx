import { useMemo, useState } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { supabase } from './supabase'
import { countries } from 'countries-list'
import { History, Dumbbell, Trophy, Users, User, Menu } from 'lucide-react'
import './App.css'

function App() {
  const [isSignup, setIsSignup] = useState(false)
  const [country, setCountry] = useState(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [signupAttempted, setSignupAttempted] = useState(false)
  const [showMainMenu, setShowMainMenu] = useState(true)

  const countryOptions = useMemo(() => countryList().getData(), [])

  function getContinent(countryCode) {
    return countries[countryCode]?.continent || ''
  }

  async function handleSignup() {
    setSignupAttempted(true)

    if (!username || !email || !password || !country || !agreedToTerms) {
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          country: country?.value,
          continent: getContinent(country?.value),
        },
      },
    })

    if (error) {
      console.error('Signup error:', error.message)
    } else {
      console.log('Account created successfully')
      setShowMainMenu(true)
    }
  }

  if (showMainMenu) {
    return (
      <div className="main-menu">
        <div className="main-header">
          <button className="icon-button">
            <Menu size={23} />
          </button>

          <div className="main-title">
            <h1>Quiblyx</h1>
            <p>Reach the top. Become the best in the world.</p>
          </div>

          <button className="icon-button">
            <User size={21} />
          </button>
        </div>

        <div className="rank-section">
          <div className="rank-card side-card">
            <p>#129</p>
            <h2>PlayerBehind</h2>
            <span>1,418 pts</span>
          </div>

          <div className="rank-card main-rank-card">
            <p>Your Rank</p>
            <h2>#128</h2>
            <span>1,425 pts</span>
          </div>

          <div className="rank-card side-card">
            <p>#127</p>
            <h2>PlayerAhead</h2>
            <span>1,430 pts</span>
          </div>
        </div>

        <div className="leaderboard-switch">
          <button className="active">Netherlands</button>
          <button>World</button>
        </div>

        <div className="main-actions">
          <button>
            <History size={19} />
            <span>Match History</span>
          </button>

          <button>
            <Dumbbell size={19} />
            <span>Practice</span>
          </button>

          <button>
            <Trophy size={19} />
            <span>Competitive</span>
          </button>

          <button>
            <Users size={19} />
            <span>Friends</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Quiblyx</h1>
        <p>Test your knowledge. Climb the leaderboards.</p>

        {isSignup && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={signupAttempted && !username ? 'input-error' : ''}
          />
        )}

        <input
          type="email"
          placeholder={isSignup ? 'Email' : 'Username or email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={isSignup && signupAttempted && !email ? 'input-error' : ''}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={
            isSignup && signupAttempted && !password ? 'input-error' : ''
          }
        />

        {isSignup && (
          <Select
            options={countryOptions}
            value={country}
            onChange={setCountry}
            placeholder="Select your country/region"
            isSearchable
            styles={{
              control: (base, state) => ({
                ...base,
                width: '100%',
                minHeight: '0',
                height: '58px',
                marginBottom: '14px',
                borderRadius: '12px',
                border:
                  signupAttempted && !country
                    ? '2px solid #9e1c1c'
                    : state.isFocused
                      ? '1px solid rgba(255, 255, 255, 0.35)'
                      : '1px solid rgba(255, 255, 255, 0.14)',
                background: 'rgba(255, 255, 255, 0.08)',
                boxShadow: 'none',
              }),
              valueContainer: (base) => ({
                ...base,
                padding: '0 16px',
              }),
              singleValue: (base) => ({
                ...base,
                color: 'inherit',
              }),
              input: (base) => ({
                ...base,
                color: 'inherit',
              }),
              placeholder: (base) => ({
                ...base,
                color: 'rgba(255, 255, 255, 0.45)',
                margin: 0,
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: 'rgba(255, 255, 255, 0.55)',
              }),
              indicatorSeparator: () => ({
                display: 'none',
              }),
              menu: (base) => ({
                ...base,
                background: '#24252b',
                borderRadius: '12px',
                overflow: 'hidden',
              }),
              option: (base, state) => ({
                ...base,
                background: state.isFocused
                  ? 'rgba(255, 255, 255, 0.08)'
                  : '#24252b',
                color: 'white',
                cursor: 'pointer',
              }),
            }}
          />
        )}

        {isSignup && (
          <label className="terms-checkbox">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <span>
              I agree to the <a href="#">Terms of Service</a> and{' '}
              <a href="#">Privacy Policy</a>
            </span>
          </label>
        )}

        <button onClick={isSignup ? handleSignup : undefined}>
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