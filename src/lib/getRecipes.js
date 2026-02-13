export async function getRecipes(query) {
  const api_key = process.env.SPOONACULAR_API_KEY;
  if (!api_key) {
    throw new Error(
      "SPOONACULAR_API_KEY is not set. Add it to .env.local and restart the dev server.",
    );
  }

  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&query=${encodeURIComponent(query || "")}&number=100`;
  const res = await fetch(url);

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Failed to fetch data (${res.status} ${res.statusText}): ${body.slice(0, 200)}`,
    );
  }

  return res.json();
}
