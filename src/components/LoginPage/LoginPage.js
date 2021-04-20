import { LoginForm } from "components"
import "./LoginPage.css"

const LoginPage = ({ appState, setAppState, message }) => {
  return (
    <div className="login-page">
      <div className="splash-image">
        <div className="container">
          <div className="box popover">
            <h1>Sign in</h1>
            {message && <p className="message">{message}</p>}
            <LoginForm appState={appState} setAppState={setAppState} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
