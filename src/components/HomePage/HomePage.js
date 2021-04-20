import { Link } from "react-router-dom"
import { BookingSearchForm } from "components"
import "./HomePage.css"

const Home = () => {
  return (
    <div className="home">
      <div className="splash-image">
        <div className="container">
          <div className="popover">
            <h1>Book unique places to stay around the globe</h1>

            <BookingSearchForm size="large" />

            <div className="button-container">
              <Link to="/listings" className="btn btn-primary">
                Show listings
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="annotation">
        <p>
          Kavholm is a global marketplace for hosts and renters alike.{" "}
          <a
            className="github arrow"
            href="https://github.com/jastor11/kavholm-airbnb-clone"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
        </p>
      </div>
    </div>
  )
}

export default Home
