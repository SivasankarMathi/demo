import { useState, useRef, useCallback } from 'react'
import styles from './Login.module.css'

const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION_MS = 60_000

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [lockout, setLockout] = useState(false)
  const attemptsRef = useRef(0)
  const lockoutTimerRef = useRef(null)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      return 'Email is required'
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address'
    }
    return ''
  }

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required'
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters'
    }
    return ''
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    if (touched.email) {
      setErrors({ ...errors, email: validateEmail(value) })
    }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    if (touched.password) {
      setErrors({ ...errors, password: validatePassword(value) })
    }
  }

  const handleEmailBlur = () => {
    setTouched({ ...touched, email: true })
    setErrors({ ...errors, email: validateEmail(email) })
  }

  const handlePasswordBlur = () => {
    setTouched({ ...touched, password: true })
    setErrors({ ...errors, password: validatePassword(password) })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (lockout) return
    
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    
    setTouched({ email: true, password: true })
    setErrors({ email: emailError, password: passwordError })

    if (!emailError && !passwordError) {
      attemptsRef.current += 1

      if (attemptsRef.current >= MAX_LOGIN_ATTEMPTS) {
        setLockout(true)
        lockoutTimerRef.current = setTimeout(() => {
          setLockout(false)
          attemptsRef.current = 0
        }, LOCKOUT_DURATION_MS)
        return
      }

      onLogin(email, password)
    }
  }

  const isFormValid = !validateEmail(email) && !validatePassword(password)

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Please login to your account</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ''}`}
              placeholder="Enter your email"
              autoComplete="email"
              aria-invalid={touched.email && errors.email ? 'true' : 'false'}
              aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
            />
            {touched.email && errors.email && (
              <span id="email-error" className={styles.error} role="alert">
                {errors.email}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              className={`${styles.input} ${touched.password && errors.password ? styles.inputError : ''}`}
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-invalid={touched.password && errors.password ? 'true' : 'false'}
              aria-describedby={touched.password && errors.password ? 'password-error' : undefined}
            />
            {touched.password && errors.password && (
              <span id="password-error" className={styles.error} role="alert">
                {errors.password}
              </span>
            )}
          </div>

          {lockout && (
            <p className={styles.error} role="alert">
              Too many login attempts. Please try again in 60 seconds.
            </p>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!isFormValid || lockout}
          >
            {lockout ? 'Locked' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
