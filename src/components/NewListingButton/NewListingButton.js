import { useRef } from "react"
import { Link } from "react-router-dom"

export default function NewListingButton({ label, showTip, tipTitle, link, tipBody }) {
  const ref = useRef()

  return (
    <div className="NewListingButton new-button">
      <Link to={link}>
        <span ref={ref} className="btn btn-primary btn-new">
          + {label}
        </span>
      </Link>
      {showTip && (
        <div className="overlay">
          <span className="triangle">▲</span>
          <strong>{tipTitle}</strong>
          <br />
          {tipBody}
        </div>
      )}
    </div>
  )
}
