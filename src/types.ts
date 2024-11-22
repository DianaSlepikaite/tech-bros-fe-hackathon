export interface Joke {
  id: string;
  content: string;
  isUserSubmitted: boolean;
  createdAt: string;
}

export interface JokeResponse {
  joke: string;
}