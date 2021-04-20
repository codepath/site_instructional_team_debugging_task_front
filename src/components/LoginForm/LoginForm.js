import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { API } from "services"

import "./LoginForm.css"

const LoginForm = ({ appState, setAppState }) => {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
    error: "",
  })

  const handleChange = (e) => {
    const { value, name } = e.target

    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const res = await API.loginUser({ email: form.email, password: form.password })
      if (res.error) {
        setForm((f) => ({ ...f, error: res.error, password: "" }))
      } else {
        const { token } = res.data
        API.setToken(token)
        localStorage.setItem("kavholm_token", token)

        try {
          const { data, error } = await API.fetchUserFromToken()
          if (error) {
            setForm((f) => ({ ...f, error, password: "" }))
          } else {
            setAppState((state) => ({ ...state, isAuthenticated: true, user: data?.user }))
            navigate("/dashboard")
          }
        } catch (err) {
          console.log("Login failed", err)
          setForm((f) => ({ ...f, error: res.message, password: "" }))
        }
      }
    } catch (err) {
      console.log("Login failed", err)
    } finally {
      setIsProcessing(false)
    }
  }

  const loginAsRenter = () => {
    setForm((f) => ({ ...f, email: "jennifer@lopez.io", password: "password" }))
  }

  const loginAsSeller = () => {
    setForm((f) => ({ ...f, email: "serena@williams.io", password: "password" }))
  }

  return (
    <div className="login">
      <p className="supporting-text">You can sign in with your own account, or use one of our demo accounts.</p>
      <div className="shortcut-buttons">
        <button className="btn btn-secondary btn-half" onClick={loginAsRenter}>
          Renter demo
        </button>

        <button className="btn btn-secondary btn-half right" onClick={loginAsSeller}>
          Owner demo
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="icon-input new-section email"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="icon-input password"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button disabled={isProcessing} aria-disabled={isProcessing} type="submit" className="btn btn-primary btn-full">
          Sign in
        </button>

        <p className={`error ${form.error && "show"}`}>{form.error && `Error: ${form.error}`}</p>
      </form>
    </div>
  )
}

export default LoginForm
