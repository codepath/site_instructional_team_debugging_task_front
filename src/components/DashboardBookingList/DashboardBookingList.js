import { Link } from "react-router-dom"
import "./DashboardBookingList.css"

function DashboardBookingList({ listings }) {
  const renderListings = () => {
    // if (!listings) {
    //   listings = []
    // }

    // const dummyListings = new Array(4).fill(0).map(() => ({ id: Math.random() }))

    // const listingItems = listings?.length < 4 ? [...listings, ...dummyListings] : listings

    return listings.map((item) => (
      <li className="listing-item" key={item.id}>
        {item.listing && (
          <Link to={`/transactions/` + item.id}>
            <span>
              <h4>{item.location}</h4>
              <h3>{item.listing.title}</h3>
              {<img src={item.listing.image} alt="he" />}
            </span>
          </Link>
        )}
      </li>
    ))
  }

  return <ul className="DashboardBookingsList bookings-list">{renderListings()}</ul>
}

export default DashboardBookingList
