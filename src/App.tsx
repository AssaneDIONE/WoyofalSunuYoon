import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MapView from './pages/MapView';
import TripDetails from './pages/TripDetails';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/trip/:lineId" element={<TripDetails />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
