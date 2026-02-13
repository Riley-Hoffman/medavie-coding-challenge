export async function getRecipes(query) {
  const api_key = process.env.SPOONACULAR_API_KEY;
  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&query=${query}&number=100`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
