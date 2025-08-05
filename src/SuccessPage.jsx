import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function PaymentSuccess() {
  const query = useQuery();
  const reference = query.get('reference');
  const [status, setStatus] = useState('Verifying...');
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (!reference) {
      setStatus('No payment reference provided.');
      return;
    }
    async function verify() {
      try {
        const res = await fetch(`http://localhost:4242/verify/${reference}`);
        const data = await res.json();
        if (data.verified && data.data.status === 'success') {
          setStatus('Payment successful!');
          setDetail(data.data);
        } else {
          setStatus('Payment verification failed');
          setDetail(data);
        }
      } catch (err) {
        console.error(err);
        setStatus('Error verifying payment.');
      }
    }
    verify();
  }, [reference]);

  return (
    <div className="max-w-md mx-auto py-20 text-center">
      <h1 className="text-3xl font-bold mb-4">{status}</h1>
      {detail && (
        <pre className="text-left bg-gray-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(detail, null, 2)}
        </pre>
      )}
      <div className="mt-6">
        <Link to="/products" className="px-6 py-3 bg-green-800 text-white rounded">
          Back to Shopping
        </Link>
      </div>
    </div>
  );
}
