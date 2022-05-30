import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ErrorNotFound from "./components/ErrorNotFound";
import HackerNews from "./pages/HackerNews";
import Footer from "./containers/Footer";
import Header from "./containers/Header";

function App() {
  return (
    <Router>
      <Toaster position="bottom-right" reverseOrder={false} />

      <Header />

      <Routes>
        <Route path="/" element={<HackerNews />} />

        <Route path="*" element={<Navigate replace to="/" />} />

        <Route element={<ErrorNotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
