import { useContext, useEffect, useRef,useState } from 'react';
import { Button, Card, Image,ListGroup, Modal } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import { BiEnvelope } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi'
import { HiOutlineAtSymbol } from 'react-icons/hi';
import { HiMiniDevicePhoneMobile, HiOutlineTicket, HiOutlineUser } from 'react-icons/hi2';
import { PiQuestionLight} from 'react-icons/pi';
import formatDate from '../../ts/date';
import { AppContext, AppContextType, Customer, Post, Profile, Ticket } from '../context/AppContext';
import NewCustomerModal from './NewCustomerModal';
import TicketDetailsModal from './TicketDetailsModal';

type MyModalProps = {
  show: boolean
  customer: Customer | null
  profile: Profile | null
  posts: Post | null
  handleClose: () => void
}

const MyModal: React.FC<MyModalProps> = ({ show, handleClose, customer, posts }) => {
  const { tickets, setTickets } = useContext<AppContextType>(AppContext);
  const [showNewModal, setShowNewModal] = useState(false)
  const {editCustomerNotes} = useContext(AppContext)
  const [customerEquipmentProfiles, setCustomerEquipmentProfiles] = useState<Profile[]>()
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(customer?.notes || ``);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const handleTicketRowClick = (ticket: Ticket) => {
  setSelectedTicket(ticket);
  setShowTicketModal(true);
  };

  const handleCloseNewModal = () => setShowNewModal(false)
  const handleCloseTicketModal = () => setShowTicketModal(false);


  const apiKey = `AIzaSyBu3mP__eZQl1nnaNbibjRPZTdJquEa8xU`;
  const encodedAddress = encodeURIComponent(
    `${customer?.street_address}, ${customer?.city}, ${customer?.state} ${customer?.zip}`
  );
  const googleLink = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const mapImg = `https://maps.googleapis.com/maps/api/staticmap?center=${encodedAddress}&zoom=10&size=600x300&key=${apiKey}`;
  

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/customers/${customer?.customer_id}/tickets`
          );
          const result = await response.json();
          setTickets(result.data.tickets);

          const profileResponse = await fetch(  `http://localhost:3000/customers/${customer?.customer_id}/profiles`);
          const profileResult = await profileResponse.json();
          setCustomerEquipmentProfiles(profileResult.data.profiles);

        }
        catch {
        }
      };

      fetchData();
    },
    [customer?.customer_id]
  );

  const handleEditClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = notes.length;
      }
    }, 0);
  };
  

  const handleSaveClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsEditing(false);
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:3000/customers/${customer?.customer_id}/notes`, {
        method: `PUT`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({
          notes
        })
      });
      const result = await response.json();
      if (result.data.customer) 
        editCustomerNotes(result.data.customer.id, result.data.customer.notes);
      
    } catch {
  
    }
  }
  
  function toggleNewModal(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
    <Modal show={show} onHide={handleCloseNewModal}>
      <Modal.Header>
        <div>
          <Modal.Title>
            {customer?.first_name} {customer?.last_name}
          </Modal.Title>
          <h6 id="farmNameModal">{customer?.farm_name} Farm</h6>
        </div>
        <div>
        <Button
        className="btn"
        id="customerDetailsBtn"
        variant="primary"
        onClick={() => setShowNewModal(true)}
      >
        <FiEdit id="newUserIcon" size="1.25em" /> Customer Details
      </Button>
     <NewCustomerModal customer={customer}  handleClose={() => setShowNewModal(false)} profile={customerEquipmentProfiles} show={showNewModal} toggleNewModal={toggleNewModal} />
      <Button id="exitBtn" onClick={handleClose}>
      <AiOutlineClose  size="1.75em"/>
      </Button>
      </div>
      </Modal.Header>
      <Modal.Body>
        <div className="contactMap">
          <Card className="noBorder" style={{ width: `18rem` }}>
            <ListGroup variant="flush">
              <ListGroup.Item className="cardHeader">Contact</ListGroup.Item>
              <ListGroup.Item className="contactText">
                <BiEnvelope style={{ color: `#879B95` }} />{` `}
                {customer?.street_address} {customer?.city}, {customer?.state}{` `}
                {customer?.zip}
              </ListGroup.Item>
              <ListGroup.Item className="contactText">
                <HiOutlineAtSymbol style={{ color: `#879B95` }} />{` `}
                {customer?.email}
              </ListGroup.Item>
              <ListGroup.Item className="contactText">
                <HiMiniDevicePhoneMobile style={{ color: `#879B95` }} />{` `}
                {customer?.phone}
              </ListGroup.Item>
            </ListGroup>
            <ListGroup>
              <ListGroup.Item className="cardHeader">
                Customer Since
              </ListGroup.Item>
              <ListGroup.Item className="contactText">
                {formatDate(customer?.createdAt)}
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <a href={googleLink} target="_blank">
            <Image alt="Map" className="map-image" src={mapImg} />
          </a>
          <Card className="noBorder" style={{ width: `40rem` }}>
            <Card.Header
              className="cardHeader"
              style={{ backgroundColor: `transparent` }}
            >
              Notes
            </Card.Header>
            <textarea
              ref={textareaRef}
              className="form-control"
              defaultValue={customer?.notes}
              id="textAreaModal"
              readOnly={!isEditing}
              onChange={(e) => setNotes(e.target.value)}
             />
            <Button id="editBtn" onClick={isEditing ? handleSaveClick : handleEditClick} >
              <svg
                fill="currentColor"
                height="1rem"
                id="editNotesBtnIcon"
                viewBox="0 0 20 20"
                width="1rem"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
              </svg>
              {isEditing ? `Save` : `Edit`}
            </Button>
          </Card>
        </div>
        <Card className="equipmentCard">
          <Card.Title className="cardHeader">Equipment</Card.Title>
          <ListGroup variant="flush">
            {
            customerEquipmentProfiles?.map((profile, index) =>
            <ListGroup.Item key={index}>
              <div className="equipmentTitle">
                <div>
                  <div>{profile.make}</div>
                  <div className="equipmentCompany">{profile.model}</div>
                </div>
                <div>
                  <div className={`badge rounded-pill text-white ${profile.equipment_type === `Sprayer` ? `sprayer-badge` :
                    profile.equipment_type === `Seeder` ? `seeder-badge` :
                    profile.equipment_type === `Combine` ? `combine-badge` :
                    profile.equipment_type === `Planter` ? `planter-badge` : ``
            }`}>
                  {profile.equipment_type}
                  </div>
                </div>
              </div>
            </ListGroup.Item>
            )
          }
          </ListGroup>
        </Card>
        <Card className="ticketsCard">
          <Card.Title className="cardHeader">Tickets</Card.Title>
          <ListGroup variant="flush">
            {
              tickets.map((ticket, index) =>
                <ListGroup.Item key={index} className="list-item" onClick={() => handleTicketRowClick(ticket)}>
                  <div className="equipmentTitle">
                    <div
                      style={{
                        display: `flex`,
                        flex: 1
                      }}
                    >
                      <div>
                        <div>{ticket.issue}</div>
                        <div className="equipmentCompany">
                          {ticket.equip_profile}
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-
                      4"
                      style={{
                        display: `flex`,
                        flexDirection: `column`,
                        flex: 1
                      }}
                    >

                      <div className="updatedAt">
                        Updated {formatDate(ticket.updatedAt)}
                      </div>
                      <div
                        style={{ 
                          display: `flex`
                         }}
                        id="ticketInfo"
                      >
                        <div id="ticketIconCount"
                        style={{
                          display: `flex`,
                          flex: 1
                        }}
                        >
                          <HiOutlineTicket
                            id="ticketOutlineIcon"
                            size="1.5em"
                          />
                          {ticket.ticket_id}
                        </div>
                        <div 
                        style={{
                          display: `flex`,
                          flex: 2,
                          whiteSpace: `nowrap`,
                          overflow: `hidden`,
                          textOverflow: `ellipsis`,
                          justifyContent: `center`,
                          marginRight: `2rem`
                        }}
                        >
                          <HiOutlineUser id="authorIcon" size="1.5em" />
                          {ticket.support}
                        </div>
                        <div style={{
                          display: `flex`,
                          flex: 2
                        }}>
                          <PiQuestionLight id="questionIcon" size="1.5em" />
                          {ticket.seasonality}
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-4 text-end"
                      style={{
                        display: `flex`,
                        justifyContent: `flex-end`,
                        alignItems: `center`,
                        flex: 1
                      }}
                    >
                      <div className={`badge rounded-pill text-white ${ticket.status === `New` ? `new-badge` :
                    ticket.status === `Report` ? `report-badge` :
                    ticket.status === `Needs Information` ? `information-badge` :
                    ticket.status === `Recommendation Provided` ? `rec-badge` : ``
            }`}>
                        {ticket.status}
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              )
            }
          </ListGroup>
        </Card>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
    <TicketDetailsModal
        handleClose={handleCloseTicketModal}
        posts={posts}
        show={showTicketModal} ticket={selectedTicket}/>

    </>
  );
};


export default MyModal;