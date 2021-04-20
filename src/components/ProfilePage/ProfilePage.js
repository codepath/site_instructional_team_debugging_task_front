import { getStaticAssetsPath } from "utils"
import "./ProfilePage.css"

export default function ProfilePage({ profile }) {
  const avatarUrl = profile?.avatar ?? getStaticAssetsPath("person.svg")

  return (
    <div className="profile">
      <h4>Your profile details</h4>
      <img src={avatarUrl} height="42" className="avatar" alt="avatar" />
      <pre className="profile-details bg-light">
        <code>{JSON.stringify(profile, null, 2)}</code>
      </pre>

      <h4>Admin</h4>
      <button className="btn btn-secondary">Clear trips</button>
    </div>
  )
}
