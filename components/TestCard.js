import Link from 'next/link'
import { BookOpen, Clock, BarChart3 } from 'lucide-react'

export default function TestCard({ test, onQuickStart }) {
  return (
    <div className="card group cursor-pointer transform transition hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-indigo-100 p-3 rounded-lg group-hover:bg-indigo-200 transition">
          <BookOpen className="text-indigo-600" size={24} />
        </div>
        <span className="badge bg-green-100 text-green-800">Popular</span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{test.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{test.description}</p>

      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-2 text-gray-700">
          <BarChart3 size={16} />
          <span className="text-sm">{test.questions.length} Questions</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <Clock size={16} />
          <span className="text-sm">{test.duration || 30} minutes</span>
        </div>
        {test.difficulty && (
          <div className="flex items-center space-x-2 text-gray-700">
            <span className={`text-sm font-semibold px-2 py-1 rounded ${
              test.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              test.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {test.difficulty}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Link href={`/mock/${test.id}`} className="flex-1 btn-primary text-center">Start Test</Link>
        <button className="flex-1 btn-secondary">Preview</button>
      </div>
    </div>
  )
}
