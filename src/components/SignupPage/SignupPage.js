import { SignupForm } from "components"
import "./SignupPage.css"

const SignupPage = ({ appState, setAppState }) => {
  return (
    <div className="page-signup">
      <div className="splash-image">
        <div className="container">
          <div className="box popover">
            <h1>Create an account</h1>
            <p className="supporting-text">
              Create a new account, or sign in with one of <a href="/login">our demo accounts on login</a>.
            </p>
            <SignupForm appState={appState} setAppState={setAppState} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
