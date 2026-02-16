"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "../styles/cuisinefilter.module.css";

const CUISINES = [
  "African",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

export const CuisineFilter = () => {
  const searchParams = useSearchParams();
  const currentCuisine = searchParams.get("cuisine") || "";
  const currentQuery = searchParams.get("search") || "";

  const buildUrl = (cuisine) => {
    const params = new URLSearchParams();
    if (currentQuery) {
      params.set("search", currentQuery);
    }
    if (cuisine) {
      params.set("cuisine", cuisine);
    }
    const queryString = params.toString();
    return queryString ? `/?${queryString}` : "/";
  };

  return (
    <div className={styles.filterContainer}>
      <h2 className={styles.filterTitle}>Filter by Cuisine</h2>
      <div className={styles.filterButtons}>
        <Link
          href={buildUrl("")}
          className={`${styles.filterButton} ${
            !currentCuisine ? styles.active : ""
          }`}
        >
          All
        </Link>
        {CUISINES.map((cuisine) => (
          <Link
            key={cuisine}
            href={buildUrl(cuisine)}
            className={`${styles.filterButton} ${
              currentCuisine === cuisine ? styles.active : ""
            }`}
          >
            {cuisine}
          </Link>
        ))}
      </div>
    </div>
  );
};
