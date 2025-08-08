import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes';
import { CartProvider } from "./CartContext.jsx";
import Navbar from './components/Navbar';



function App() {
  return (
    <CartProvider>
    <Router>
      <Navbar />
      <div className="px-6 py-8">
        <AppRoutes />
        
      </div>
    </Router>
    </CartProvider>
    
  );
}

export default App;
