export default async function handler(req, res) {
  const response = await fetch(
    "https://lichess.org/api/challenge/open",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LICHESS_TOKEN}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        rating: "800",
        clock_limit: "600",
        clock_increment: "0",
        color: "random"
      })
    }
  );

  const data = await response.json();

  if (data.url) {
    res.writeHead(302, {
      Location: data.url
    });
    res.end();
  } else {
    res.status(500).json(data);
  }
}
