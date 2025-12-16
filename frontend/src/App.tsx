import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import MyEvents from './pages/myevent';
import ViewDetails from './pages/view_details';
import Feedback from './pages/feedback';
import FeedbackView from './pages/feedback-view';
import Profile from './pages/profile';
import MyRegistrations from './pages/my_regis';
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
        <Route path='/analytics' element={<Analytics/>}></Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/registrations" element={<MyRegistrations />} />
        <Route path='/addevent/:id' element={<AddEvent/>}></Route>
        <Route path='/addevent/' element={<AddEvent/>}></Route>
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {!isAdminRoute && <Footer/>}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
export default App;