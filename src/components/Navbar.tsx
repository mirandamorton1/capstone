import { BiSearch } from 'react-icons/bi';

import NewCustomerModal from './NewCustomerModal';


const Navbar = () => 
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
        <NewCustomerModal />
        </a>
        <form className="form-inline">
          <div className="search-bar">
            <BiSearch className="search-icon" />
            <input
              aria-label="Search"
              className="form-control"
              placeholder="Search"
              type="search"
            />
          </div>
        </form>
      </nav>
  ;

export default Navbar;