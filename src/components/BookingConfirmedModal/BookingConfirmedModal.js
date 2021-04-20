import { Link } from "react-router-dom"
import { getStaticAssetsPath } from "utils"
import "./BookingConfirmedModal.css"

export default function BookingConfirmedModal({ transactionId }) {
  return (
    <div className="BookingConfirmed content">
      <img src={getStaticAssetsPath("confirmed.svg")} width="50" alt="confirmed" />
      <h1>You’re all set!</h1>
      <Link to={`/transactions/${transactionId}/`}>
        <span className="btn btn-primary">View booking details</span>
      </Link>
    </div>
  )
}
