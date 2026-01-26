export async function searchYouTube(query, apiKey) {
  const url = "https://www.googleapis.com/youtube/v3/search";

  const params = new URLSearchParams({
    part: "snippet",
    q: query,
    type: "video",
    maxResults: 10,
    key: apiKey,
  });

  const res = await fetch(`${url}?${params}`);
  const data = await res.json();
  return data.items;
}
