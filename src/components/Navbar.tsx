import { useContext,useState } from 'react';
import { Button } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';
import { HiUserPlus } from 'react-icons/hi2';
import { AppContext, AppContextType } from '../context/AppContext';

type NavBarProps = {
  toggleNewModal: () => void;
  showNewModal: boolean;
}

const Navbar = (props: NavBarProps) => {
  const {toggleNewModal} = props;
  const [searchValue, setSearchValue] = useState(``);
  const { setCustomers } = useContext<AppContextType>(AppContext);

  const handleSearchClick = async (
  ) => {

    try {
      const response = await fetch(
        `http://localhost:3000/customers/search/${searchValue}`
      );
      const result = await response.json();
      setCustomers(result.data.customers);
    }
    catch {}
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchClick();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
      <Button
        className="btn"
        id="newCustomerBtn"
        variant="primary"
        onClick={toggleNewModal}
      >
        <HiUserPlus id="newUserIcon" size="1.25em" /> New Customer
      </Button>
      </a>
      <form className="form-inline">
        <div className="search-bar">
            <BiSearch className="search-icon"
            type="submit" onClick={handleSearchClick} />
          <input          aria-label="Search"
            className="form-control"
            id="searchInput"
            placeholder="Search"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={handleKeyPress}
          />
        </div>
      </form>
    </nav>
  );
};

export default Navbar;