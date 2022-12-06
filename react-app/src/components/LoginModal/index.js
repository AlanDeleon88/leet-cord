import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LoginForm from "./LoginForm";



const LoginModal = ({serverId}) => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state=> state.session.user);
  const history = useHistory();

  const handleClick = (e) =>{
    if(!user){
        setShowModal(!showModal)

    }
    else{
        //!redirect to user page
        history.push(`/${user.username}/dm`)
    }
  }

  return (
    <>

        <button className='splash-button' onClick={handleClick}>
            Open Discord in browser
        </button>


      {showModal && (
        <Modal onClose={() =>
          {

            setShowModal(false)


          }
          }>
          <LoginForm onClose={() =>  setShowModal(false)} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
};

export default LoginModal;
