import { Link } from "react-router-dom"
import { NavProfile } from "components"
import { getStaticAssetsPath } from "utils"
import "./Navbar.css"

const Navbar = ({ appState, setAppState }) => {
  const className = "app " + appState?.width === "full" ? "container-fluid nav-fullwidth" : "container"
  return (
    <div className={className + " Navbar"}>
      <nav className="navbar navbar-fixed navbar-expand-lg navbar-light">
        <ul className="navbar-nav mr-auto">
          <li className="navitem d-flex">
            <Link to="/">
              <span className="navbar-brand">
                <img className="logo" src={getStaticAssetsPath("logo.svg")} alt="logo" />
              </span>
            </Link>
          </li>
        </ul>

        <NavProfile
          isAuthenticated={appState?.isAuthenticated}
          userProfile={appState?.user}
          setAppState={setAppState}
        />
      </nav>
    </div>
  )
}

export default Navbar
