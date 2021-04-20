import { Routes, Route } from "react-router-dom"
import { ListingsHome, ListingsNew, NotFound, SingleListing } from "components"
import "./ListingsPage.css"

export default function ListingsPage({ appState, setAppState }) {
  return (
    <Routes>
      <Route path="/" element={<ListingsHome listings={appState.listings} />} />
      <Route path="/new" element={<ListingsNew />} />
      <Route path="/:listingId" element={<SingleListing isAuthenticated={appState.isAuthenticated} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
