export default function Footer() {
  return (
    <footer className="bg-gray-900 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 xs:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
              Contact
            </h3>
            <div className="space-y-2">
              <p className="text-xs text-gray-400">Email: info@slopify.com</p>
              <p className="text-xs text-gray-400">Phone: +34 91 123 4567</p>
              <p className="text-xs text-gray-400">
                Address: Calle Gran Vía 28, 28013 Madrid, Spain
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
              Follow Us
            </h3>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-xs text-gray-400 hover:text-white transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="block text-xs text-gray-400 hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="block text-xs text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-6">
          <p className="text-xs text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Slopify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
