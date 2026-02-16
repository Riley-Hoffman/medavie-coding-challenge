import Image from "next/image";
import Link from "next/link";
import { SearchForm } from "../components/SearchForm";
import { getRecipes } from "../lib/getRecipes";
import styles from "../styles/page.module.css";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const query = params.search || "";
  const page = Math.max(1, parseInt(params.page, 10) || 1);

  const data = await getRecipes(query, page);
  const results = data.results || [];
  const totalResults = data.totalResults || 0;
  const resultsPerPage = data.resultsPerPage || 5;
  const totalPages = Math.ceil(totalResults / resultsPerPage) || 1;

  const searchQuery = query ? `search=${encodeURIComponent(query)}` : "";
  const pageParam = (p) =>
    [searchQuery, p > 1 ? `page=${p}` : ""].filter(Boolean).join("&");
  const href = (p) => (pageParam(p) ? `/?${pageParam(p)}` : "/");

  return (
    <>
      <div className='max1000'>
        <h1>Find the Perfect Recipe</h1>
        <SearchForm />
        {query && (
          <p className={styles.resultsInfo}>
            Found {totalResults} results for &quot;{query}&quot;
            {totalPages > 1 && (
              <span>
                {" "}
                (Page {page} of {totalPages})
              </span>
            )}
          </p>
        )}
        <ul className={styles.resultsList}>
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
              <Link
                href={href(page - 1)}
                className={`${styles.pageLink} button`}
              >
                ← Previous
              </Link>
            ) : (
              ""
            )}
            <span className={styles.pageInfo}>
              Page {page} of {totalPages}
            </span>
            {page < totalPages ? (
              <Link
                href={href(page + 1)}
                className={`${styles.pageLink} button`}
              >
                Next →
              </Link>
            ) : (
              <span className={styles.pageLinkDisabled}>Next →</span>
            )}
          </nav>
        )}
      </div>
    </>
  );
}
