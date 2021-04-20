import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { API } from "services"
import "./SignupForm.css"

const SignupForm = ({ appState, setAppState }) => {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    error: "",
  })

  const handleChange = (e) => {
    const { value, name } = e.target

    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsProcessing(true)

    try {
      const res = await API.signupUser({
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        password: form.password,
      })
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

  return (
    <>
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <input
            className="new-section name"
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange}
            required
          />

          <input
            className="name"
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange}
            required
          />

          <input
            className="username"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            className="email"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="password"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            disabled={isProcessing}
            aria-disabled={isProcessing}
            type="submit"
            className="btn btn-primary btn-full"
          >
            Create account
          </button>

          <p className={`error ${form.error && "show"}`}>{form.error && `Error: ${form.error}`}</p>
        </form>
      </div>
    </>
  )
}

export default SignupForm
