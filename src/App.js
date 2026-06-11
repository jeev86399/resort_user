import './styles/App.css';

// COMMON
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// HOME
import Home from './pages/user/Home';
import WelcomeSection from './components/home/WelcomeSection';
import GalleryBlock from './components/gallery/GalleryBlock';
import DiningBlock from './components/dining/DiningBlock';
import OffersBlock from './components/home/OffersBlock';
import Dining from './components/dining/Dining';


// USER PAGES
import About from './pages/user/About';
import Booking from './components/booking/Booking';
import Spa from './pages/user/Spa';
import Contact from './pages/user/Contact';
import Gallery from './components/gallery/Gallery';
import ThingsToDo from './components/home/ThingsToDo';
import Weddings from './components/home/Weddings';

// ACCOMMODATION
import Accommodation from './components/home/Accommodation';
import RoomDetail from './components/home/RoomDetail';

// RESERVE
import ReserveDetails from './components/booking/ReserveDetails';

// USER AUTH
import UserLogin from './pages/user/UserLogin';
import UserSignup from './pages/user/UserSignup';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Header />

      <main>
        <Routes>

          {/* HOME PAGE */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <WelcomeSection />
                <GalleryBlock />
                <DiningBlock />
                <OffersBlock />
              </>
            }
          />

          {/* STATIC PAGES */}
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/spa" element={<Spa />} />
          <Route path="/contact" element={<Contact />} />

          {/* ACCOMMODATION */}
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/accommodation/:id" element={<RoomDetail />} />

          {/* RESERVATION */}
          <Route path="/reserve" element={<ReserveDetails />} />

          {/* WEDDINGS */}
          <Route path="/weddings" element={<Weddings />} />

          {/* GALLERY */}
          <Route path="/gallery" element={<Gallery />} />

          {/* THINGS TO DO */}
          <Route path="/things-to-do" element={<ThingsToDo />} />

          {/* ⭐ USER AUTH ROUTES */}
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-signup" element={<UserSignup />} />

  
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
