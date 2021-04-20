import { useState } from "react"
import { formatPrice } from "utils"
import { API } from "services"

const BookingPayment = ({ listing, listingId, onBookingConfirmed = () => {} }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsProcessing(true)

    try {
      const { data, error, message } = await API.bookListing(listingId)
      if (error) {
        setError(message)
      } else {
        setSuccess(data?.transaction)
      }
    } catch (err) {
      setError(String(err))
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="BookingPayment">
      {/* <PaymentRequestForm
        amount={listing?.totalAmount}
        currency={listing?.currency?.toLowerCase()}
        onBookingConfirmed={onBookingConfirmed}
      /> */}

      <div className="card-info">{success ? "Success!" : null}</div>
      <button className="btn btn-primary" type="submit" disabled={isProcessing}>
        {isProcessing ? (
          "Processing…"
        ) : (
          <>
            <span className="price">{`${listing.currency} ${formatPrice(listing.totalAmount / 100)}`}</span>
          </>
        )}
      </button>

      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default BookingPayment
