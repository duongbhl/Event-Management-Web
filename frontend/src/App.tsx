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
import Analytics from './pages/Analytics';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/myevent" element={<MyEvents />} />
          <Route path="/view-details" element={<ViewDetails />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/feedback-view/:id" element={<FeedbackView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/analytics' element={<Analytics />}></Route>
          <Route path="/registrations" element={<MyRegistrations />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>

  );
}
export default App;