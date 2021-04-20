import { useState } from "react"
import DatePicker from "react-datepicker"
import moment from "moment"
import { getStaticAssetsPath } from "utils"

const BookingSearchForm = ({ size }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(moment().add(3, "days").valueOf())

  return (
    <div className={size === "large" ? "booking-search-form large" : "booking-search-form"}>
      <select
        className="search dropdown-toggle"
        style={{
          background: `url(${getStaticAssetsPath("search.svg")}) no-repeat scroll 15px 15px`,
        }}
      >
        <option>Canada</option>
        <option>Denmark</option>
        <option>France</option>
        <option>Greece</option>
        <option>Mexico</option>
        <option>New Zealand</option>
        <option>Norway</option>
        <option>Singapore</option>
        <option>Spain</option>
        <option>USA</option>
      </select>

      <div className="row">
        <div className="col-6">
          <DatePicker selected={startDate} className="date" onChange={(date) => setStartDate(date)} />
        </div>
        <div className="col-6">
          <DatePicker selected={endDate} className="date" onChange={(date) => setEndDate(date)} />
        </div>
      </div>
      <select
        className="guests dropdown-toggle"
        style={{
          background: `url(${getStaticAssetsPath("people.svg")}) no-repeat scroll 15px 15px`,
        }}
      >
        <option>Guests</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
      </select>
    </div>
  )
}

export default BookingSearchForm
