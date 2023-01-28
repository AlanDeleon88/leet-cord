import './MessageWindow.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannel } from '../../../store/channel';
import { getChannelMessages } from '../../../store/channelMessage';
import ChannelHeader from '../ChannelHeader/ChannelHeader';
import { getDmMsg } from '../../../store/dmMessages';
import { clearChMessages } from '../../../store/channelMessage';
import MessageComponent from '../MessageComponent';
import {io} from 'socket.io-client'
import MessageInputComponent from '../MessageInputComponent';

let socket;
const MessageWindow = ({type,chId}) =>{

    const messageEl = useRef(null)
    const {channelId} = useParams();
    const {dmId} = useParams();
    const dId = Number(dmId)
    const id = Number(channelId);
    const [isLoaded, setIsLoaded] = useState(false)
    const [socketMessages, setSocketMessages] = useState([])
    const [prevRoom, setPrevRoom] = useState(`CHmessage${chId}`)
    const [currRoom, setCurrRoom] = useState()
    const dispatch = useDispatch()
    const channel = useSelector(state => state.channel)
    const messages = Object.values(useSelector(state=>state.channelMessages))
    const direct_messages = Object.values(useSelector(state=>state.directMessages))
    const focusMessage = useSelector(state=>state.focusChMessage)
    // console.log(dId);
    // console.log(socketMessages);
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
            socket = io();
            if(type === 'channel'){
                //!clicking channel buttons do not cause this to run.
                //! adding the channel store to the dependency array makes this run, and
                //! it does seem to dismount too.
                //! if the channels not dismounting properly was the issue this could fix it?
                dispatch(getChannelMessages(chId)).then((res) =>{
                    // console.log(id);
                    if(Array.isArray(res)){
                        setSocketMessages(res)
                        // console.log('SETTING MESSAGES');
                        // console.log(res);
                        // console.log(isLoaded);
                        // setIsLoaded(true)
                    }
                    // console.log('imhere');
                })
                dispatch(clearChMessages())

                // socket = io();
                socket.on('message', (chat) =>{
                    setSocketMessages((messages) =>[...messages, chat.newMessage]);
                    // console.log('I HAVE LISTENED TO AN EVENT');
                        // console.log('WHAT AM I---------------',chat)
                })

                // socket.on('chat', (chat) =>{
                //     setSocketMessages((messages) =>[...messages, chat]);
                //     console.log('I HAVE LISTENED TO AN EVENT');
                //         // console.log('WHAT AM I---------------',chat)
                // })

                // console.log('SOCKET CONNECTED');
                setCurrRoom(`CHmessage${chId}`)

                return() => {
                    // console.log('DISMOUNT CHANNEL DISCONNECT SOCKET');
                    socket.disconnect();
                }


            }
            else if(type === 'dm'){
                // setPrevRoom(`DMmessage${dId}`)
                //!dispatch for dm message heres
                dispatch(getDmMsg(dId)).then(res =>{
                    if(Array.isArray(res)){
                        setSocketMessages(res)
                        // console.log(res);

                    }
                })

                dispatch(clearChMessages())

                // socket = io();
                // console.log(socket);
                socket.on('message', (chat) =>{
                    setSocketMessages((messages) =>[...messages, chat.newMessage]);
                    // console.log('I HAVE LISTENED TO AN EVENT');
                        // console.log('WHAT AM I---------------',chat)
                })
            }
            // setIsLoaded(true)
            setCurrRoom(`DMmessage${dId}`)

            return(()=>{
                //!issue seems to be that whenever the channel changes or server changes, the message window does not
                //! unmount, therefore causing multiple connection to the socket?
                //! does not dismount when changing channels...
                // console.log('DISMOUNTED')
                socket.disconnect();
            })

    },[dispatch, dId, chId])

    useEffect(() =>{
        dispatch(getChannelMessages(chId)).then(res =>{
            if(Array.isArray(res)){
                // setSocketMessages(res)
            }
        })
    },[dispatch, focusMessage])

    useEffect(() =>{
        const joinRoom = (room)=> {
            socket.emit('join_room', {room: currRoom})
        }
        const leaveRoom = (room) =>{
            socket.emit('leave_room',{room: prevRoom})
        }
        if(isLoaded){
            leaveRoom(prevRoom)
            joinRoom(currRoom)

            setPrevRoom(currRoom)
        }
        setIsLoaded(true)

        return () => setIsLoaded(false)
    },[prevRoom, currRoom, isLoaded])


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
                                {socketMessages.map(el =>{
                                    return(

                                        <MessageComponent message={el} showEdit={false} />

                                    )
                                })}
                            </>
                        )}


                        <div className='placeholder' ref={messageEl} id='scroll'>

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
                        {isLoaded && (
                            <>
                                {/*make message component later, pass message into component..*/}
                                {socketMessages.map(el =>{
                                    return(
                                        <MessageComponent message={el} showEdit={false} type='dm'/>

                                    )
                                })}
                            </>
                        )}

                            <div className='placeholder' ref={messageEl} id='scroll'></div>
                        </div>

                    </>

                }

            </div>
            <div className='msg-input-container'>
                {dId ?
                (
                    <>
                        <MessageInputComponent dmId={dId} socket={socket} currRoom={currRoom}/>
                    </>
                )
                    :
                (
                    <>
                        <MessageInputComponent channelId={chId} socket={socket} currRoom={currRoom}/>
                    </>
                )
                }

            </div>
        </>
    )

}

export default MessageWindow
