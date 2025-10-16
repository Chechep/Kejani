import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-gray-700 dark:text-gray-300">
        {/* Brand / About */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">KejaLink</h2>
          <p className="text-sm leading-relaxed">
            Connecting tenants, landlords and agents seamlessly. Manage properties,
            payments and reports all in one place.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-blue-500" /> support@kejalink.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-green-500" /> +254 790 086 093
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-red-500" /> Nairobi, Kenya
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Follow Us</h3>
          <div className="flex gap-4">
            {[
              { icon: <Facebook size={18} />, color: "hover:text-blue-600 hover:border-blue-600" },
              { icon: <Twitter size={18} />, color: "hover:text-sky-400 hover:border-sky-400" },
              { icon: <Instagram size={18} />, color: "hover:text-pink-500 hover:border-pink-500" },
            ].map((item, i) => (
              <a
                key={i}
                href="#"
                className={`p-2 rounded-full border border-gray-400 transition-all duration-300 transform hover:scale-105 hover:shadow-md ${item.color}`}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 dark:border-gray-800 text-center py-4 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} <span className="font-semibold text-gray-700 dark:text-gray-300">KejaLink</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
