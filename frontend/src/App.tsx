import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import MyEvents from './pages/MyEvent';
import ViewDetails from './pages/ViewDetails';
import Feedback from './pages/Feedback';
import FeedbackView from './pages/FeedbackView';
import Profile from './pages/Profile';
import Events from './pages/Events';
import Login from './pages/Login';
import Analytics from './pages/Analytics';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AddEvent from './pages/AddEvent';
import AdminDashboard from './pages/admin/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import TicketQR from './pages/TicketQR';
import ManageEvent from './pages/ManageEvent';
import AdminViewDetails from './pages/admin/AdminViewDetails';

// Layout wrapper to conditionally show Navbar/Footer
function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/myevent" element={<MyEvents />} />
        <Route path="/view-details/:id" element={<ViewDetails />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/feedback-view/:id" element={<FeedbackView />} />
        <Route path='/analytics' element={<Analytics />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/ticket/:id" element={<TicketQR />} />
        <Route path="/manage-event/:eventId" element={<ManageEvent />} />
        <Route path='/addevent/:id' element={<AddEvent />} />
        <Route path='/addevent/' element={<AddEvent />}/>
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/events/:id" element={<AdminViewDetails />} />

      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
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