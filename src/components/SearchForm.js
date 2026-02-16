import styles from "@/styles/searchform.module.css";

export const SearchForm = ({ cuisine = "" }) => {
  return (
    <form className={styles.search} action='/' method='GET' role='search'>
      <input type='search' name='search' />
      {cuisine && <input type='hidden' name='cuisine' value={cuisine} />}
      <button className='button' type='submit'>
        Search
      </button>
    </form>
  );
};
