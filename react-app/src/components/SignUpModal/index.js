import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SignUpForm from "./SignUpModal";




const SignUpModal = ({setShowModal}) => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const user = useSelector(state=> state.session.user);
  const history = useHistory();

  const handleClick = (e) =>{
    if(!user){
        setShowSignUpModal(!showSignUpModal)

    }
    else{
        //!redirect to user page
        history.push(`/${user.username}/dm`)
    }
  }

  return (
    <>

        <div className='reg-button' onClick={handleClick}>
           Register
        </div>


      {showSignUpModal && (
        <Modal onClose={() =>
          {

            setShowSignUpModal(false)

          }
          }>
          <SignUpForm onClose={() =>  setShowSignUpModal(false)} setShowSignUpModal={setShowSignUpModal} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
};

export default SignUpModal;
