import "../App.css";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { AppContext, Customer, Profile } from "../context/AppContext";
import ConfirmModal from "./ConfirmModal";

type NewCustomerProps = {
  customer: Customer | null
  profile?: Profile[]
  show: boolean
  toggleNewModal: () => void
  handleClose: () => void
};

const NewCustomerModal: React.FC<NewCustomerProps> = ({
  customer,
  show,
  toggleNewModal,
  handleClose,
}) => {

  const [, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { addCustomer, editCustomer } = useContext(AppContext);
  const { profiles } = useContext(AppContext);

  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  const [first_name, setFirst_name] = useState(customer ? customer.first_name : ``);
  const [last_name, setLast_name] = useState(customer ? customer.last_name : ``);
  const [email, setEmail] = useState(customer ? customer.email : ``);
  const [street_address, setStreet_Address] = useState(customer ? customer.street_address : ``);
  const [phone, setPhone] = useState(customer ? customer.phone : ``);
  const [city, setCity] = useState(customer ? customer.city : ``);
  const [state, setState] = useState(customer ? customer.state : ``);
  const [zip, setZip] = useState(customer ? customer.zip : ``);
  const [farm_name, setFarm_name] = useState(customer ? customer.farm_name : ``);
  const [notes, setNotes] = useState(customer ? customer.notes : ``);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [isUpdate] = useState(!!customer);
  const [customerEquipmentProfiles, setCustomerEquipmentProfiles] = useState<Profile[]>()


  useEffect(() => {
      const fetchData = async () => {
        try {
          const profileExistsResponse = await fetch(  `http://localhost:3000/customers/${customer?.customer_id}/profiles`);
          const profileExistsResult = await profileExistsResponse.json();
          setCustomerEquipmentProfiles(profileExistsResult.data.profiles);

        }
        catch {
        }
      };

      fetchData();
  }, [profiles]);
  
  useEffect(
    () => {
      if (selectedType) {
        fetch(`http://localhost:3000/types/${selectedType}/make`)
          .then((response) => response.json())
          .then((data) => {
            setMakes(
              data.makes
                .map((make: { make: string }) => make.make)
                .filter(Boolean)
            );
          })
          .catch((error) => console.error(error));
      } else {
        setMakes([]);
      }
    },
    [selectedType]
  );

  useEffect(
    () => {
      if (selectedMake) {
        fetch(`http://localhost:3000/makes/${selectedMake}/model`)
          .then((response) => response.json())
          .then((data) => {
            setModels(
              data.models.map((model: { model: string }) => model.model)
            );
          })
          .catch((error) => console.error(error));

      } else {
        setModels([]);
      }
    },
    [selectedMake]
  );

  const handleDelete = async () => {
    if (customer)
      try {
        const response = await fetch(
          `http://localhost:3000/customers/${customer.customer_id}`,
          { method: `DELETE` }
        );

        if (!response.ok) throw new Error(`Network response was not ok`);

        alert(`Account deleted successfully`);
        handleClose();
        window.location.reload();
      }
      catch {}
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone ||
      !street_address ||
      !city ||
      !state ||
      !zip
    ) {
      alert("Please fill out all required fields.");
    } else {
      const url = customer
        ? `http://localhost:3000/customers/${customer.customer_id}`
        : `http://localhost:3000/customers`;
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
              farm_name,
              notes,
            }),
          }
        );

        const result = await response.json();
        const customerId = result.data.customer;

        if (customer) {
          editCustomer(result.data.updatedCustomer);
          alert("Account updated successfully.");
          handleClose();
          window.location.reload();
        } else {
          addCustomer(result.data.customer);
          alert("Account created successfully.");
          // handleCloseModal();
          // window.location.reload();

          if (selectedType && selectedMake && selectedModel) {
            try {
              const profileResponse = await fetch(
                `http://localhost:3000/profiles/${selectedType}/${selectedMake}/${selectedModel}`
              );

              if (profileResponse.ok) {
                const profileData = await profileResponse.json();
                const profileId = profileData.profile_id;

                const insertProfile = await fetch(
                  `http://localhost:3000/profiles/${profileId}/customers`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ customer_id: customerId }),
                  }
                );

                if (!insertProfile.ok) {
                  throw new Error("Could not insert profile.");
                }

                handleCloseModal();
              } else {
                throw new Error("Could not fetch profile data.");
              }
            }
            catch (error) {
              console.error("Error inserting profile:", error);
              handleCloseModal();
            }
          } else {
            alert(
              "Selected Type, Make, and Model are required to associate a profile."
            );
            handleCloseModal();
          }
        }
      }
      catch (error) {
        console.error("Error:", error);
        handleCloseModal();
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>
            {isUpdate ? `Customer Details` : `New Customer Profile`}
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
                  <Form.Label className="required" htmlFor="formFirstName">
                    First
                  </Form.Label>
                  <Form.Control
                    id="formFirstName"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label className="required" htmlFor="formLastName">
                    Last
                  </Form.Label>
                  <Form.Control
                    id="formLastName"
                    type="text"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label className="required" htmlFor="formEmail">
                    Email
                  </Form.Label>
                  <Form.Control
                    id="formEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label className="required" htmlFor="formPhone">
                    Phone
                  </Form.Label>
                  <Form.Control
                    id="formPhone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label className="required" htmlFor="formAddress">
                    Address
                  </Form.Label>
                  <Form.Control
                    id="formAddress"
                    type="text"
                    value={street_address}
                    onChange={(e) => setStreet_Address(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label className="required" htmlFor="formCity">
                    City
                  </Form.Label>
                  <Form.Control
                    id="formCity"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col id="stateZip">
                <Form.Group>
                  <Form.Label className="required" htmlFor="formState">
                    State
                  </Form.Label>
                  <Form.Select
                    id="formState"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value=""></option>
                    {
                      states.map((state) =>
                        <option key={state} value={state}>
                          {state}
                        </option>
                      )
                    }
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="required" htmlFor="formZip">
                    Zip Code
                  </Form.Label>
                  <Form.Control
                    id="formZip"
                    placeholder="Enter Zip Code"
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label id="formFarmLabel" htmlFor="formFarm">
                    Farm Name
                  </Form.Label>
                  <Form.Control
                    id="formFarm"
                    placeholder="Enter Farm Name"
                    type="text"
                    value={farm_name}
                    onChange={(e) => setFarm_name(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <h5 className="modalHeaders" id="equiptmentProfile">
              Equipment Profile
            </h5>
            {
              customerEquipmentProfiles?.length === 0
                ? <>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Equipment Type</Form.Label>
                          <Form.Select
                            id="formEquipmentType"
                            onChange={(e) => setSelectedType(e.target.value)}
                          >
                            <option value="">Select Type</option>
                            <option value="Planter">Planter</option>
                            <option value="Combine">Combine</option>
                            <option value="Seeder">Seeder</option>
                            <option value="Sprayer">Sprayer</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>[Equipment Type] Make</Form.Label>
                          <Form.Select
                            disabled={!selectedType}
                            id="formEquipmentMake"
                            onChange={(e) => setSelectedMake(e.target.value)}
                          >
                            <option value="">Select Make</option>
                            {
                              makes.map((make) =>
                                <option key={make} value={make}>{make}</option>
                              )
                            }
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>[Equipment Type] Model</Form.Label>
                          <Form.Select
                            disabled={!selectedType || !selectedMake}
                            id="formEquipmentModel"
                            onChange={(e) => setSelectedModel(e.target.value)}
                          >
                            <option value="">Select Model</option>
                            {
                              models.map((model) =>
                                <option key={model} value={model}>{model}</option>
                              )
                            }
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                : customerEquipmentProfiles?.map((profile, index) =>
                    <React.Fragment key={index}>
                      <Row>
                        <Col>
                          <Form.Group>
                            <Form.Label>Equipment Type</Form.Label>
                            <Form.Select
                              id={`formEquipmentType${index}`}
                              value={profile.equipment_type}
                              onChange={(e) => setSelectedType(e.target.value)}
                            >
                              <option value={profile.equipment_type}>{profile.equipment_type}</option>
                              <option value="option1">Option 1</option>
                              <option value="option2">Option 2</option>
                              <option value="option2">Option 2</option>
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
                              onChange={(e) => setSelectedMake(e.target.value)}
                            >
                              <option value="">Select Type</option>
                              <option value={profile.make}>{profile.make}</option>
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
                              onChange={(e) => setSelectedModel(e.target.value)}
                            >
                              <option value="">Select Type</option>
                              <option value={profile.model}>{profile.model}</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </React.Fragment>
                  )
            }

            <Row>
              <Col>
                <Button className="btn" id="newEquiptmentBtn" variant="outline">
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
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Modal.Footer>
              {
                isUpdate &&
                  <Button
                    id="deleteBtn"
                    onClick={() => setShowConfirmModal(true)}
                  >
                    Delete
                  </Button>

              }

              <Button
                id="cancelBtn"
                variant="secondary"
                onClick={isUpdate ? handleClose : toggleNewModal}
              >
                Cancel
              </Button>
              <Button id="createBtn" type="submit" variant="primary">
                <AiOutlineCheck size="1.25em" />
                {` `}
                {isUpdate ? `Update` : `Create`}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <ConfirmModal
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default NewCustomerModal;