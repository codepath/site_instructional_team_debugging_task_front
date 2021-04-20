import { useState, useEffect } from "react"
import { Routes as AppRoutes } from "components"
import { API } from "services"

const App = () => {
  const [appState, setAppState] = useState({
    user: null,
    isAuthenticated: false,
    initialized: false,
    listings: [],
    bookedTransactions: [],
    hostedTransactions: [],
  })

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("kavholm_token")

      if (token) {
        API.setToken(token)
        const { data, error } = await API.fetchUserFromToken()
        if (data?.user) {
          setAppState((state) => ({ ...state, user: data.user, isAuthenticated: true }))
        }
        if (error) {
          console.log(error)
        }

        const { data: listingData, error: listingError } = await API.fetchListings()
        if (listingData) {
          setAppState((state) => ({ ...state, listings: listingData.listings }))
        }
        if (listingError) {
          console.log(listingError)
        }

        const { data: transactionData, error: transactionsError } = await API.fetchUserTransactions()
        if (transactionData) {
          setAppState((state) => ({
            ...state,
            bookedTransactions: transactionData.transactions.bookedTransactions,
            hostedTransactions: transactionData.transactions.hostedTransactions,
          }))
        }
        if (transactionsError) {
          console.log(transactionsError)
        }
      }

      setAppState((state) => ({ ...state, initialized: true }))
    }

    init()
  }, [appState.isAuthenticated])

  return (
    <div className="app">
      <AppRoutes appState={appState} setAppState={setAppState} />
    </div>
  )
}

export default App
