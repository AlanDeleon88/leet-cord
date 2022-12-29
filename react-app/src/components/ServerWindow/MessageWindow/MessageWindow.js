import './MessageWindow.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannel } from '../../../store/channel';
import ChannelHeader from '../ChannelHeader/ChannelHeader';

const MessageWindow = ({type}) =>{

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
                { type === 'channel' &&
                    <div className='channel-header'>
                        {
                            channel && (
                                <>
                                    <div className='channel-header-container'>
                                        {/* <ChannelHeader channel={channel}/> */}

                                    </div>

                                </>
                            )
                        }

                    </div>
                }
                { type === 'dm' &&
                    <div>
                        DM messages will go here.
                    </div>

                }

            </div>
        </>
    )

}

export default MessageWindow
