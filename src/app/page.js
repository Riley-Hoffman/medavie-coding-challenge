import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { SearchForm } from "../components/SearchForm";
import { CuisineFilter } from "../components/CuisineFilter";
import { getRecipes } from "../lib/getRecipes";
import styles from "../styles/page.module.css";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const query = params.search || "";
  const cuisine = params.cuisine || "";
  const page = Math.max(1, parseInt(params.page, 10) || 1);

  const data = await getRecipes(query, page, cuisine);
  const results = data.results || [];
  const totalResults = data.totalResults || 0;
  const resultsPerPage = data.resultsPerPage || 5;
  const totalPages = Math.ceil(totalResults / resultsPerPage) || 1;

  const buildParams = (p) => {
    const urlParams = new URLSearchParams();
    if (query) urlParams.set("search", query);
    if (cuisine) urlParams.set("cuisine", cuisine);
    if (p > 1) urlParams.set("page", p.toString());
    const queryString = urlParams.toString();
    return queryString ? `/?${queryString}` : "/";
  };

  const href = (p) => buildParams(p);

  return (
    <>
      <div className={`${styles.homeContainer} max1000`}>
        <h1>Find the Perfect Recipe</h1>
        <SearchForm cuisine={cuisine} />
        <Suspense
          fallback={
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              Loading filters...
            </div>
          }
        >
          <CuisineFilter />
        </Suspense>
        {(query || cuisine) && (
          <p className={styles.resultsInfo}>
            Found {totalResults} results
            {query && ` for "${query}"`}
            {cuisine && ` in ${cuisine} cuisine`}
            {totalPages > 1 && (
              <span>
                {" "}
                (Page {page} of {totalPages})
              </span>
            )}
          </p>
        )}
        <ul className={`${styles.resultsList} max1000`}>
          {results.map((recipe) => (
            <li key={recipe.id}>
              <Link href={`/recipe/${recipe.id}`}>
                <p>{recipe.title}</p>
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  width={400}
                  height={296}
                />
              </Link>
            </li>
          ))}
        </ul>
        {totalPages > 1 && (
          <nav className={styles.pagination} aria-label='Search results pages'>
            {page > 1 ? (
              <Link href={href(page - 1)} className='button'>
                ← Previous
              </Link>
            ) : (
              ""
            )}
            <span className={styles.pageInfo}>
              Page {page} of {totalPages}
            </span>
            {page < totalPages ? (
              <Link href={href(page + 1)} className='button'>
                Next →
              </Link>
            ) : (
              ""
            )}
          </nav>
        )}
      </div>
    </>
  );
}
