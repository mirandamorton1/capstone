import { BiSearch } from "react-icons/bi";
import { useState, useContext } from "react";
import NewCustomerModal from "./NewCustomerModal";
import { AppContext, AppContextType } from "../context/AppContext";
import { Button } from "react-bootstrap";
import { HiUserPlus } from "react-icons/hi2";

interface NavBarProps {
  toggleNewModal: () => void;
  showNewModal: boolean;
}

const Navbar = (props: NavBarProps) => {
  const {toggleNewModal, showNewModal} = props;

  const [searchValue, setSearchValue] = useState("");
  const { setCustomers } = useContext<AppContextType>(AppContext);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);


  const handleSearchClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/customers/search/${searchValue}`
      );
      const result = await response.json();
      console.log(`search result:`, result);
      console.dir(result.data);
      setCustomers(result.data.customers);
    }
    catch (err) {}
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
        {/* <NewCustomerModal customer={null} profile={null} /> */}
      </a>
      <form className="form-inline">
        <div className="search-bar">
          <Button className="search-button" onClick={handleSearchClick}>
            <BiSearch className="search-icon" />
          </Button>

          <input
            aria-label="Search"
            className="form-control"
            placeholder="Search"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </form>
    </nav>
  );
};

export default Navbar;