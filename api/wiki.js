export default async function handler(req, res) {
  const q = req.query.q;

  if (!q) return res.send("No query");

  try {
    // Direkt search (en stabil yöntem)
    const search = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json`
    );

    const sData = await search.json();
    const first = sData?.query?.search?.[0];

    if (!first) {
      return res.send(`📖 ${q}: No result found.`);
    }

    const title = first.title;

    // summary al
    const summary = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    );

    const data = await summary.json();

    const extract = data.extract || "No description found.";

    res.send(`📖 ${data.title}: ${extract}`);
  } catch (e) {
    res.send("Wiki error.");
  }
}
