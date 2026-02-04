import { useEffect, useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import TestCard from '../components/TestCard'
import { Search, Filter, Star, TrendingUp } from 'lucide-react'

export default function Home() {
  const [tests, setTests] = useState([])
  const [filteredTests, setFilteredTests] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetch('/api/tests')
      .then((r) => r.json())
      .then(setTests)
  }, [])

  useEffect(() => {
    let filtered = tests
    if (searchQuery) {
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory)
    }
    setFilteredTests(filtered)
  }, [tests, searchQuery, selectedCategory])

  const categories = ['all', ...new Set(tests.map(t => t.category || 'General'))]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="mb-12 animate-slide-in">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 md:p-16 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Master Your Knowledge
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl">
            Prepare with our comprehensive mock tests. Get ready for your exams with detailed analytics and instant feedback.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary bg-white text-indigo-600 hover:bg-gray-100">Get Started</button>
            <button className="px-6 py-3 border-2 border-white rounded-lg hover:bg-white hover:bg-opacity-10 transition font-medium">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card text-center">
          <div className="text-4xl font-bold text-indigo-600 mb-2">{tests.length}+</div>
          <p className="text-gray-600">Mock Tests</p>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold text-pink-600 mb-2">10K+</div>
          <p className="text-gray-600">Students Prepared</p>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
          <p className="text-gray-600">Success Rate</p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="mb-8">
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Found <span className="font-semibold text-indigo-600">{filteredTests.length}</span> test{filteredTests.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Tests Grid */}
      <section>
        {filteredTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">No tests found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="mt-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Test Your Knowledge?</h2>
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
          Start with our most popular test and see how well you perform. Get instant feedback and detailed analysis.
        </p>
        <button className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
          Take Your First Test
        </button>
      </section>
    </Layout>
  )
}

