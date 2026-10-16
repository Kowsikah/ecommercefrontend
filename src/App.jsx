import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import Contact from "./pages/Contact.jsx";
import About from './pages/About.jsx';
import Benefits from './pages/Benefits.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Checkout from './pages/Checkout.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Cart from './pages/Cart.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import TrackOrder from './pages/TrackOrder.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import RefundPolicy from './pages/RefundPolicy.jsx';
import CancellationPolicy from './pages/CancellationPolicy.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import ChatBot from './components/ChatBot.jsx';
import GlobalFX from './components/GlobalFX.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
export default function App() {

  return (
    <AuthProvider>
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartDrawer/>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
             <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
  <Route path="/order/:id" element={<OrderConfirmation />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
         
          {/* About, Benefits, Contact, Cart, Checkout come in later steps */}
        </Routes>
      </main>
      <Footer />
      <GlobalFX />
      <WhatsAppButton />
      <ChatBot />
    </div>
    </AuthProvider>
  );
}