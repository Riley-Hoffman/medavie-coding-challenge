import { getRecipes } from "../lib/getRecipes";

export default async function Home() {
  const data = await getRecipes("vegan");
  const results = data.results;

  return (
    <main>
      <h1>Server-Fetched Recipes</h1>
      <ul>
        {results.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </main>
  );
}
