import './MessageWindow.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannel } from '../../../store/channel';

const MessageWindow = () =>{

    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const channel = useSelector(state => state.channel)




    // useEffect(() =>{
    //     dispatch(getChannel(id)).then(() =>{
    //         setIsLoaded(true)
    //     })
    // },[dispatch])



    return(
        <>
            <div className="message-container">
                <div>
                    {
                        channel && (
                            <>
                                {channel.name}

                            </>
                        )
                    }

                </div>

            </div>
        </>
    )

}

export default MessageWindow
