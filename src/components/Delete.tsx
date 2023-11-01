import { Modal, Button } from "react-bootstrap";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

interface DeleteModalProps {
  showDeleteModal: boolean
  setShowDeleteModal: (show: boolean) => void
  handleDelete: (event: React.FormEvent) => void
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDelete,
}) => {
    
  return (
    <>
      <Modal
        className="confirmationModal"
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      >
        <Modal.Body>
          <div className="confirmBody">
            <div className="icon-container">
              <HiOutlineExclamationTriangle id="exclamationIcon" />
            </div>
            <div className="confirmationText">
            <p className="confirmP">Type "DELETE" in the text box to completely erase this data.</p>
              <form id="deleteForm" onSubmit={handleDelete}>
                <input
                  type="text"
                  placeholder="Type 'DELETE' to confirm"
                  required
                  pattern="DELETE"
                />
                <br></br>
                <div className="finalDeleteBtn">
                <Button variant="danger" type="submit">Delete</Button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteModal;