import { BrowserRouter, Routes, Route } from "react-router-dom";
import { homePage, searchPage } from "./routes/routes";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={homePage} element={<Home />} />
        <Route path={searchPage} element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
