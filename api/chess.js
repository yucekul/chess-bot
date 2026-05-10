export default async function handler(req, res) {
  const response = await fetch(
    "https://lichess.org/api/challenge/ai",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LICHESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        level: "3",       // 800'e en yakın
        color: "random"
      })
    }
  );

  const data = await response.json();

  if (data.id) {
    // 🔥 KRİTİK KISIM: direkt oyuna at
    res.writeHead(302, {
      Location: `https://lichess.org/${data.id}`
    });
    res.end();
  } else {
    res.status(500).json(data);
  }
}
