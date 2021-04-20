import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getStaticAssetsPath } from "utils"
import { API } from "services"
import "./NavProfile.css"

const NavProfile = ({ isAuthenticated, user, setAppState }) => {
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const avatarUrl = user?.avatar ?? getStaticAssetsPath("person.svg")
  // const avatarUrl =
  //   user?.avatar ??
  //   "https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2741&q=80"

  const handleOnLogout = async () => {
    await API.logoutUser()
    navigate("/")
    setAppState((state) => ({ ...state, user: null, isAuthenticated: false }))
  }

  const renderItems = () => {
    if (isAuthenticated) {
      return (
        <li className="nav-item dropdown">
          <span
            className="dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={() => setDropdownOpen((open) => !open)}
          >
            <img src={avatarUrl} height="42" className="avatar" alt="avatar" />
          </span>
          <div
            className={`${dropdownOpen ? "" : "dropdown-menu"} drop-menu dropdown-menu-right`}
            aria-labelledby="navbarDropdown"
          >
            <Link to="/dashboard">
              <span className="dropdown-item">Dashboard</span>
            </Link>
            <Link to="/profile">
              <span className="dropdown-item">Profile</span>
            </Link>
            <Link to="/">
              <span className="dropdown-item" href="#" onClick={handleOnLogout}>
                Log out
              </span>
            </Link>
          </div>
        </li>
      )
    }

    return (
      <>
        <li className="navitem d-flex">
          <Link to="/signup">
            <span className="btn">Create account</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login">
            <span className="btn">Sign in</span>
          </Link>
        </li>
      </>
    )
  }

  return <ul className="NavProfile navbar-nav flex-row">{renderItems()}</ul>
}

export default NavProfile
