import './App.css'
import Loader from './components/Loader.jsx';
import MovieSentimentAnalyzer from './components/MovieSentimentAnalyzer'
import { BASE_URL } from './constant/API';
import { useAppLaunchApi } from './hook/useAppLaunchApi';

function App() {
  const { data, loading, error } = useAppLaunchApi(BASE_URL);

  if (loading) return <Loader />;
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Connection Error</h2>
        <p className="text-red-300">Error: {error.message}</p>
      </div>
    </div>
  );

  return (
    <>
      <MovieSentimentAnalyzer />
          </>
  )
}

export default App
