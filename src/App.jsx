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
import FAQs from '@/components/pages/FAQs';
import Testimonials from '@/components/pages/Testimonials';
import Services from '@/components/pages/Services';
import Projects from '@/components/pages/Projects';
import Pricing from '@/components/pages/Pricing';
import Privacy from '@/components/pages/Privacy';
import Terms from '@/components/pages/Terms';
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
          <Route path="faqs" element={<FAQs />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="services" element={<Services />} />
          <Route path="projects" element={<Projects />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
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