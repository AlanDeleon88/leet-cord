import './MessageWindow.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannel } from '../../../store/channel';
import { getChannelMessages } from '../../../store/channelMessage';
import ChannelHeader from '../ChannelHeader/ChannelHeader';
import MessageComponent from '../MessageComponent';


const MessageWindow = ({type}) =>{

    const messageEl = useRef(null)
    const {channelId} = useParams();
    const id = Number(channelId)
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const channel = useSelector(state => state.channel)
    const messages = Object.values(useSelector(state=>state.channelMessages))

    //!depreciated. had a bug with trying to render an options component for each message, would scroll to bottom on hover.
    // useEffect(() =>{
    //    if(messageEl){
    //     messageEl.current.addEventListener('DOMNodeInserted', event =>{
    //         const {currentTarget: target} = event;
    //         target.scroll({top : target.scrollHeight, behavior : 'smooth'});
    //     })
    //    }
    // },[])

    useEffect(() =>{
        //* this solved my bug with the channel list shifting up. the block option to end seemed to fix it.
        messageEl.current?.scrollIntoView({behavior : 'auto', block:'end'})

    }, [messages])

    useEffect(() =>{


            // console.log('DEBUG PLACE3===============================', channel.id, id)
            dispatch(getChannelMessages(id)).then(() =>{

                // console.log(isLoaded);
            })

        setIsLoaded(true)
    },[dispatch])



    return(
        <>
            <div className="message-container">
                { type === 'channel' &&
                    <>

                    <div>
                        {/*place holder div*/}
                    </div>
                    <div>
                        {isLoaded && (
                            <>
                                {/*make message component later, pass message into component..*/}
                                {messages.map(el =>{
                                    return(
                                        <MessageComponent message={el} showEdit={false}/>

                                    )
                                })}
                            </>
                        )}


                        <div className='placeholder' ref={messageEl} id='scroll'>
                            {/*bug here, whenever this div has a ref property, it causes the channel list to shift up. */}
                            {/* I seemed to narrowed it down to the scrollIntoView method. */}

                        </div>
                    </div>

                    </>
                }
                { type === 'dm' &&

                    <>
                        <div>
                        {/*place holder div*/}
                        </div>

                        <div>
                            DM messages will go here.
                        </div>

                    </>

                }
            </div>

        </>
    )

}

export default MessageWindow
