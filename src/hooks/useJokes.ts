import { useState, useEffect } from 'react';
import { Joke } from '../types';

export function useJokes() {
  const [userJokes, setUserJokes] = useState<Joke[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedJokes = localStorage.getItem('userJokes');
    if (savedJokes) {
      setUserJokes(JSON.parse(savedJokes));
    }
  }, []);

  const fetchRandomJoke = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single');
      const data = await response.json();
      
      if (!response.ok) throw new Error('Failed to fetch joke');
      return data.joke;
    } catch (err) {
      setError('Failed to fetch joke. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const addUserJoke = (content: string) => {
    const newJoke: Joke = {
      id: crypto.randomUUID(),
      content,
      isUserSubmitted: true,
      createdAt: new Date().toISOString(),
    };
    
    const updatedJokes = [...userJokes, newJoke];
    setUserJokes(updatedJokes);
    localStorage.setItem('userJokes', JSON.stringify(updatedJokes));
  };

  return {
    userJokes,
    isLoading,
    error,
    fetchRandomJoke,
    addUserJoke,
  };
}