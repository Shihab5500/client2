import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* 1. Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="text-3xl font-black text-rose-500 tracking-tighter flex items-center gap-2">
              🩸Blood Donation
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connect with donors, save lives. We are dedicated to bridging the gap between blood donors and those in need across Bangladesh.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <SocialLink href="#" icon={<FaFacebook />} />
              <SocialLink href="#" icon={<FaTwitter />} />
              <SocialLink href="#" icon={<FaInstagram />} />
              <SocialLink href="#" icon={<FaLinkedin />} />
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5 border-b border-rose-500 w-fit pb-1">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><FooterLink to="/" text="Home" /></li>
              <li><FooterLink to="/search" text="Search Donors" /></li>
              <li><FooterLink to="/donation-requests" text="Donation Requests" /></li>
              <li><FooterLink to="/register" text="Join as Donor" /></li>
              <li><FooterLink to="/dashboard" text="Dashboard" /></li>
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5 border-b border-rose-500 w-fit pb-1">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-rose-500 mt-1" />
                <span>Level-4, 34, Awal Centre, Banani, Dhaka</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-rose-500" />
                <span>+880 1234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-rose-500" />
                <span>support@blooddonation.com</span>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5 border-b border-rose-500 w-fit pb-1">Newsletter</h3>
            <p className="text-slate-400 text-sm mb-4">
              Subscribe to get latest updates and news.
            </p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-rose-500 text-white text-sm"
              />
              <button className="bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-lg font-semibold transition active:scale-95 text-sm">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Blood Donation. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-rose-500 transition">Privacy Policy</a>
            <a href="#" className="hover:text-rose-500 transition">Terms of Service</a>
            <a href="#" className="hover:text-rose-500 transition">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

// Helper Components for Cleaner Code
function FooterLink({ to, text }) {
  return (
    <Link to={to} className="hover:text-rose-500 transition-colors duration-200 block">
      {text}
    </Link>
  );
}

function SocialLink({ href, icon }) {
  return (
    <a 
      href={href} 
      className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-rose-600 hover:text-white transition-all duration-300"
    >
      {icon}
    </a>
  );
}