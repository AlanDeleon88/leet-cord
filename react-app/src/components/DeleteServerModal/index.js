import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteServer from "./DeleteServer";




const DeleteServerModal = ({server}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>

        <div onClick={() => setShowDeleteModal(!showDeleteModal)}>
            Delete
        </div>


      {showModal && (
        <Modal onClose={() =>
          {

            setShowModal(false)


          }
          }>
          <DeleteServer onClose={() => setShowDeleteModal(false)} setShowDeleteModal={setShowDeleteModal} server={server}/>
        </Modal>
      )}
    </>
  );
};

export default DeleteServerModal;
