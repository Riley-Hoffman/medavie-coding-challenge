import Image from "next/image";
import { SearchForm } from "../components/SearchForm";
import { getRecipes } from "../lib/getRecipes";
import styles from "./page.module.css";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const query = params.search || "";

  const data = await getRecipes(query);
  const results = data.results;

  return (
    <>
      <div className={styles.h1Container}>
        <h1 className={styles.max1400}>Fetched Recipes</h1>
      </div>
      <div className={styles.max1400}>
        <SearchForm />
        <ul className={styles.resultsList}>
          {results.map((recipe) => (
            <li key={recipe.id}>
              <p>{recipe.title}</p>
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={312}
                height={231}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
