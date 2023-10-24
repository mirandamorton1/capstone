import { Button, ListGroup, Modal } from "react-bootstrap";
import { Post, Ticket } from "../context/AppContext";
import "../App.css";
import { HiOutlineUser } from "react-icons/hi";
import { BsCalendarWeek } from 'react-icons/bs'
import formatDate from "../../ts/date";

interface TicketDetailsModalProps {
  show: boolean
  ticket: Ticket | null
  posts: Post | null
  handleClose: () => void
}

const TicketDetailsModal: React.FC<TicketDetailsModalProps> = ({show, handleClose, ticket, posts}) => {

console.log(ticket)

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="mainBody">
          <div>
            <Modal.Title>Ticket {ticket?.ticket_id}</Modal.Title>
            <h6 id="farmNameModal"> Created {formatDate(ticket?.updatedAt)}</h6>
          </div>
          <div>
            <Button id="ticketSystemBtn">Ticket System</Button>
          </div>
        </Modal.Header>
        <Modal.Body className="mainBody">
          <h5 className="detailTitle" id="personalInfo">
            Details
          </h5>
          <ListGroup.Item>
            <div className="details-item">
              <div>Issue</div>
              <div className="details-value">{ticket?.issue}</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="details-item">
              <div>Equipment Profile</div>
              <div className="details-value">{ticket?.equip_profile}</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="details-item">
              <div>Support Team Member</div>
              <div className="details-value">{ticket?.support}</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="details-item">
              <div>Seasonality</div>
              <div className="details-value">{ticket?.seasonality}</div>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="details-item" id="description">
              <div>Description</div>
              <div className="details-value">{ticket?.description}</div>
            </div>
          </ListGroup.Item>
          <h5 className="detailTitle" id="history">
            History
          </h5>
          {
            ticket?.posts && ticket?.posts.map((post: Post, index: number) =>
                <ListGroup.Item key={index}>
                  <div className="historyTitle">
                    <div>
                      <div>
                        <HiOutlineUser id="authorIcon" size="1.5em" />
                        {post?.author_first} {post?.author_first}
                      </div>
                      <div className="equipmentCompany">
                        <BsCalendarWeek id="authorIcon" size="1.25em" />
                        {formatDate(post?.updatedAt)}
                      </div>
                    </div>
                    <div className="details-value" id="postText">
                      <div>{post?.text}</div>
                    </div>
                  </div>
                </ListGroup.Item>
              )
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} id="doneBtn">
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TicketDetailsModal;


