import styles from "@/styles/searchform.module.css";

export const SearchForm = () => {
  return (
    <form className={styles.search} action='/' method='GET' role='search'>
      <input type='search' name='search' />
      <button className='button' type='submit'>
        Search
      </button>
    </form>
  );
};
