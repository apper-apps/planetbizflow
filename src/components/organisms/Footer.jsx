import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const Footer = () => {
  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Services', path: '/services' },
        { label: 'Projects', path: '/projects' },
        { label: 'Testimonials', path: '/testimonials' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', path: '/support' },
        { label: 'FAQs', path: '/faqs' },
        { label: 'Contact Us', path: '/support' },
        { label: 'Knowledge Base', path: '/resources' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Compliance', path: '/compliance-hub' },
        { label: 'Data Protection', path: '/privacy' }
      ]
    },
    {
      title: 'Platform',
      links: [
        { label: 'Dashboard', path: '/' },
        { label: 'Onboarding', path: '/onboarding' },
        { label: 'KYC Center', path: '/kyc-center' },
        { label: 'Pricing', path: '/pricing' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'Facebook', icon: 'Facebook', url: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#' },
    { name: 'Instagram', icon: 'Instagram', url: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-startup-blue to-startup-green rounded-lg p-2">
                <ApperIcon name="Rocket" className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <h2 className="text-lg font-bold">Startup OS</h2>
                <p className="text-sm text-gray-400">Saksham Odisha</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Empowering Odisha's startup ecosystem with comprehensive business management solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <ApperIcon name={social.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Startup OS Odisha. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms
              </Link>
              <span className="text-gray-400 text-sm">
                Made with ❤️ in Odisha
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;