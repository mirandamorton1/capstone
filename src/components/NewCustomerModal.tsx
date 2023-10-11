import "../App.css";

import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { HiUserPlus } from "react-icons/hi2";

const NewCustomerModal = () => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <Button
        className="btn"
        id="newCustomerBtn"
        variant="primary"
        onClick={handleShowModal}
      >
        <HiUserPlus id="newUserIcon" size="1.25em" /> New Customer
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>New Customer Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <h5 className="modalHeaders" id="personalInfo">
              Personal Info
            </h5>
            <Row>
              <Col>
                <Form.Group controlId="formFirstName">
                  <Form.Label className="required">First</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="formLastName">
                  <Form.Label className="required">Last</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formEmail">
                  <Form.Label className="required">Email</Form.Label>
                  <Form.Control type="email" />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="formPhone">
                  <Form.Label className="required">Phone</Form.Label>
                  <Form.Control type="tel" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formAddress">
                  <Form.Label className="required">Address</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="formCity">
                  <Form.Label className="required">City</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col id="stateZip">
                <Form.Group controlId="formState">
                  <Form.Label className="required">State</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="formZip">
                  <Form.Label className="required">Zip Code</Form.Label>
                  <Form.Control placeholder="Enter Zip Code" type="text" />
                </Form.Group>
              </Col>
            </Row>

            <h5 className="modalHeaders" id="equiptmentProfile">
              Equipment Profile
            </h5>
            <Col>
              <Form.Group controlId="formEquipment1">
                <Form.Label>Equipment Type</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Row>
              <Col>
                <Form.Group controlId="formEquipmentMake">
                  <Form.Label>[Equipment Type] Make</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formEquipmentModel">
                  <Form.Label>[Equipment Type] Model</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formRows">
                  <Form.Label>Rows</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formSpacing">
                  <Form.Label>Spacing</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  className="btn"
                  id="newEquiptmentBtn"
                  variant="outline-primary"
                >
                  <AiOutlinePlus id="plusSign" size="1em" />
                  Add
                </Button>
                {` `}
              </Col>
            </Row>
            <h5 className="modalHeaders" id="modalNotes">
              Notes
            </h5>
            <Row>
              <Col>
                <Form.Group controlId="modalNotes">
                  <Form.Control id="modalNotesArea" type="text" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button id="cancelBtn" variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button id="createBtn" variant="primary" onClick={handleCloseModal}>
            <AiOutlineCheck size="1.25em" /> Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewCustomerModal;