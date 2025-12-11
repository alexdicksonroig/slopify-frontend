export default function Footer() {
  return (
    <footer className="bg-gray-900 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Contact
            </h3>
            <ul className="mt-3 space-y-2">
              <li className="text-base text-gray-300">
                Email: info@slopify.com
              </li>
              <li className="text-base text-gray-300">
                Phone: +34 91 123 4567
              </li>
              <li className="text-base text-gray-300">
                Address: Calle Gran Vía 28, 28013 Madrid, Spain
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Follow Us
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-base text-gray-300 hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-300 hover:text-white transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-300 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-800 pt-6">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Slopify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
