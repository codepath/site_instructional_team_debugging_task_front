import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { BookingModalWrapper } from "components"
import { API } from "services"
import { getStaticAssetsPath, formatPrice } from "utils"
import "./SingleListing.css"

export default function SingleListing({ user, isAuthenticated }) {
  const { listingId } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [errMessage, setErrMessage] = useState(null)
  const [listing, setListing] = useState({})
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
  const [transactionId, setTransactionId] = useState(null)

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true)
      const { data, error, message } = await API.getListingById(listingId)
      if (error) {
        setErrMessage(message)
      } else {
        setListing(data?.listing)
      }

      setIsLoading(false)
    }

    if (isAuthenticated) {
      fetchResources()
    }
  }, [listingId, isAuthenticated])

  const handleBookingStartClick = () => {
    setIsBooking(true)
  }

  const onBookingConfirmed = (transactionId) => {
    setTransactionId(transactionId)
    setIsBookingConfirmed(true)
  }

  if (!listing || isLoading) return null

  return (
    <div className="SingleListing listings">
      <BookingModalWrapper
        isShown={isBooking}
        toggleModal={() => setIsBooking(false)}
        onBookingConfirmed={onBookingConfirmed}
        isBookingConfirmed={isBookingConfirmed}
        transactionId={transactionId}
        listing={listing}
      />

      <p className={`error ${errMessage && "show"}`}>{errMessage && `Error: ${errMessage}`}</p>

      <div className="content">
        <div className="row">
          <div className="col-12 order-2 col-lg-6 order-lg-1 pane-images">
            <img src={listing.image} className="image-main" alt="listing" />

            <div className="row">
              <div className="col-6">
                {listing.image2 ? <img src={listing.image2} className="image-small" alt="listing-small" /> : null}
              </div>
              <div className="col-6">
                {listing.image3 ? <img src={listing.image3} className="image-small" alt="listing-small" /> : null}
              </div>
            </div>

            <div className="image-footer">
              <div>See more photos</div>
              <div className="widgets">
                <div style={{ marginRight: "12px" }}>
                  <img src={getStaticAssetsPath("share.svg")} alt="share" /> Share
                </div>
                <div>
                  <img src={getStaticAssetsPath("save.svg")} alt="save" /> Save
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 order-1 col-lg-6 order-lg-2 pane-info">
            <div className="booking-info">
              <h1>{listing.title}</h1>

              <div className="priceInfo">
                <span className="price">{`${listing.currency} ${formatPrice(listing.totalAmount / 100)}`}</span>
                <img className="stars" src={getStaticAssetsPath("stars.svg")} alt="stars" />
              </div>
              <p className="supporting-text">{listing?.description}</p>

              <hr />
              <ul className="lineItems">
                {listing?.lineItems?.map((item, index) => (
                  <li key={item.item}>
                    {item.item}
                    <span className="lineItemPrice">{`${listing.currency} ${formatPrice(item.amount / 100)}`}</span>
                  </li>
                ))}
              </ul>
              <hr />
              <ul className="lineItems lineItemsTotal">
                <li>
                  Total{" "}
                  <span className="lineItemPrice">
                    {`${listing.currency} ${formatPrice(listing.totalAmount / 100)}`}
                  </span>
                </li>
              </ul>
            </div>
            {isAuthenticated && (
              <button
                className="btn btn-primary btn-book"
                onClick={handleBookingStartClick}
                disabled={!isAuthenticated}
              >
                Book now
              </button>
            )}

            {!isAuthenticated && (
              <Link to="/login">
                <button className="btn btn-primary btn-book">Sign in to book</button>
              </Link>
            )}

            {listing?.host && (
              <div className="media host">
                <img
                  src={listing.host.avatar || getStaticAssetsPath("person.svg")}
                  width="36"
                  className="mr-3"
                  alt={"author-avatar"}
                />
                <div className="media-body">
                  <p>
                    Listed by {listing?.host?.firstName} {listing?.host?.lastName}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
