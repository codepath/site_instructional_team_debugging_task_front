import { useState } from "react"
import Modal from "react-modal"
import { BookingConfirmedModal, BookingDatesForm } from "components"
import { getStaticAssetsPath, formatPrice } from "utils"
import { API } from "services"
import moment from "moment"

import "./BookingModal.css"

export default function BookingModal({
  isShown,
  toggleModal,
  isBookingConfirmed,
  onBookingConfirmed,
  listing,
  transactionId,
}) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(null)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date(moment().add(3, "days").valueOf()))

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsProcessing(true)

    try {
      const { data, error, message } = await API.bookListing({ listingId: listing.id, startDate, endDate })
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
    <Modal
      className="BookingModal"
      isOpen={isShown}
      onRequestClose={toggleModal}
      ariaHideApp={false}
      style={{
        content: {
          position: "relative",
          top: 200,
          left: "auto",
          right: "auto",
          bottom: "auto",
          margin: "0 auto",
          border: 0,
          maxWidth: 680,
          maxHeight: 700,
          textAlign: "center",
          paddingTop: "70px",
          paddingBottom: "45px",
          boxShadow: "0px 18px 36px rgba(0,0,0,0.15)",
          borderRadius: "16px",
        },
      }}
    >
      <p role="button" onClick={() => toggleModal()} className="close-button">
        X
      </p>
      <div className="content">
        <BookingDatesForm startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
        {!isBookingConfirmed && (
          <div className="completed">
            <img src={getStaticAssetsPath("/confirmed.svg")} width="50" alt="confirmed" />
            <h1>
              Pay <span className="price">{`${listing.currency} ${formatPrice(listing.totalAmount / 100)}`}</span>
              {` `}
              to buy
            </h1>

            <br />
            <br />

            <form onSubmit={handleSubmit} className="BookingPayment">
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
          </div>
        )}

        {isBookingConfirmed && <BookingConfirmedModal transactionId={transactionId} />}
      </div>
    </Modal>
  )
}
