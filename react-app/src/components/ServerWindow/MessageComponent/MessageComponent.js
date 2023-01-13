import './MessageComponent.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import MessageOptionComponent from './MessageOptionComponent/MessageOptionComponent'
const MessageComponent = ({message}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editMessage, setEditMessage] = useState(false);
    const user = useSelector(state => state.session.user);

    //! look into mouseover event to see if i can get option menu to show up.
    //! may need to look into how to set showmenu to false
    console.log(message.updated_at.split(' '));
    //! function to format date will move to another file.
    const formatDate = (date) =>{
        const monthObj ={
            'Jan' : 1,
            'Feb' : 2,
            'Mar' : 3,
            'Apr' : 4,
            'May' : 5,
            'Jun' : 6,
            'Jul' : 7,
            'Aug' : 8,
            'Sep' : 9,
            'Oct' : 10,
            'Nov' : 11,
            'Dec' : 12,
        }
        const dateArr = date.split(' ')

    }

    const mouseLeave = (e) =>{
        setShowMenu(false)
        // console.log('mouse left falsE');
    }

    const mouseEnter = (e) =>{
        setShowMenu(true)
        // console.log('mouse enter TRUEEEEEE');
    }

    return(
        <>
            <div className="message-bundle-container" onMouseLeave={mouseLeave} onMouseOver = {mouseEnter}>
                <div className="user-pic-container">

                    <img src={message.sender_icon} className='user-pic'/>

                </div>

                <div className="message-bundle">
                    <div className="username-bundle-container">
                        <div className="username-container">
                            {message.sender_username}

                        </div>
                        <div className="date-container">
                            <div className='msg-date'>

                                {message.updated_at}
                            </div>


                    {
                    true &&
                    <>
                        {message.my_message &&
                            <>
                                <div className='msg-option-container'>
                                    <MessageOptionComponent />
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
                        <div className='msg-body'>
                            {message.body}
                        </div>


                    </div>

                </div>


            </div>

        </>
    )

}

export default MessageComponent
