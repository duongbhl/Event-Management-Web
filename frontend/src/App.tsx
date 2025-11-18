import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/myevent" element={<MyEvents />} />
        <Route path="/view-details" element={<ViewDetails />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/feedback-view/:id" element={<FeedbackView />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/registrations" element={<MyRegistrations />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;