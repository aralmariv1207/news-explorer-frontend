import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import SavedNews from "./components/SavedNews/SavedNews";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";

import { searchNews } from "./api/newsApi";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [articlesToShow, setArticlesToShow] = useState(3);
  const [savedArticles, setSavedArticles] = useState([]);

  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Start as false
  const [currentUser, setCurrentUser] = useState(null); // No user initially

  const handleSearch = async (query) => {
    setIsLoading(true);
    setApiError(null);
    setNewsData([]);
    setHasSearched(true);
    setArticlesToShow(3);
    setSavedArticles([]);
    try {
      const articles = await searchNews(query);

      if (articles.length === 0) {
        setApiError("Nothing found");
      } else {
        setNewsData(articles);
      }
    } catch (error) {
      console.error("API Error:", error);
      setApiError(
        "Server error: Could not connect the News API. Please try again later."
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
  };

  const handleLoginClick = () => {
    closeAllModals();
    setIsLoginModalOpen(true);
  };

  const handleRegisterClick = () => {
    closeAllModals();
    setIsRegisterModalOpen(true);
  };

  const handleLoginSubmit = () => {
    // Placeholder for actual login logic
    setIsLoggedIn(true);
    setCurrentUser({ name: "Elise" }); // Mock user
    closeAllModals();
  };

  const handleRegisterSubmit = () => {
    // Placeholder for actual registration logic
    // After successful registration, usually automatically log in or prompt for login
    setIsLoggedIn(true);
    setCurrentUser({ name: "New User" }); // Mock new user
    closeAllModals();
    // You might want to switch to login modal after successful registration, e.g.:
    // handleLoginClick();
  };

  const dataToProcess =
    newsData.length > 0 ? newsData : hasSearched ? newsData : [];

  const articlesForDisplay = dataToProcess.slice(0, articlesToShow);

  const showMoreButtonVisible =
    articlesForDisplay.length > 0 &&
    articlesForDisplay.length < dataToProcess.length;

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLogout={handleLogout}
          onSignInClick={handleLoginClick} // This now opens the LoginModal
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main
                  isLoading={isLoading}
                  newsData={articlesForDisplay}
                  apiError={apiError}
                  hasSearched={hasSearched}
                  savedArticles={savedArticles}
                  onSearch={handleSearch}
                />
                <About />
              </>
            }
          />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>
        {!isLoading && hasSearched && showMoreButtonVisible && (
          <section className="results__button-container">
            <button
              className="results__show-more-button"
              onClick={() => setArticlesToShow(articlesToShow + 3)}
              disabled={articlesToShow >= dataToProcess.length}
            >
              Show more
            </button>
          </section>
        )}
        <Footer />
      </div>

      {/* Render Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeAllModals}
        onLogin={handleLoginSubmit} // Pass the submit handler
        onRegisterClick={handleRegisterClick} // Pass handler to switch to Register
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeAllModals}
        onRegister={handleRegisterSubmit} // Pass the submit handler
        onLoginClick={handleLoginClick} // Pass handler to switch to Login
      />
    </BrowserRouter>
  );
}

export default App;
