export default async function handler(req, res) {
  const q = req.query.q;

  const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(q)}?fullText=true`;
  const r = await fetch(url);
  const data = await r.json();

  const c = data[0];

  res.send(
    `🌍 ${c.name.common} | Capital: ${c.capital?.[0]} | Population: ${c.population.toLocaleString()}`
  );
}
