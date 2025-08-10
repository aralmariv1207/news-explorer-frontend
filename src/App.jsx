import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import SavedNews from "./components/SavedNews/SavedNews";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// Ensure 'About' is NOT imported here. It's handled by Main.jsx.
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import RegisterSuccessModal from "./components/RegisterSuccessModal/RegisterSuccessModal";

import { searchNews } from "./api/newsApi";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isRegisterSuccessModalOpen, setIsRegisterSuccessModalOpen] =
    useState(false);
  const [apiError, setApiError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [articlesToShow, setArticlesToShow] = useState(3);
  const [savedArticles, setSavedArticles] = useState([]); // 'setSavedArticles' will now be used

  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [registrationServerError, setRegistrationServerError] = useState(null);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setApiError(null);
    setNewsData([]);
    setHasSearched(true);
    setArticlesToShow(3); // Reset articles to show on new search
    try {
      const articles = await searchNews(query);

      if (articles.length === 0) {
        setApiError("Nothing found"); // This is a specific message, not a general server error
      } else {
        setNewsData(articles);
      }
    } catch (error) {
      console.error("API Error:", error);
      setApiError(
        "Server error: Could not connect the News API. Please try again later." // Generic API error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    console.log("User logged out");
  };

  const closeAllModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setIsRegisterSuccessModalOpen(false);
    setRegistrationServerError(null);
  };

  const handleLoginClick = () => {
    closeAllModals();
    setIsLoginModalOpen(true);
  };

  const handleRegisterClick = () => {
    closeAllModals();
    setIsRegisterModalOpen(true);
  };

  const handleLoginSubmit = ({ email, password }) => {
    console.log("Attempting login with:", { email, password });
    setIsLoggedIn(true);
    const nameFromEmail = email.split("@")[0];
    setCurrentUser({ name: nameFromEmail || "User" });
    closeAllModals();
  };

  const handleRegisterSubmit = ({ email, password, username }) => {
    console.log("Attempting registration with:", { email, password, username });
    if (email === "taken@test.com") {
      setRegistrationServerError("This email is not available");
      console.log("Registration failed: Email already taken.");
      return;
    }

    setIsLoggedIn(true);
    setCurrentUser({ name: username });
    closeAllModals();
    setIsRegisterSuccessModalOpen(true);
    setRegistrationServerError(null);
  };

  // Function to handle saving an article
  const handleSaveArticle = (articleToSave) => {
    console.log("Saving article:", articleToSave.title);
    const isAlreadySaved = savedArticles.some(
      (saved) => saved.url === articleToSave.url
    );
    if (!isAlreadySaved) {
      const articleWithKeyword = { ...articleToSave, keyword: "General" }; // Example keyword
      setSavedArticles((prevSavedArticles) => [
        ...prevSavedArticles,
        articleWithKeyword,
      ]);
    } else {
      console.log("Article already saved:", articleToSave.title);
    }
  };

  // Function to handle deleting an article (for Saved News page)
  const handleDeleteArticle = (articleToDeleteUrl) => {
    console.log("Deleting article with URL:", articleToDeleteUrl);
    setSavedArticles((prevSavedArticles) =>
      prevSavedArticles.filter((article) => article.url !== articleToDeleteUrl)
    );
  };

  // Logic for "Show more" button visibility
  const articlesForDisplay = newsData.slice(0, articlesToShow);
  const showMoreButtonVisible =
    articlesForDisplay.length > 0 &&
    articlesForDisplay.length < newsData.length;

  const handleShowMoreClick = () => {
    setArticlesToShow((prevCount) => prevCount + 3);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLogout={handleLogout}
          onSignInClick={handleLoginClick}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                isLoading={isLoading}
                newsData={articlesForDisplay} // Pass sliced data for display
                apiError={apiError}
                hasSearched={hasSearched}
                onSearch={handleSearch}
                isLoggedIn={isLoggedIn}
                onShowMoreClick={handleShowMoreClick} // Pass the handler
                showMoreButtonVisible={showMoreButtonVisible} // Pass the visibility boolean
                onSaveArticle={handleSaveArticle} // Pass the save article handler
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <SavedNews
                savedArticles={savedArticles} // This prop is now actively used
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                onDeleteArticle={handleDeleteArticle} // Pass delete handler
              />
            }
          />
        </Routes>
        <Footer />
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeAllModals}
        onLogin={handleLoginSubmit}
        onRegisterClick={handleRegisterClick}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeAllModals}
        onRegister={handleRegisterSubmit}
        onLoginClick={handleLoginClick}
        serverError={registrationServerError}
      />
      <RegisterSuccessModal
        isOpen={isRegisterSuccessModalOpen}
        onClose={closeAllModals}
        onSignInClick={handleLoginClick}
      />
    </BrowserRouter>
  );
}

export default App;
