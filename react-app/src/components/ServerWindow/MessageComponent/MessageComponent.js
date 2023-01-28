import './MessageComponent.css'
import { useState, useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import MessageOptionComponent from './MessageOptionComponent/MessageOptionComponent'
import MessageDeleteModal from './MessageDeleteModal'
import { Modal } from '../../../context/Modal'
import { editChMessage } from '../../../store/channelMessage'
import { getMessageId } from '../../../store/focusChMessage'
import UserCard from '../../UserCardModal'
import formatDate from '../../../utils/formatDate'
import { editDmMessage } from '../../../store/dmMessages'
// import {io} from 'socket.io-client'
const MessageComponent = ({message, channelId, preview, showEdit, type, socket, currRoom}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showUserCard, setShowUserCard] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditMessage, setShowEditMessage] = useState(showEdit);
    const [hasEdited, setHasEdited] = useState(false)
    const dispatch = useDispatch();
    const [editMessage, setEditMessage] = useState('');
    const user = useSelector(state=>state.session.user)
    const date = formatDate(message.updated_at, true)

    useEffect(() =>{
        setShowEditMessage(false);
    },[showEdit])

    const mouseLeave = (e) => {
        if(!preview){
            setShowMenu(false)

        }
        // console.log('mouse left falsE');

    }
    const mouseEnter = (e) =>{
        if(!preview){
            setShowMenu(true)

        }
        // dispatch(getMessageId(message.message_id))
        // console.log('mouse enter TRUEEEEEE');
    }

    const updateEdit = (e) =>{
        setEditMessage(e.target.value)
        setHasEdited(true)
    }

    const handleCancel = (e) =>{
        setShowEditMessage(false)
        setHasEdited(false);
        setEditMessage('');
    }

    const handleUpdate = async e =>{
        e.preventDefault();
        let editedMessage = {
            id:message.message_id,
            body: editMessage
        }
        //  console.log(editedMessage);
        if(!editedMessage.body){
            //? open up delete modal to confirm delete
        }
        else{
            //* need conditional for Dm messages
            if(!type){
                const data = await dispatch(editChMessage(editedMessage)).then(res =>{
                    const editedMessage = res
                    if(res.id){

                        socket.send({editedMessage, room: currRoom })

                        setShowEditMessage(false);
                    }
                    else{
                        //!error handle
                    }
                })

            }
            else if(type === 'dm'){
                //! dm dispatch to edit message
                // console.log(editedMessage);
                const data = await dispatch(editDmMessage(editedMessage)).then(res =>{
                    const editedMessage = res
                    if(res.id){

                        socket.send({editedMessage, room: currRoom })

                        setShowEditMessage(false);
                    }
                    else{
                        //!error handle
                    }
                })

            }
        }

    }

    const clickIcon = (e) =>{
        setShowUserCard(true)
    }

    return(
        <>
            <div className={preview ? 'prev-message-bundle-container' : "message-bundle-container"} onMouseLeave={mouseLeave} onMouseOver = {mouseEnter}>
                <div className="user-pic-container">

                    <img src={message.sender_icon} className='user-pic' onClick={clickIcon}/>

                </div>

                <div className={preview ? 'prev-message-bundle' : "message-bundle"}>
                    <div className="username-bundle-container">
                        <div className="username-container" onClick={clickIcon}>
                            {message.sender_username}

                        </div>
                        <div className="date-container">
                            <div className='msg-date'>

                                {date}
                            </div>


                    {
                    showMenu &&
                    <>
                        {message.sender_id === user.id &&
                            <>
                                <div className='msg-option-container'>
                                    <MessageOptionComponent setShowEditMessage={setShowEditMessage} setShowDeleteModal={setShowDeleteModal} message={message}/>
                                </div>
                            </>

                        }

                    </>
                }
                        </div>
                    </div>
                    <div className="message-body-container">
                        {message.img &&
                            <div className='mgs-img-container'>
                                <img src={message.img} className='msg-img'/>
                            </div>
                        }
                        <div className={preview? 'prev-msg-body':'msg-body'}>
                            {showEditMessage ?
                                (
                                    <>
                                        <div className='edit-msg-input-container'>
                                            <form onSubmit={handleUpdate} style={{width: '100%'}}>
                                                <input type='text' onChange={updateEdit} value={editMessage||hasEdited ? editMessage : message.body} className='edit-msg-input'/>

                                            </form>
                                            <button onClick={handleCancel} className='edit-msg-cancel-btn' id='cancel-button'>Cancel</button>
                                        </div>
                                    </>
                                )
                                :
                                (
                                    <>
                                         {message.body}
                                    </>
                                )

                            }

                        </div>


                    </div>

                </div>


            </div>
            {showDeleteModal &&
                <>
                <Modal onClose={() =>{
                setShowDeleteModal(false)
                }}>

                   {type ?
                   (
                        <>
                            {/* Message Delete modal for dm here*/}
                            <MessageDeleteModal setShowDeleteModal={setShowDeleteModal} message={message} type='dm' socket={socket} currRoom={currRoom}/>
                        </>
                   )
                   :
                   (
                        <>
                            <MessageDeleteModal setShowDeleteModal={setShowDeleteModal} message={message} socket={socket} currRoom={currRoom}/>

                        </>
                   )

                   }

                </Modal>

                </>

            }
            {showUserCard &&
                <>
                    <Modal onClose={() =>{
                    setShowUserCard(false)
                }}>
                        <UserCard userId={message.sender_id}/>

                    </Modal>

                </>

            }

        </>
    )

}

export default MessageComponent
