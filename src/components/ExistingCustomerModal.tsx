import React, { useState } from "react";
import { Modal, Button, Card, ListGroup, Image } from "react-bootstrap";
import { BiEnvelope } from "react-icons/bi";
import { HiOutlineAtSymbol } from "react-icons/hi";
import mapImage from "../assets/map.png";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";

interface MyModalProps {
  show: boolean
  handleClose: () => void
}

const MyModal: React.FC<MyModalProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <div>
          <Modal.Title>Joe Farmer</Modal.Title>
          <h6 id="farmNameModal">Farm Name</h6>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="contactMap">
          <Card className="noBorder" style={{ width: "18rem" }}>
            <Card.Header
              className="cardHeader"
              style={{ backgroundColor: "transparent" }}
            >
              Contact
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item className="contactText">
                <BiEnvelope style={{ color: "#879B95" }} /> 123 main St. City,
                State, Zip
              </ListGroup.Item>
              <ListGroup.Item className="contactText">
                <HiOutlineAtSymbol style={{ color: "#879B95" }} /> joe@jo.com
              </ListGroup.Item>
              <ListGroup.Item className="contactText">
                <HiMiniDevicePhoneMobile style={{ color: "#879B95" }} />{" "}
                555-5555
              </ListGroup.Item>
            </ListGroup>
            <ListGroup>
              <ListGroup.Item className="cardHeader">
                Customer Since
              </ListGroup.Item>
              <ListGroup.Item className="contactText">
                June 23, 2018
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <Image src={mapImage} alt="Map" className="map-image" />
          <Card className="noBorder" style={{ width: "40rem" }}>
            <Card.Header
              style={{ backgroundColor: "transparent" }}
              className="cardHeader"
            >
              Notes
            </Card.Header>
            <textarea
              id="textAreaModal"
              className="form-control"
              defaultValue=""
            ></textarea>
            <Button id="editBtn">
              <svg
                height="1rem"
                width="1rem"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                id="editNotesBtnIcon"
              >
                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
              </svg>
              Edit
            </Button>
          </Card>
        </div>
        <Card className="equipmentCard">
          <Card.Title className="cardHeader">Equiptment</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <div className="equipmentTitle">
                <div>
                  <div>Integral Stack-Fold</div>
                  <div className="equipmentCompany">John Deere</div>
                </div>
                <div>
                  <div className="badge rounded-pill text-bg-success">Planter</div>
                  <div className="rowsSpacing">
                    <span># </span>
                    <span>Rows </span>
                    <span>#"</span>
                    <span> Spacing</span>
                  </div>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="equipmentTitle">
                <div>
                  <div>Dapibus ac facilisis in</div>
                  <div className="equipmentCompany">Subtitle</div>
                </div>
                <div>More info</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="equipmentTitle">
                <div>
                  <div>Vestibulum at eros</div>
                  <div className="equipmentCompany">Subtitle</div>
                </div>
                <div>More info</div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Card className="ticketsCard">
          <Card.Title className="cardHeader">Tickets</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <div className="equipmentTitle">
                <div>
                  <div>20|20 Gen 3</div>
                  <div className="equipmentCompany">John Deere 16"</div>
                </div>
                <div>
                  <div className="badge rounded-pill text-bg-success">New</div>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="equipmentTitle">
                <div>
                  <div>Dapibus ac facilisis in</div>
                  <div className="equipmentCompany">Subtitle</div>
                </div>
                <div>More info</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="equipmentTitle">
                <div>
                  <div>Vestibulum at eros</div>
                  <div className="equipmentCompany">Subtitle</div>
                </div>
                <div>More info</div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default MyModal;