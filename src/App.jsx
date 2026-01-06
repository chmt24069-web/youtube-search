import { useState } from "react";
import { searchYouTube } from "./api/youtube";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);

  const handleSearch = async () => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    if (!apiKey) {
      alert("APIキーが読み込めませんでした");
      return;
    }

    const results = await searchYouTube(query, apiKey);
    setVideos(results);
  };

  return (
    <div>
      <h1 className="title">YouTube動画検索</h1>
      <div className="search-container">
        <img src="/youtube.jpg" alt="Youtube" className="yt-icon"/>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="検索ワードを入力"
          className="search-input"
        />

        <button onClick={handleSearch} className="search-button">
          検索
        </button>
      </div>

      <div>
        {videos.map((v) => (
          <div className="video-item" key={v.id.videoId}>
            <h3>{v.snippet.title}</h3>
            <img src={v.snippet.thumbnails.medium.url} alt="thumbnail" />
            <iframe
             width="320"
             height="180"
             src={`https://www.youtube.com/embed/${v.id.videoId}`}
             allowFullScreen
             />
          </div>
        ))}
      </div>
    </div>
  );
}
