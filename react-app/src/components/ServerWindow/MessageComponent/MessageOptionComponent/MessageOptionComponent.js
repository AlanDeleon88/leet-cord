import { useState } from "react"
import './MessageOptionComponent.css'
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Fill} from "react-icons/ri";


const MessageOptionComponent = ({message, setEditMessage, setShowDeleteModal}) =>{


    return(
        <>
            <div className= 'options-container'>
                <div className="edit-msg-button-container">
                    <MdOutlineModeEditOutline />

                </div>
                <div className="delete-button-container">
                    <RiDeleteBin5Fill />
                </div>
            </div>

        </>
    )

}

export default MessageOptionComponent
