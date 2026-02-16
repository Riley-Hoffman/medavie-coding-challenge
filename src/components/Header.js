import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  return (
    <header>
      <div>
        CookSeek <FontAwesomeIcon icon={faKitchenSet} />
      </div>
    </header>
  );
};
