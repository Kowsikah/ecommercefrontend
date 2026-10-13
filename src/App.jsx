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
         
          {/* About, Benefits, Contact, Cart, Checkout come in later steps */}
        </Routes>
      </main>
      <Footer />
    </div>
    </AuthProvider>
  );
}