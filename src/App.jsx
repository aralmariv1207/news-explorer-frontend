import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import SavedNews from "./components/SavedNews/SavedNews";
import Navigation from "./components/Navigation/Navigation";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SearchForm from "./components/SearchForm/SearchForm";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import LoginModal from "./components/LoginModal/LoginModal";

import { searchNews } from "./api/newsApi";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // Make sure this is present
  const [apiError, setApiError] = useState(null);

  const handleSearch = async (query) => {
    console.log("handleSearch: Setting isLoading to TRUE");
    setIsLoading(true);
    setApiError(null);
    setNewsData([]);

    try {
      const articles = await searchNews(query);
      console.log("handleSearch: Data received and parsed.");

      setNewsData(articles);

      if (articles.length === 0) {
        console.log("handleSearch: No results found.");
        setApiError(
          "No results found for your search. Please try a different query."
        );
      }
    } catch (error) {
      console.error("handleSearch: Caught an error during fetch:", error);
      setApiError(
        error.message ||
          "Failed to fetch news. Please check your internet connection or try again."
      );
    } finally {
      console.log("handleSearch: Finally block - Setting isLoading to FALSE");
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => {
    closeAllModals();
    setIsRegisterModalOpen(true);
  };

  const handleLoginClick = () => {
    closeAllModals();
    setIsLoginModalOpen(true);
  };

  const closeAllModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Navigation />

        <SearchForm onSearch={handleSearch} />
        <Main isLoading={isLoading} newsData={newsData} />

        {apiError && (
          <div className="api-error-message">
            <p>{apiError}</p>
          </div>
        )}

        {/* Temporary buttons to open specific modals for testing */}
        {/* ADD THESE BUTTONS FOR TESTING */}
        <button
          onClick={handleLoginClick}
          style={{
            position: "fixed",
            bottom: "60px",
            right: "20px",
            zIndex: 1000,
            padding: "10px",
            backgroundColor: "lightblue",
          }}
        >
          Sign in
        </button>
        <button
          onClick={handleRegisterClick}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
            padding: "10px",
            backgroundColor: "lightgreen",
          }}
        >
          Sign up
        </button>
        {/* END OF ADDED BUTTONS */}

        {/* Render the specific modals */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeAllModals}
          onLogin={() => {
            console.log("Login attempt");
            closeAllModals();
          }}
        />

        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={closeAllModals}
          onRegister={() => {
            console.log("Register attempt");
            closeAllModals();
          }}
        />

        <Routes>
          <Route
            path="/"
            element={<Main isLoading={isLoading} newsData={newsData} />}
          />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
