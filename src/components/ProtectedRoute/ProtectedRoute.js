import { LoginPage } from "components"

export default function ProtectedRoute({ element: Component, appState, setAppState }) {
  if (!appState?.initialized) {
    return null
  }

  if (appState?.initialized && !appState?.isAuthenticated) {
    return (
      <LoginPage message="You must be authenticated to view that page" appState={appState} setAppState={setAppState} />
    )
  }

  return Component
}
