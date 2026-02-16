const RESULTS_PER_PAGE = 5;

export async function getRecipes(query, page = 1, cuisine = "") {
  const api_key = process.env.SPOONACULAR_API_KEY;
  if (!api_key) {
    throw new Error(
      "SPOONACULAR_API_KEY is not set. Add it to .env.local and restart the dev server.",
    );
  }

  const offset = (Math.max(1, page) - 1) * RESULTS_PER_PAGE;
  const params = new URLSearchParams({
    apiKey: api_key,
    query: query || "",
    number: RESULTS_PER_PAGE.toString(),
    offset: offset.toString(),
  });
  
  if (cuisine) {
    params.set("cuisine", cuisine);
  }
  
  const url = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Failed to fetch data (${res.status} ${res.statusText}): ${body.slice(0, 200)}`,
    );
  }

  const data = await res.json();
  return { ...data, resultsPerPage: RESULTS_PER_PAGE };
}

export async function getRecipeById(id) {
  const api_key = process.env.SPOONACULAR_API_KEY;
  if (!api_key) {
    throw new Error(
      "SPOONACULAR_API_KEY is not set. Add it to .env.local and restart the dev server.",
    );
  }

  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${api_key}`;
  const res = await fetch(url);

  if (!res.ok) {
    if (res.status === 404) return null;
    const body = await res.text();
    throw new Error(
      `Failed to fetch recipe (${res.status} ${res.statusText}): ${body.slice(0, 200)}`,
    );
  }

  return res.json();
}
