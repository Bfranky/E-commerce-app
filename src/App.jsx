import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Header from './Navbar';
import ProductDetailPage from './Productdetails';

const ProductListPage = lazy(() => import('./ProductList'));
const CartPage = lazy(() => import('./Carts'));

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<div className="p-8">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products/:id" element={<ProductDetailPage/>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;


// function App() {


//   const [cart, setCart] = useState(() => {
//     return JSON.parse(localStorage.getItem("cart")) || [];
//   });

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product) => {
//     const exists = cart.find((item) => item.id === product.id);
//     if (exists) {
//       setCart(
//         cart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: (item.quantity || 1) + 1 }
//             : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//   };

//   return (
//     <Router>
//       <Navbar cart={cart} />
//       <Routes>
//         <Route path="/" element={<ProductList addToCart={addToCart} />} />
//         <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
//         <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
//         {/* <Route path="/cloudinary" element={<Cloud />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
