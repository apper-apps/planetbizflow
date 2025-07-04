import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import Dashboard from '@/components/pages/Dashboard';
import Onboarding from '@/components/pages/Onboarding';
import KYCCenter from '@/components/pages/KYCCenter';
import PaymentPortal from '@/components/pages/PaymentPortal';
import ComplianceHub from '@/components/pages/ComplianceHub';
import StartupProfile from '@/components/pages/StartupProfile';
import Resources from '@/components/pages/Resources';
import Support from '@/components/pages/Support';
function App() {
  return (
    <div className="min-h-screen bg-bg-subtle">
<Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="kyc-center" element={<KYCCenter />} />
          <Route path="payment-portal" element={<PaymentPortal />} />
          <Route path="compliance-hub" element={<ComplianceHub />} />
          <Route path="startup-profile" element={<StartupProfile />} />
          <Route path="resources" element={<Resources />} />
          <Route path="support" element={<Support />} />
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