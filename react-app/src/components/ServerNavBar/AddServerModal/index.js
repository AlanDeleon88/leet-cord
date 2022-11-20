import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddServerForm from "./AddServerForm";
import { AiOutlinePlusSquare } from "react-icons/ai";


const PostFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <AiOutlinePlusSquare
        className="icon-buttons side-step"
        onClick={() => setShowModal(!showModal)}
      />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddServerForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default PostFormModal;
