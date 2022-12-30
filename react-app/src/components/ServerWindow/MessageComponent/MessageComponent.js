import './MessageComponent.css'
const MessageComponent = ({message}) => {


    return(
        <>
            <div className="message-bundle-container">
                <div className="user-pic-container">

                    <img src={message.sender_icon} className='user-pic'/>

                </div>

                <div className="message-bundle">
                    <div className="username-bundle-container">
                        <div className="username-container">
                            {message.sender_username}

                        </div>
                        <div className="date-continaer">
                            {message.updated_at}
                        </div>
                    </div>
                    <div className="message-body-container">
                        {message.body}
                    </div>

                </div>

            </div>

        </>
    )

}

export default MessageComponent
