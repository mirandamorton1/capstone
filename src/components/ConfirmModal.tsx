import { Modal, Button } from "react-bootstrap";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import DeleteModal from "./Delete";

interface ConfirmationModalProps {
  showConfirmModal: boolean
  setShowConfirmModal: (show: boolean) => void
  showDeleteModal: boolean
  setShowDeleteModal: (show: boolean) => void
  handleDelete: (event: React.FormEvent) => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  showConfirmModal,
  setShowConfirmModal,
  showDeleteModal,
  setShowDeleteModal,
  handleDelete,
}) => {
  return (
    <>
      <Modal
        className="confirmationModal"
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
      >
        <Modal.Body>
          <div className="confirmBody">
            <div className="icon-container">
              <HiOutlineExclamationTriangle id="exclamationIcon" />
            </div>
            <div className="confirmationText">
              <h4 className="confirmTitle">Delete Customer Profile?</h4>
              <p className="confirmP">
                This customer data will no longer be available.
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="confirmFooter">
          <Button
            className="confirmCancelBtn"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setShowConfirmModal(false);
              setShowDeleteModal(true);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default ConfirmationModal;