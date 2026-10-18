import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import ParcelsList from './pages/ParcelsList/ParcelsList';
import ParcelDetail from './pages/ParcelDetail/ParcelDetail';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/parcels" element={<ParcelsList />} />
          <Route path="/parcels/:id" element={<ParcelDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;