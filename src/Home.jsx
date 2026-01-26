import { useState } from "react";
import { searchYouTube } from "./api/youtube";
import "./App.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const addFavorite = (video) => {
    const newFavs = [...favorites, video];
    setFavorites(newFavs);
    localStorage.setItem("favorites", JSON.stringify(newFavs));
  };

  const handleSearch = async () => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const results = await searchYouTube(query, apiKey);
    setVideos(results);
  };

  return (
    <div>
      <h1>YouTube 動画検索</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索ワードを入力"
      />
      <button onClick={handleSearch}>検索</button>

      <div className="video-list">
        {videos.map((v) => (
          <div className="video-item" key={v.id.videoId}>
            <h3>{v.snippet.title}</h3>
            <iframe
              width="320"
              height="180"
              src={`https://www.youtube.com/embed/${v.id.videoId}`}
              allowFullScreen
            />
            <button onClick={() => addFavorite(v)}>お気に入り</button>
          </div>
        ))}
      </div>
    </div>
  );
}
