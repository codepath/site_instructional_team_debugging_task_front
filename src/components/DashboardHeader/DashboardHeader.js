import { Link } from "react-router-dom"
import { getStaticAssetsPath } from "utils"
import "./DashboardHeader.css"

export default function DashboardHeader({ profile, dashboardType }) {
  const avatarUrl = profile?.avatar ?? getStaticAssetsPath("person.svg")

  return (
    <div className="dashboard-header">
      <div className="row">
        <div className="col-4">
          {profile && (
            <div className="media user-details">
              <img src={avatarUrl} className="mr-3 avatar" alt="avatar" />
              <div className="media-body">
                <div className="user-details-body align-middle">
                  <h5 className="mt-0">{profile.firstName + " " + profile.lastName}</h5>
                  <p className="text-secondary">{profile.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link to="/dashboard">
                <span className={"nav-link " + (dashboardType === "renter" ? "active" : "")}>Your trips</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/host">
                <span className={"nav-link " + (dashboardType === "host" ? "active" : "")}>Your listings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
