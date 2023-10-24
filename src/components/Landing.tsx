import { HiSortDescending } from "react-icons/hi";
import {
  HiMiniDevicePhoneMobile,
  HiMiniMegaphone,
  HiTicket,
} from "react-icons/hi2";
import { useState, useContext, useEffect } from "react";
import ExistingCustomerModal from "./ExistingCustomerModal";
import { AppContext, AppContextType } from "../context/AppContext";
import { Button } from "react-bootstrap";
import NewCustomerModal from "./NewCustomerModal";

interface LandingProps {
  showNewModal: boolean;
  toggleNewModal: ()=> void;
}

const Landing = (props: LandingProps) => {
  const {showNewModal, toggleNewModal} = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [sortOrder, setSortOrder] = useState('ASC')
  const { customers, setCustomers } = useContext<AppContextType>(AppContext);
  const { selectedCustomer, setSelectedCustomer } =
    useContext<AppContextType>(AppContext);

    useEffect(
      () => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              `http://localhost:3000/customers?page=${currentPage}&limit=${itemsPerPage}&sortOrder=${sortOrder}`
            );
            const result = await response.json();
            console.dir(result.data);
            setCustomers(result.data.customers);
          }
          catch (err) {
            console.error(err);
          }
        };
    
        fetchData();
      },
      [currentPage, itemsPerPage, sortOrder]
    );
    

  const [showModal, setShowModal] = useState(false);

  const handleRowClick = (customer: any) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              <svg
                fill="none"
                height="20"
                id="contactIcon"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M1 6C1 4.34315 2.34315 3 4 3H16C17.6569 3 19 4.34315 19 6V14C19 15.6569 17.6569 17 16 17H4C2.34315 17 1 15.6569 1 14V6ZM5 7.5C5 6.39543 5.89543 5.5 7 5.5C8.10457 5.5 9 6.39543 9 7.5C9 8.60457 8.10457 9.5 7 9.5C5.89543 9.5 5 8.60457 5 7.5ZM6.99987 10.5C5.36027 10.5 3.95272 11.4864 3.3351 12.895C3.25293 13.0824 3.2509 13.2952 3.32946 13.4842C3.40802 13.6731 3.56036 13.8217 3.75117 13.8956C4.75988 14.2862 5.85579 14.5 6.99987 14.5C8.14395 14.5 9.23987 14.2862 10.2486 13.8956C10.4394 13.8217 10.5917 13.6731 10.6703 13.4842C10.7488 13.2952 10.7468 13.0824 10.6647 12.895C10.047 11.4864 8.63947 10.5 6.99987 10.5ZM12 6.75C12 6.33579 12.3358 6 12.75 6H15.25C15.6642 6 16 6.33579 16 6.75C16 7.16421 15.6642 7.5 15.25 7.5H12.75C12.3358 7.5 12 7.16421 12 6.75ZM12 13.25C12 12.8358 12.3358 12.5 12.75 12.5H15.25C15.6642 12.5 16 12.8358 16 13.25C16 13.6642 15.6642 14 15.25 14H12.75C12.3358 14 12 13.6642 12 13.25ZM12.75 9.25C12.3358 9.25 12 9.58579 12 10C12 10.4142 12.3358 10.75 12.75 10.75L15.25 10.75C15.6642 10.75 16 10.4142 16 10C16 9.58579 15.6642 9.25 15.25 9.25L12.75 9.25Z"
                  fill="#22D3EE"
                  fillRule="evenodd"
                />
              </svg>
              {` `}
              NAME
              <HiSortDescending 
              id="descIcon" 
              size="1.5em"  
               onClick={() => setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')}/> 
            </th>
            <th scope="col">
              <HiMiniMegaphone id="megaphoneIcon" size="1.5em" /> CONTACT
      
            </th>
            <th scope="col">
              <HiTicket id="ticketIcon" size="1.5em" />
              OPEN TICKETS
            </th>
          </tr>
        </thead>
        <tbody>
          {
            customers &&
              customers.map((customer) => {
                return (
                  <tr
                    className="clickable-row"
                    onClick={() => handleRowClick(customer)}
                  >
                    <td style={{ fontWeight: `500` }}>
                      {customer.first_name} {customer.last_name}
                      <div>
                        <span style={{ color: `#6D817B`, fontWeight: `400` }}>
                          {customer.farm_name} farm
                        </span>
                      </div>
                    </td>
                    <td>
                      <a href={`mailto:${customer.email}`}
                      onClick={(e) => e.stopPropagation()}
                      style={{ textDecoration: 'none', color: 'inherit' }}>{customer.email}</a>
                      <div>
                        <span style={{ color: `#6D817B` }}>
                          <HiMiniDevicePhoneMobile
                            id="phoneIcon"
                            size="1.25em"
                          />
                          {` `}
                          <a href={`tel:${customer.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          style={{ textDecoration: 'none', color: 'inherit' }}>{customer.phone}</a>
                        </span>
                      </div>
                    </td>
                    <td>{customer.ticket_count}</td>
                  </tr>
                );
              })
          }
        </tbody>
      </table>
      </div>
      <div className="pageBtns">
      <button id="prevBtn"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
      >
        Previous
      </button>
      <button id="nextBtn" onClick={() => setCurrentPage((old) => old + 1)}>Next</button>
      <p>Page {currentPage}</p>
      </div>
      <NewCustomerModal show={showNewModal} toggleNewModal={toggleNewModal} customer={selectedCustomer} profile={null}/>
      <ExistingCustomerModal
        show={showModal}
        handleClose={handleCloseModal}
        customer={selectedCustomer} profile={null} posts={null}    />
   
    </>
  );
};

export default Landing;