/**
 * @file MovieSentimentAnalyzer.test.jsx
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MovieSentimentAnalyzer from "../components/MovieSentimentAnalyzer";

// Mock fetch globally with Vitest
beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("should render textarea and analyze button", () => {
  render(<MovieSentimentAnalyzer />);
  expect(screen.getByPlaceholderText(/enter your movie review/i)).toBeInTheDocument();
  expect(screen.getByText(/analyze sentiment/i)).toBeInTheDocument();
});

test("should call API and show positive sentiment", async () => {
  // Mock API response
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      sentiment: "Positive",
      score: 0.87,
    }),
  });

  render(<MovieSentimentAnalyzer />);

  const textarea = screen.getByPlaceholderText(/enter your movie review/i);
  fireEvent.change(textarea, { target: { value: "This movie was amazing!" } });

  const button = screen.getByText(/analyze sentiment/i);
  fireEvent.click(button);

  // Wait for API result to show
  await waitFor(() =>
    expect(screen.getByText(/positive sentiment/i)).toBeInTheDocument()
  );

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/predict/), expect.any(Object));
  expect(screen.getByText(/AI Confidence: 87%/i)).toBeInTheDocument();
});

test("should handle API error gracefully", async () => {
  fetch.mockRejectedValueOnce(new Error("API down"));

  render(<MovieSentimentAnalyzer />);

  const textarea = screen.getByPlaceholderText(/enter your movie review/i);
  fireEvent.change(textarea, { target: { value: "Bad API" } });

  const button = screen.getByText(/analyze sentiment/i);
  fireEvent.click(button);

  await waitFor(() =>
    expect(screen.getByText(/error sentiment/i)).toBeInTheDocument()
  );
});
