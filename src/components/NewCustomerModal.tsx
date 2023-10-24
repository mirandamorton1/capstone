import "../App.css";
import { useState, useContext, useEffect } from "react";
import { Button, Col, Form, Modal, Row, } from "react-bootstrap";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { HiUserPlus } from "react-icons/hi2";
import { AppContext, Customer, Profile } from "../context/AppContext";

interface NewCustomerProps {
  customer: Customer | null
  profile: Profile | null
  show: boolean;
  toggleNewModal: () => void;
  handleClose: () => void;
}

const NewCustomerModal: React.FC<NewCustomerProps> = ({
  customer,
  profile,
  show, toggleNewModal, handleClose
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const { addCustomer } = useContext(AppContext);
  const { editCustomer } = useContext(AppContext);
  const { addProfile } = useContext(AppContext);
  const {profiles, setProfiles} = useContext(AppContext)

  const { editProfile } = useContext(AppContext);

  const [first_name, setFirst_name] = useState(
    customer ? customer.first_name : ""
  );
  const [last_name, setLast_name] = useState(
    customer ? customer.last_name : ""
  );
  const [email, setEmail] = useState(customer ? customer.email : "");
  const [street_address, setStreet_Address] = useState(
    customer ? customer.street_address : ""
  );
  const [phone, setPhone] = useState(customer ? customer.phone : "");
  const [city, setCity] = useState(customer ? customer.city : "");
  const [state, setState] = useState(customer ? customer.state : "");
  const [zip, setZip] = useState(customer ? customer.zip : "");
  const [notes, setNotes] = useState(customer ? customer.notes : "");

  const [equipment_type, setEquipment_type] = useState(
    profile ? profile.equipment_type : ""
  );
  const [make, setMake] = useState(profile ? profile.make : "");
  const [model, setModel] = useState(profile ? profile.model : "");

  const [isUpdate, setIsUpdate] = useState(!!customer);


  

  const handleDelete = async () => {
    if (customer) {
      try {
        const response = await fetch(`http://localhost:3000/customers/${customer.customer_id}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        alert('Account deleted successfully'); 
        handleClose();
        window.location.reload();

      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!first_name || !last_name || !email || !phone || !street_address || !city || !state || !zip) {
      alert('Please fill out all required fields.');
    } else {
    const url = customer
      ? `http://localhost:3000/customers/${customer.customer_id}`
      : "http://localhost:3000/customers";
    const method = customer ? "PUT" : "POST";
    try {
      const response = await fetch(
        url,
        {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name,
            last_name,
            email,
            street_address,
            phone,
            city,
            state,
            zip,
            notes,
            equipment_type,
            make,
            model,
          }),
        }
      );
      const result = await response.json();
      console.dir(result.data);
      if (customer) {
        editCustomer(result.data.updatedCustomer);
        alert('Account updated successfully.'); 
        handleClose();
        window.location.reload();
      } else {
        addCustomer(result.data.customer);
        alert('Account created successfully.'); 
        handleCloseModal();
        window.location.reload();
      }
    
    }
    
    catch (err) {
      console.error(err);
    }
  }
  };

  return (
    <>

      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>
            {isUpdate ? "Customer Details" : "New Customer Profile"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <h5 className="modalHeaders" id="personalInfo">
              Personal Info
            </h5>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label htmlFor="formFirstName" className="required">
                    First
                  </Form.Label>
                  <Form.Control
                    id="formFirstName"
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                    type="text"
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label htmlFor="formLastName" className="required">
                    Last
                  </Form.Label>
                  <Form.Control
                    id="formLastName"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                    type="text"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label htmlFor="formEmail" className="required">
                    Email
                  </Form.Label>
                  <Form.Control
                    id="formEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label htmlFor="formPhone" className="required">
                    Phone
                  </Form.Label>
                  <Form.Control
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    id="formPhone"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label htmlFor="formAddress" className="required">
                    Address
                  </Form.Label>
                  <Form.Control
                    value={street_address}
                    onChange={(e) => setStreet_Address(e.target.value)}
                    type="text"
                    id="formAddress"
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label htmlFor="formCity" className="required">
                    City
                  </Form.Label>
                  <Form.Control
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    id="formCity"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col id="stateZip">
                <Form.Group>
                  <Form.Label htmlFor="formState" className="required">
                    State
                  </Form.Label>
                  <Form.Control
                    id="formState"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    type="text"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="formZip" className="required">
                    Zip Code
                  </Form.Label>
                  <Form.Control
                    placeholder="Enter Zip Code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    type="text"
                    id="formZip"
                  />
                </Form.Group>
              </Col>
            </Row>

             <h5 className="modalHeaders" id="equiptmentProfile">
              Equipment Profile
            </h5>
            {
    profiles.map((profile, index) =>
      <><Row key={profile.profile_id}>
        <Col>
          <Form.Group>
            <Form.Label>Equipment Type</Form.Label>
            <Form.Select
              id={`formEquipmentType${index}`}
              value={profile.equipment_type}
              onChange={(e) => setEquipment_type(e.target.value
              )}>
              <option value="">Select...</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
          <Col>
            <Form.Group>
              <Form.Label>[Equipment Type] Make</Form.Label>
              <Form.Select
                id={`formEquipmentMake${index}`}
                value={profile.make}
                onChange={(e) => setMake(e.target.value)} >
                   <option value="">Select...</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
  
            </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>[Equipment Type] Model</Form.Label>
              <Form.Select
                id={`formEquipmentModel${index}`}
                value={profile.model}
                onChange={(e) => setModel(e.target.value)} >
                   <option value="">Select...</option>
            </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        </>
    )
  }
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
                <Form.Group>
                  <Form.Control
                    id="modalNotesArea"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    type="text"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Modal.Footer>
              {
                isUpdate &&
                  <Button 
                  id="deleteBtn" 
                  variant="danger"
                  onClick={handleDelete}>
                    Delete
                  </Button>

              }
         
              <Button
                id="cancelBtn"
                variant="secondary"
                onClick={isUpdate ? handleClose : toggleNewModal}
                // onClick={handleClose}
                // onClick={() => {toggleNewModal()}}
              >
                Cancel
              </Button>
              <Button id="createBtn" variant="primary" type="submit">
                <AiOutlineCheck size="1.25em" />{" "}
                {isUpdate ? "Update" : "Create"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewCustomerModal;