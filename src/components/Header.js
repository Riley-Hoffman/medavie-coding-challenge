import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  return (
    <header>
      <div className='max1400'>
        CookSeek <FontAwesomeIcon icon={faKitchenSet} />
      </div>
    </header>
  );
};
