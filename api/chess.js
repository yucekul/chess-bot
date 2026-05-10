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
        level: "3",
        color: "random"
      })
    }
  );

  const data = await response.json();

  // 🔥 ÖNEMLİ: redirect
  if (data.id) {
    res.writeHead(302, {
      Location: `https://lichess.org/${data.id}`
    });
    res.end();
  } else {
    res.status(500).json(data);
  }
}
