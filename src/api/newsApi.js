// Function to search for news articles
export const searchNews = async (query) => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  // Validate API key
  if (
    !apiKey ||
    apiKey.trim() === "" ||
    apiKey === "YOUR_ACTUAL_API_KEY_HERE"
  ) {
    console.error("API Key check failed!");
    throw new Error(
      "API key is missing or not set. Please check your environment variables."
    );
  }

  console.log("API Key is present.");
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

  const response = await fetch(url);
  console.log("Fetch response received.");

  if (!response.ok) {
    console.error("HTTP error occurred:", response.status);
    let errorMessage = `HTTP error! Status: ${response.status}`;

    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (jsonError) {
      console.error("Failed to parse error response as JSON.", jsonError);
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data.articles || [];
};
