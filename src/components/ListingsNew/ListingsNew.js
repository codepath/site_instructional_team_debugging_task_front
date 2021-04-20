import { ListingForm } from "components"
import "./ListingsNew.css"

export default function ListingsNew() {
  return (
    <>
      <div className="listing-new-page">
        <div className="splash-image">
          <div className="container">
            <div className="box popover">
              <h3>Create new listing</h3>

              <ListingForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
