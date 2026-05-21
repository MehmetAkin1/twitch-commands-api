export default async function handler(req, res) {
  const q = req.query.q;

  if (!q) return res.send("No query");

  try {
    // 1) search
    const searchRes = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json`
    );

    const searchData = await searchRes.json();
    const result = searchData?.query?.search?.[0];

    if (!result) {
      return res.send(`📖 ${q}: No result found.`);
    }

    const title = result.title;

    // 2) summary
    const summaryRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    );

    const data = await summaryRes.json();

    // 🔥 KRİTİK FIX: sadece extract kullan
    let text = data.extract;

    if (!text || text.includes("may refer to")) {
      text = "No clean description found.";
    }

    // 🔥 TEMİZ OUTPUT (SE için optimize)
    res.send(`📖 ${title}: ${text}`);
  } catch (e) {
    res.send(`Wiki error.`);
  }
}
