import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import SavedNews from "./components/SavedNews/SavedNews";
import Navigation from "./components/Navigation/Navigation";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/saved-news" element={<SavedNews />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
