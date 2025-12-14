import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Toaster } from "sonner";
import { isMobile } from "react-device-detect";

import Header from "./components/Header";
import Home from './screens/Home'
import Activity from './screens/Activity'
import Wait from "./screens/Wait";
import Background from "./components/Background";
import Results from "./screens/Results";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Background />}>
          <Route
            path="/"
            element={isMobile ? <Home /> : <Navigate to="/results" replace />}
          />
          <Route path="/activity" element={<Activity />} />
          <Route path="/wait" element={<Wait />} />
          <Route
            path="/results"
            element={isMobile ? <Navigate to="/" replace /> : <Results />}
          />
        </Route>
      </Routes>
      <Toaster
        duration={8000}
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "20px",
            padding: "20px",
            marginTop: "20px",
          }
        }} richColors />
    </BrowserRouter>
  )
}

export default App
