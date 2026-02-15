import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipeById } from "../../../lib/getRecipes";
import styles from "@/styles/recipe.module.css";

export default async function RecipePage({ params }) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  const healthLabels = [
    recipe.vegan && "Vegan",
    recipe.vegetarian && "Vegetarian",
    recipe.dairyFree && "Dairy-free",
    recipe.glutenFree && "Gluten-free",
  ].filter(Boolean);

  return (
    <div className={`${styles.recipeDetail} max1400`}>
      <Link href='/' className='button'>
        ← Back to search
      </Link>
      <h1 className={styles.title}>{recipe.title}</h1>
      {recipe.image && (
        <div className={styles.imageWrapper}>
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={636}
            height={393}
            preload={true}
          />
        </div>
      )}
      {healthLabels.length > 0 && (
        <section className={styles.section}>
          <h2>Health Information</h2>
          <ul className={styles.healthList}>
            {healthLabels.map((label) => (
              <li key={label} className={styles.healthBadge}>
                {label}
              </li>
            ))}
          </ul>
        </section>
      )}
      {recipe.extendedIngredients?.length > 0 && (
        <section className={styles.section}>
          <h2>Ingredients</h2>
          <ul className={styles.ingredientList}>
            {recipe.extendedIngredients.map((ing) => (
              <li key={ing.id} className={styles.ingredientItem}>
                <span className={styles.ingredientName}>{ing.name}</span>
                <span className={styles.ingredientMeasure}>
                  {ing.measures?.us?.amount && ing.measures?.us?.unitShort
                    ? `${ing.measures.us.amount} ${ing.measures.us.unitShort}`
                    : ing.original}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
      {recipe.instructions && (
        <section className={styles.section}>
          <h2>Cooking Instructions</h2>
          <div
            className={styles.instructions}
            dangerouslySetInnerHTML={{ __html: recipe.instructions }}
          />
        </section>
      )}
      {!recipe.instructions && recipe.analyzedInstructions?.length > 0 && (
        <section className={styles.section}>
          <h2>Cooking Instructions</h2>
          <ol className={styles.instructionSteps}>
            {recipe.analyzedInstructions.flatMap((group) =>
              (group.steps || []).map((step) => (
                <li key={step.number}>{step.step}</li>
              )),
            )}
          </ol>
        </section>
      )}
    </div>
  );
}
