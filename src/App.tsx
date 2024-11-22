import React, { useState } from 'react';
import { Laugh, Users, Loader2 } from 'lucide-react';
import { JokeCard } from './components/JokeCard';
import { JokeForm } from './components/JokeForm';
import { useJokes } from './hooks/useJokes';

function App() {
  const { userJokes, isLoading, error, fetchRandomJoke, addUserJoke } = useJokes();
  const [currentJoke, setCurrentJoke] = useState<string | null>(null);
  const [showUserJokes, setShowUserJokes] = useState(false);

  const handleGetJoke = async () => {
    const joke = await fetchRandomJoke();
    if (joke) setCurrentJoke(joke);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Joke Generator
          </h1>
          <p className="text-gray-600">Get your daily dose of humor!</p>
        </div>

        <div className="space-y-8">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowUserJokes(false)}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                !showUserJokes
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Laugh className="w-5 h-5" />
              <span>Random Jokes</span>
            </button>
            <button
              onClick={() => setShowUserJokes(true)}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                showUserJokes
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>User Jokes</span>
            </button>
          </div>

          {!showUserJokes ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <button
                  onClick={handleGetJoke}
                  disabled={isLoading}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                  <span>Get Random Joke</span>
                </button>
              </div>

              {error && (
                <div className="text-red-500 text-center animate-fade-in">
                  {error}
                </div>
              )}

              {currentJoke && (
                <div className="animate-fade-in">
                  <JokeCard content={currentJoke} />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <JokeForm onSubmit={addUserJoke} />
              </div>
              
              <div className="space-y-4">
                {userJokes.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No user-submitted jokes yet. Be the first to share one!
                  </p>
                ) : (
                  userJokes
                    .slice()
                    .reverse()
                    .map((joke) => (
                      <div key={joke.id} className="animate-fade-in">
                        <JokeCard
                          content={joke.content}
                          isUserSubmitted={joke.isUserSubmitted}
                        />
                      </div>
                    ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;