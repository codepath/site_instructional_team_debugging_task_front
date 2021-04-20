import { Routes, Route } from "react-router-dom"
import { DashboardHeader, NewListingButton, ListingsList, NotFound } from "components"
import "./DashboardPage.css"

export default function DashboardPage({ appState, setAppState }) {
  const listings = appState.listings
  const profile = appState.user
  const bookedTransactions = appState.bookedTransactions
  const bookedListingIds = bookedTransactions.map((t) => t.listingId)
  const userListings = listings.filter((listing) => listing.owner === profile.username)
  const userBookings = listings.filter((listing) => bookedListingIds.includes(listing.id))
  const showTip = userBookings.length === 0

  return (
    <div className="dashboard">
      <DashboardHeader profile={profile} />

      <Routes>
        <Route path="/" element={<DashboardHome userBookings={userBookings} showTip={showTip} />} />
        <Route
          path="/host"
          element={<DashboardHost userListings={userListings} showTip={userListings?.length === 0} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

function DashboardHome({ userBookings, showTip }) {
  return (
    <div className="row">
      <div className="col-12">
        <div className="row">
          <div className="col-8">
            <div className="clearfix">
              <h4>Your trips</h4>
            </div>
          </div>
          <div className="col-4">
            <NewListingButton
              showTip={showTip}
              label="Show homes"
              link="/listings"
              tipTitle="No trips booked yet?"
              tipBody="Explore the homes in Kavholm's marketplace"
            />
          </div>
        </div>
        <ListingsList listings={userBookings} />
      </div>
    </div>
  )
}

function DashboardHost({ userListings, showTip }) {
  return (
    <div className="row">
      <div className="col-12">
        <div className="row">
          <div className="col-8">
            <div className="clearfix">
              <h4>Your listings</h4>
            </div>
          </div>
          <div className="col-4">
            <NewListingButton
              showTip={showTip}
              label="New listing"
              link="/listings/new"
              tipTitle="Time to create your first listing."
              tipBody="You can now add your home to Kavholm"
            />
          </div>
        </div>

        {userListings && <ListingsList listings={userListings} />}
      </div>
    </div>
  )
}
