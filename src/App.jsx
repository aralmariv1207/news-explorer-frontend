import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import SavedNews from "./components/SavedNews/SavedNews";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
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
  const [savedArticles, setSavedArticles] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [registrationServerError, setRegistrationServerError] = useState(null);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");

  const handleSearch = async (query) => {
    setIsLoading(true);
    setApiError(null);
    setNewsData([]);
    setHasSearched(true);
    setArticlesToShow(3);
    setCurrentSearchQuery(query);

    try {
      const articles = await searchNews(query);

      const processedArticles = articles.map((article) => ({
        ...article,
        id: article.url,
      }));

      if (processedArticles.length === 0) {
        setApiError("Nothing found");
      } else {
        setNewsData(processedArticles);
      }
    } catch (error) {
      console.error("API Error:", error);
      setApiError(
        "Server error: Could not connect to the News API. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSavedArticles([]);
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

  const handleSaveArticle = (articleToSave) => {
    console.log("Saving article:", articleToSave.title);
    const isAlreadySaved = savedArticles.some(
      (saved) => saved.url === articleToSave.url
    );
    if (!isAlreadySaved) {
      const articleWithKeyword = {
        ...articleToSave,
        keyword: currentSearchQuery,
      };
      setSavedArticles((prevSavedArticles) => [
        ...prevSavedArticles,
        articleWithKeyword,
      ]);
      console.log(
        "Article saved:",
        articleToSave.title,
        "with keyword:",
        currentSearchQuery
      );
    } else {
      console.log("Article already saved. Unsaving it.");
      handleDeleteArticle(articleToSave.url);
    }
  };

  const handleDeleteArticle = (articleToDeleteUrl) => {
    console.log("Deleting article with URL:", articleToDeleteUrl);
    setSavedArticles((prevSavedArticles) =>
      prevSavedArticles.filter((article) => article.url !== articleToDeleteUrl)
    );
    console.log("Article deleted:", articleToDeleteUrl);
  };

  const articlesForDisplay = newsData.slice(0, articlesToShow);
  const showMoreButtonVisible =
    articlesForDisplay.length > 0 &&
    articlesForDisplay.length < newsData.length;

  const handleShowMoreClick = () => {
    setArticlesToShow((prevCount) => prevCount + 3);
  };

  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";
  const appContainerClass = `app-container${
    isSavedNewsPage ? " app-container--saved-news" : ""
  }`;

  // --- REMOVED ESLint Fix for no-unused-vars that was causing this error ---
  // The 'showMoreButtonVisible' and 'handleShowMoreClick' are passed as props to Main,
  // which is how they are "used". ESLint's default configuration might sometimes
  // flag props as unused variables if not explicitly consumed within the component
  // where they are defined. However, the 'if (false)' workaround caused a new,
  // more direct ESLint warning. It's better to remove it and accept the
  // 'no-unused-vars' if it reappears, or adjust the ESLint config if you have access.
  // For now, removing the problematic constant condition.
  // --- END REMOVED ESLint Fix for no-unused-vars ---

  return (
    <BrowserRouter>
      <div className={appContainerClass}>
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
                newsData={articlesForDisplay}
                apiError={apiError}
                hasSearched={hasSearched}
                onSearch={handleSearch}
                isLoggedIn={isLoggedIn}
                onSaveArticle={handleSaveArticle}
                savedArticles={savedArticles}
                showMoreButtonVisible={showMoreButtonVisible}
                onShowMoreClick={handleShowMoreClick}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <SavedNews
                savedArticles={savedArticles}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                onDeleteArticle={handleDeleteArticle}
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
