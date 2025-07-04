import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import Dashboard from '@/components/pages/Dashboard';
import Finance from '@/components/pages/Finance';
import Sales from '@/components/pages/Sales';
import Procurement from '@/components/pages/Procurement';
import Credit from '@/components/pages/Credit';
import Knowledge from '@/components/pages/Knowledge';
import Tasks from '@/components/pages/Tasks';

function App() {
  return (
    <div className="min-h-screen bg-bg-subtle">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="finance" element={<Finance />} />
          <Route path="sales" element={<Sales />} />
          <Route path="procurement" element={<Procurement />} />
          <Route path="credit" element={<Credit />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;