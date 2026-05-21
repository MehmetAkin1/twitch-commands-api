export default async function handler(req, res) {
  const q = req.query.q;

  if (!q) return res.send("No query");

  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`;
    const r = await fetch(url);
    const data = await r.json();

    // SAFETY FIX (asıl çözüm burada)
    const title = data.title || q;
    const extract = data.extract || "No description found.";

    res.status(200).send(`📖 ${title}: ${extract}`);
  } catch (e) {
    res.status(200).send("Wiki error.");
  }
}
