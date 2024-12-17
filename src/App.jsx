import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";

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
          <Route path="/" element={<Home />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/wait" element={<Wait />} />
          <Route path="/results" element={<Results />} />
        </Route>
      </Routes>
      <Toaster position="top" />
    </BrowserRouter>
  )
}

export default App
