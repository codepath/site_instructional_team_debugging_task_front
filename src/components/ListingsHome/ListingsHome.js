import { ListingsList } from "components"

const ListingsHome = ({ listings }) => {
  return (
    <div className="listings">
      <ListingsList listings={listings} />
    </div>
  )
}

export default ListingsHome
