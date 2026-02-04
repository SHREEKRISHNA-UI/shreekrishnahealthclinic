import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Timer from '../../components/Timer'
import { CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react'

export default function TestPage() {
  const router = useRouter()
  const { id } = router.query
  const [test, setTest] = useState(null)
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [markedForReview, setMarkedForReview] = useState(new Set())
  const [showReview, setShowReview] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch('/api/tests')
      .then((r) => r.json())
      .then((tests) => tests.find((t) => String(t.id) === String(id)))
      .then(setTest)
  }, [id])

  if (!test) return (
    <Layout>
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    </Layout>
  )

  function choose(qIndex, optionIndex) {
    setAnswers((s) => ({ ...s, [qIndex]: optionIndex }))
    // Remove from review when answered
    const newMarked = new Set(markedForReview)
    newMarked.delete(qIndex)
    setMarkedForReview(newMarked)
  }

  function toggleReview(qIndex) {
    const newMarked = new Set(markedForReview)
    if (newMarked.has(qIndex)) {
      newMarked.delete(qIndex)
    } else {
      newMarked.add(qIndex)
    }
    setMarkedForReview(newMarked)
  }

  function submit() {
    let correct = 0
    test.questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++
    })
    const percentage = Math.round((correct / test.questions.length) * 100)
    setScore({ correct, total: test.questions.length, percentage })
    setShowReview(false)
  }

  function handleTimeUp() {
    submit()
  }

  if (score) {
    const isPassed = score.percentage >= 60
    return (
      <Layout>
        <div className="max-w-2xl mx-auto animate-slide-in">
          {/* Result Card */}
          <div className={`card text-center mb-8 border-t-4 ${isPassed ? 'border-green-500' : 'border-red-500'}`}>
            <div className={`text-6xl font-bold mb-4 ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
              {score.percentage}%
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isPassed ? '🎉 Congratulations!' : 'Keep Practicing!'}
            </h2>
            <p className="text-gray-600 mb-6">
              You answered <span className="font-bold text-indigo-600">{score.correct}</span> out of <span className="font-bold text-indigo-600">{score.total}</span> questions correctly.
            </p>

            {/* Performance Breakdown */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex justify-around text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600">{score.correct}</div>
                  <p className="text-gray-600 text-sm">Correct</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600">{score.total - score.correct}</div>
                  <p className="text-gray-600 text-sm">Incorrect</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600">{score.percentage}%</div>
                  <p className="text-gray-600 text-sm">Score</p>
                </div>
              </div>

              {/* Performance Bar */}
              <div className="mt-6 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${isPassed ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${score.percentage}%` }}
                />
              </div>
            </div>

            {/* Review Answers */}
            <div className="text-left mb-8">
              <button
                onClick={() => setShowReview(!showReview)}
                className="btn-secondary w-full mb-4"
              >
                {showReview ? 'Hide Review' : 'Review Answers'}
              </button>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setScore(null)} className="btn-primary flex-1">
                Retake Test
              </button>
              <button onClick={() => router.push('/')} className="btn-secondary flex-1">
                Back to Tests
              </button>
            </div>
          </div>

          {/* Review Section */}
          {showReview && (
            <div className="space-y-4 animate-slide-in">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Answer Review</h3>
              {test.questions.map((q, i) => {
                const isCorrect = answers[i] === q.correct
                return (
                  <div key={i} className="card border-l-4" style={{
                    borderLeftColor: isCorrect ? '#10b981' : '#ef4444'
                  }}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {isCorrect ? (
                            <CheckCircle className="text-green-600" size={20} />
                          ) : (
                            <XCircle className="text-red-600" size={20} />
                          )}
                          <span className="font-semibold text-gray-900">Q{i + 1}. {q.text}</span>
                        </div>
                        <p className={`text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          {isCorrect ? 'Correct!' : `Wrong! Correct answer: ${q.options[q.correct]}`}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Your answer:</p>
                      <p className={`text-sm ${answers[i] !== undefined ? 'text-gray-900' : 'text-gray-500'}`}>
                        {answers[i] !== undefined ? q.options[answers[i]] : 'Not answered'}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </Layout>
    )
  }

  const q = test.questions[currentQuestion]
  const answered = answers[currentQuestion] !== undefined
  const isMarkedForReview = markedForReview.has(currentQuestion)
  const answeredCount = Object.keys(answers).length
  const unansweredCount = test.questions.length - answeredCount

  return (
    <Layout>
      {/* Timer */}
      <Timer duration={test.duration || 30} onTimeUp={handleTimeUp} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Main Test Area */}
        <div className="lg:col-span-3">
          <div className="card">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-900">
                  Question {currentQuestion + 1} of {test.questions.length}
                </span>
                <span className="text-sm text-gray-600">
                  {answered ? '✓ Answered' : '○ Not answered'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all"
                  style={{ width: `${((currentQuestion + 1) / test.questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {q.text}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {q.options.map((opt, oi) => (
                  <label key={oi} className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-600 hover:bg-indigo-50 transition">
                    <input
                      type="radio"
                      name={`q-${currentQuestion}`}
                      checked={answers[currentQuestion] === oi}
                      onChange={() => choose(currentQuestion, oi)}
                      className="w-4 h-4"
                    />
                    <span className="ml-4 text-gray-900">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={() => toggleReview(currentQuestion)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                  isMarkedForReview
                    ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {isMarkedForReview ? '📌 Review Marked' : '📌 Mark for Review'}
              </button>
            </div>

            {/* Navigation */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="flex-1 flex items-center justify-center gap-2 btn-secondary disabled:opacity-50"
              >
                <ChevronLeft size={20} /> Previous
              </button>
              <button
                onClick={() => setCurrentQuestion(Math.min(test.questions.length - 1, currentQuestion + 1))}
                disabled={currentQuestion === test.questions.length - 1}
                className="flex-1 flex items-center justify-center gap-2 btn-primary disabled:opacity-50"
              >
                Next <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar - Question Navigator */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="font-bold text-gray-900 mb-4">Questions</h3>

            {/* Stats */}
            <div className="space-y-2 mb-4 pb-4 border-b">
              <div className="flex justify-between text-sm">
                <span className="text-green-600">✓ Answered</span>
                <span className="font-bold">{answeredCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-orange-600">📌 Review</span>
                <span className="font-bold">{markedForReview.size}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">○ Unanswered</span>
                <span className="font-bold">{unansweredCount}</span>
              </div>
            </div>

            {/* Question Grid */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {test.questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQuestion(i)}
                  className={`aspect-square rounded font-bold text-sm transition ${
                    currentQuestion === i
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                      : answers[i] !== undefined
                      ? 'bg-green-100 text-green-800'
                      : markedForReview.has(i)
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Submit Button */}
            <button onClick={submit} className="btn-primary w-full">
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

