import Link from 'next/link'
import { BookOpen, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              <BookOpen className="text-indigo-600" size={32} />
              <span>ShreeKrishna Tests</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-indigo-600 transition font-medium">Home</Link>
              <Link href="/" className="text-gray-700 hover:text-indigo-600 transition font-medium">Tests</Link>
              <Link href="/" className="text-gray-700 hover:text-indigo-600 transition font-medium">Results</Link>
              <Link href="/" className="text-gray-700 hover:text-indigo-600 transition font-medium">About</Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg">Home</Link>
              <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg">Tests</Link>
              <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg">Results</Link>
              <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg">About</Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">ShreeKrishna Tests</h3>
              <p className="text-sm">Master your knowledge with our comprehensive mock tests.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-indigo-400">Home</Link></li>
                <li><Link href="/" className="hover:text-indigo-400">Tests</Link></li>
                <li><Link href="/" className="hover:text-indigo-400">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:help@shreekrishnatests.com" className="hover:text-indigo-400">Contact Us</a></li>
                <li><Link href="/" className="hover:text-indigo-400">Privacy Policy</Link></li>
                <li><Link href="/" className="hover:text-indigo-400">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-indigo-400">Twitter</a></li>
                <li><a href="#" className="hover:text-indigo-400">Facebook</a></li>
                <li><a href="#" className="hover:text-indigo-400">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2026 ShreeKrishna Tests. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
