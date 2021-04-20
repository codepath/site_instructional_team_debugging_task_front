import { BrowserRouter, Routes, Route } from "react-router-dom"
import {
  DashboardPage,
  HomePage,
  Layout,
  NotFound,
  ListingsPage,
  LoginPage,
  ProfilePage,
  ProtectedRoute,
  SignupPage,
} from "components"

export default function AppRoutes({ appState, setAppState }) {
  return (
    <BrowserRouter>
      <Layout appState={appState} setAppState={setAppState}>
        <Routes>
          <Route path="/" element={<HomePage appState={appState} setAppState={setAppState} />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute
                appState={appState}
                setAppState={setAppState}
                element={<DashboardPage appState={appState} setAppState={setAppState} />}
              />
            }
          />
          <Route
            path="/listings/*"
            element={
              <ProtectedRoute
                appState={appState}
                setAppState={setAppState}
                element={<ListingsPage appState={appState} setAppState={setAppState} />}
              />
            }
          />
          <Route path="/login" element={<LoginPage appState={appState} setAppState={setAppState} />} />
          <Route path="/signup" element={<SignupPage appState={appState} setAppState={setAppState} />} />
          <Route
            path="/profile/*"
            element={<ProfilePage profile={appState.user} appState={appState} setAppState={setAppState} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
