import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import ScrollToTop from './ScrollToTop';

// Lazy-loaded pages to enable route-based code splitting
const Home = React.lazy(() => import('./pages/Home'));
const Calendar = React.lazy(() => import('./pages/Calendar'));
const MyEvents = React.lazy(() => import('./pages/MyEvent'));
const ViewDetails = React.lazy(() => import('./pages/ViewDetails'));
const Feedback = React.lazy(() => import('./pages/Feedback'));
const FeedbackView = React.lazy(() => import('./pages/FeedbackView'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Events = React.lazy(() => import('./pages/Events'));
const Login = React.lazy(() => import('./pages/Login'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const Register = React.lazy(() => import('./pages/Register'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));
const AddEvent = React.lazy(() => import('./pages/AddEvent'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const Payment = React.lazy(() => import('./pages/Payment'));
const TicketQR = React.lazy(() => import('./pages/TicketQR'));
const ManageEvent = React.lazy(() => import('./pages/ManageEvent'));
const AdminViewDetails = React.lazy(() => import('./pages/admin/AdminViewDetails'));

// Layout wrapper to conditionally show Navbar/Footer
function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Suspense
        fallback={
          <div className="w-full min-h-[50vh] flex items-center justify-center text-gray-500">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/myevent" element={<MyEvents />} />
          <Route path="/view-details/:id" element={<ViewDetails />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/feedback-view/:id" element={<FeedbackView />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/ticket/:id" element={<TicketQR />} />
          <Route path="/manage-event/:eventId" element={<ManageEvent />} />
          <Route path="/addevent/:id" element={<AddEvent />} />
          <Route path="/addevent/" element={<AddEvent />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/events/:id" element={<AdminViewDetails />} />
        </Routes>
      </Suspense>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <AppLayout />
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>

  );
}
export default App;