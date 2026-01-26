import { useState, useEffect } from "react";

export default function FavoritePage() {
  const [favorites, setFavorites] = useState([]);

  const removeFavorite = (videoId) => {
    const newFavs = favorites.filter(v => v.id.videoId !== videoId);
    setFavorites(newFavs);
    localStorage.setItem("favorites", JSON.stringify(newFavs));
  };


  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  return (
    <div>
      <h1>お気に入り一覧</h1>

      <div className="video-list">
        {favorites.map((v) => (
          <div className="video-item" key={v.id.videoId}>
            <h3>{v.snippet.title}</h3>
            <iframe
              width="320"
              height="180"
              src={`https://www.youtube.com/embed/${v.id.videoId}`}
              allowFullScreen
            />
            <button onClick={() => removeFavorite(v.id.videoId)}>削除</button>
          </div>
        ))}
      </div>
    </div>
  );
}
