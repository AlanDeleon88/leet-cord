import './MessageDeleteModal.css'
import MessageComponent from '../MessageComponent';
import { useDispatch } from 'react-redux';
import { deleteChMessage } from '../../../../store/channelMessage';
import { deleteDmMessage } from '../../../../store/dmMessages';

const MessageDeleteModal = ({setShowDeleteModal, message, type, socket, currRoom}) =>{
    const dispatch = useDispatch();

    const handleDelete = (e) =>{
        //*need conditional for dm message dispatch
        if(!type){
            dispatch(deleteChMessage(message.message_id)).then(res =>{
                let deletedMsg = res
                socket.send({deletedMsg, room: currRoom })
            })
        }
        else if(type === 'dm'){
            dispatch(deleteDmMessage(message.message_id)).then(res=>{
                let deletedMsg = res
                socket.send({deletedMsg, room: currRoom })
            })
        }
        setShowDeleteModal(false);
    }

    const handleCancel = (e) =>{
        setShowDeleteModal(false);
    }


    return(
        <>
            <div className="msg-delete-container">
                <div className='dlt-msg-header'>
                    Delete Message
                </div>
                <div className='dlt-msg-prompt'>
                    Are you sure you want to delete this message?
                </div>
                <div className='msg-prev-container'>

                        <MessageComponent message={message} preview={true}/>

                </div>
                    <div className='dlt-msg-buttons-container'>
                        <button className='dlt-msg-button dlt-confirm' onClick={handleDelete}>
                            Delete
                        </button>
                        <button className='dlt-msg-button dlt-cancel' onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
            </div>
        </>
    )
}

export default MessageDeleteModal;
