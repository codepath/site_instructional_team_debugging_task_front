import DatePicker from "react-datepicker"

const BookingDatesForm = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <div className={"booking-dates-form"}>
      <div className="row">
        <div className="col-6">
          <h4>Arrive</h4>
        </div>
        <div className="col-6">
          <h4>Leave</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <DatePicker selected={startDate} className="date" onChange={(date) => setStartDate(date)} />
        </div>
        <div className="col-6">
          <DatePicker selected={endDate} className="date" onChange={(date) => setEndDate(date)} />
        </div>
      </div>
    </div>
  )
}

export default BookingDatesForm
