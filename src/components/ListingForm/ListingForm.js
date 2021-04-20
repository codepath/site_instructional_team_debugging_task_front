import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { API } from "services"
import "./ListingForm.css"

export default function ListingForm() {
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [form, setForm] = useState({
    title: "Breezy cabana in Baja California",
    description: "Breezy cabana in Baja California",
    price: 10000,
    location: "United States",
    currency: "USD",
    error: null,
  })

  const handleChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value

    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsProcessing(true)

    try {
      const { data, error } = await API.createNewListing({
        title: form.title,
        description: form.description,
        price: form.price,
        location: form.location,
        currency: form.currency,
      })
      if (error) {
        setForm((f) => ({ ...f, error: String(error) }))
      } else {
        navigate(`/listings/${data.listing?.id}/`)
      }
    } catch (err) {
      console.log(err)
      setForm((f) => ({ ...f, error: err }))
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="listing-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            className="form-control"
            type="text"
            id="title"
            name="title"
            placeholder="Breezy cabana in Baja California"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder="Breezy cabana in Baja California"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price per night (in cents)</label>
          <input
            className="form-control"
            type="text"
            id="price"
            name="price"
            placeholder="10000 USD"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <select id="currency" className="form-control" name="currency" value={form.currency} onChange={handleChange}>
            <option>USD</option>
            <option>EUR</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            placeholder="Mexico"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        <button disabled={isProcessing} type="submit" className="btn-submit btn btn-primary">
          Create
        </button>

        <p className={`error ${form.error && "show"}`}>{form.error && `Error: ${form.error}`}</p>
      </form>
    </div>
  )
}
