export default async function handler(req, res) {
  const q = req.query.q;

  if (!q) return res.send("No query");

  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`;
  const r = await fetch(url);
  const data = await r.json();

  res.send(`📖 ${data.title}: ${data.extract}`);
}
