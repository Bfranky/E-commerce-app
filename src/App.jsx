import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './Routes/AppRoutes';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="px-6 py-8">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
