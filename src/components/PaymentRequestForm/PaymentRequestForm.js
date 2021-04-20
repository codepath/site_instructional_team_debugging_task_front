import { useState, useEffect } from "react"
import "./PaymentRequestForm.css"

const PaymentRequestForm = ({ onBookingConfirmed }) => {
  const [canMakePayment, setCanMakePayment] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    const init = async () => {
      if (!hasInitialized) {
        setHasInitialized(true)
      }

      if (hasInitialized) {
        setCanMakePayment(true)
      }
    }

    init()
  }, [hasInitialized])

  return (
    <div className={`payment-request-form ${canMakePayment ? "ready" : ""}`}>
      {canMakePayment && (
        <>
          {canMakePayment ? "" : ""}
          <p className="tip-text">or pay with card</p>
        </>
      )}
    </div>
  )
}

export default PaymentRequestForm
