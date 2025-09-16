import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages";
import SigninPage from "../pages/Signin";
import SignUpPage from "../pages/SignUp";
import VerifyEmailPage from "../pages/VerifyEmail";
import PaySuccessPage from "../pages/PaySuccess";
import PayPalSuccessPage from "../pages/PaypalSuccess";
import { GenQrProvider } from "../contexts/gencode";
import BlogsPage from "../pages/Blogs";
import { BlogProvider } from "../contexts/BlogContexts";
import LocationsPage from "../pages/locations/Loctions";
import LocationDetail from "../pages/locations/LocationDetail";
import TourDetail from "../pages/tour/TourDetail";
import BookingPage from "../pages/booking/BookingPage";
import { TourProvider } from "../contexts/tourcontext";
const AppRouter = () => {
  return (
    <Router basename="/travelv-landingpage">
      <Routes>
        <Route path="/" element={<GenQrProvider><MainLayout /></GenQrProvider>}>
          <Route index element={<TourProvider><Home /></TourProvider>} />
          <Route path="/blogs" element={<BlogProvider><BlogsPage /></BlogProvider>} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/location/:id" element={<LocationDetail />} />
          <Route path="/tour/:id" element={<TourDetail />} />
          <Route path="/booking/:id" element={<BookingPage />} />
        </Route>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/auth/verify-email/:verify_token" element={<VerifyEmailPage />} />
        <Route path="/pay-success/:pay_token" element={<PaySuccessPage />} />
        <Route path="/paypal-success/:order_token" element={<PayPalSuccessPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;