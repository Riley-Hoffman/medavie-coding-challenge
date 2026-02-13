import { SearchForm } from "../components/SearchForm";
import { getRecipes } from "../lib/getRecipes";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const query = params.search || "vegan";

  const data = await getRecipes(query);
  const results = data.results;

  return (
    <main>
      <h1>Fetched Recipes</h1>
      <SearchForm />
      <ul>
        {results.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </main>
  );
}
