import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import FavoritePage from "./FavoritePage";

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">検索</Link>
        <Link to="/favorites">お気に入り</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<FavoritePage />} />
      </Routes>
    </Router>
  );
}
