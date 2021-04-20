import { Link } from "react-router-dom"
import "./ListingsList.css"

export default function ListingsList({ listings }) {
  const renderListings = () => {
    if (!listings) {
      listings = []
    }

    const dummyListings = new Array(4).fill(0).map(() => ({ id: Math.random() }))

    const listingItems = listings?.length < 4 ? [...listings, ...dummyListings] : listings

    return listingItems.map((l) => (
      <li className="listing-item" key={l.id}>
        <div className="clip">
          {l.title && (
            <Link to={`/listings/${l.id}`}>
              <span>
                {<img src={l.image} alt="cover" />}
                <div className="overlay" />
                <h2>{l.location}</h2>
                <h3>{l.title}</h3>
              </span>
            </Link>
          )}
        </div>
      </li>
    ))
  }

  return <ul className="listings-list">{renderListings()}</ul>
}
