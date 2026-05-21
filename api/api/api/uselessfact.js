export default async function handler(req, res) {
  const r = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
  const data = await r.json();

  res.send(`🤯 ${data.text}`);
}
