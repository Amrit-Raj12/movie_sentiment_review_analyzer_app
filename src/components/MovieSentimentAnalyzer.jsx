

import  { useState } from 'react';
import { Sparkles, Film, ThumbsUp, ThumbsDown, Zap, Brain } from 'lucide-react';
import { BASE_URL } from '../constant/API';

export default function MovieSentimentAnalyzer() {
  const [review, setReview] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [confidence, setConfidence] = useState(0);

  const handleAnalyze = async () => {
    if (!review.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      // 🔹 Call FastAPI backend
      const response = await fetch(`${BASE_URL}predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review }),
      });

      const data = await response.json();

      // 🔹 Use API response
      setResult(data.sentiment.toLowerCase()); // "Positive"/"Negative"
      setConfidence(Math.round(data.score * 100)); // Convert score [0–1] → %
    } catch (error) {
      console.error("Error:", error);
      setResult("error");
      setConfidence(0);
    }

    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center transform rotate-3 animate-pulse">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-bounce" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
            AI Movie Sentiment
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Harness the power of AI to analyze movie reviews and discover their emotional sentiment with precision
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Film className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-semibold text-white">Review Analyzer</h2>
          </div>

          {/* Input Area */}
          <div className="space-y-6">
            <div className="relative">
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Enter your movie review here..."
                className="w-full h-32 bg-slate-800/50 border-2 border-slate-600/50 rounded-2xl p-4 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300 resize-none"
                disabled={isAnalyzing}
              />
              <div className="absolute bottom-4 right-4 text-sm text-slate-400">
                {review.length}/1000
              </div>
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={!review.trim() || isAnalyzing}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 flex items-center justify-center gap-3 shadow-lg"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Analyzing Sentiment...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Analyze Sentiment
                </>
              )}
            </button>
          </div>

          {/* Results */}
          {(result || isAnalyzing) && (
            <div className="mt-8 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                Analysis Results
              </h3>

              {isAnalyzing ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center animate-pulse">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="text-slate-300">Processing natural language...</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
                      <Brain className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-slate-300">Analyzing emotional patterns...</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center animate-pulse">
                      <Zap className="w-4 h-4 text-pink-400" />
                    </div>
                    <div className="text-slate-300">Calculating sentiment score...</div>
                  </div>
                </div>
              ) : result && (
                <div className="space-y-6">
                  {/* Sentiment Result */}
                  <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      {result === 'positive' ? (
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center animate-bounce">
                          <ThumbsUp className="w-6 h-6 text-green-400" />
                        </div>
                      ) : result === 'negative' ? (
                        <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center animate-bounce">
                          <ThumbsDown className="w-6 h-6 text-red-400" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-500/20 rounded-full flex items-center justify-center">
                          <Film className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <div className="text-xl font-bold text-white capitalize">{result} Sentiment</div>
                        <div className="text-sm text-slate-400">AI Confidence: {confidence}%</div>
                      </div>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>Confidence Level</span>
                      <span>{confidence}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          result === 'positive' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                          result === 'negative' ? 'bg-gradient-to-r from-red-500 to-rose-500' :
                          'bg-gradient-to-r from-gray-500 to-slate-500'
                        }`}
                        style={{ width: `${confidence}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Reset Button */}
                  <button
                    onClick={() => {
                      setReview('');
                      setResult(null);
                      setConfidence(0);
                    }}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200"
                  >
                    Analyze Another Review
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-400 text-sm">
          <p>Powered by AI • FastAPI + React + Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}