// src/utils/auth.js
// src/paystack.js


export function payWithPaystack({ email, amount, reference, onSuccess, onClose }) {
  const paystack = new PaystackPop();
    return !!localStorage.getItem('user');
}
export function isLoggedIn() {
  return !!localStorage.getItem('token');
}

export function logout() {
  localStorage.removeItem('user');
  

  paystack.newTransaction({
    key: 'pk_test_4edbcd5293ab0ec86b3f698a14b84c3d37d4295c', // Replace with your Paystack public key
    email,
    amount, // amount in kobo (e.g., ₦1000 = 100000)
    reference,
    onSuccess,
    onClose,
  });
  
}
