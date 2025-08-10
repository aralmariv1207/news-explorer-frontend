const newsApiBaseUrl =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

// Function to search for news articles
export const searchNews = async (query) => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  console.log("API Key value:", apiKey);
  console.log("API Key type:", typeof apiKey);

  // Validate API key upfront
  // If the API key is invalid or missing, we'll return an empty array
  // and App.jsx will display "Nothing found" or a more specific error if we refine it later.
  if (
    !apiKey ||
    apiKey.trim() === "" ||
    apiKey === "YOUR_ACTUAL_API_KEY_HERE"
  ) {
    console.error(
      "API Key check failed! Please ensure VITE_NEWS_API_KEY is correctly set in your .env file."
    );
    return []; // Return an empty array to prevent TypeError in App.jsx
  }

  console.log("API Key is present.");
  const url = `${newsApiBaseUrl}?q=${query}&apiKey=${apiKey}`;
  try {
    const response = await fetch(url);
    console.log("Fetch response received.");

    // Check if the HTTP response was successful (status code 200-299)
    if (!response.ok) {
      console.error("HTTP error occurred:", response.status);
      let errorMessage = `HTTP error! Status: ${response.status}`;

      try {
        // Attempt to parse the error response as JSON for more details
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (jsonError) {
        console.error("Failed to parse error response as JSON.", jsonError);
      }

      // Log the specific error message
      console.error("API fetch non-OK response details:", errorMessage);

      // Return an empty array on non-OK HTTP status to prevent TypeError
      return [];
    }

    // If response is OK, parse the JSON data
    const data = await response.json();

    // Return the articles array, or an empty array if data.articles is null/undefined
    return data.articles || [];
  } catch (error) {
    // This catch block handles network errors (e.g., no internet, CORS issues, DNS errors)
    // or errors that occur during parsing response.json()
    console.error("Network or parsing error during API call:", error);
    return []; // Return an empty array on network/parsing errors to prevent TypeError in App.jsx
  }
};
