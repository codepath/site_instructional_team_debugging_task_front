import { Head, Navbar } from "components"
import "./Layout.css"

const Layout = ({ appState, setAppState, children, width }) => (
  <>
    <Head />
    <Navbar
      appState={appState}
      setAppState={setAppState}
      isAuthenticated={appState.isAuthenticated}
      userProfile={appState.user}
    />

    <div className={"app " + (width === "full" ? "container-fluid" : "container")}>{children}</div>
  </>
)

export default Layout
