import './ServerWindow.css'
import { Switch, useParams,Route, useRouteMatch } from 'react-router-dom'
import ChannelList from './ChannelList/ChannelList';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIdServer } from '../../store/focusServer';
import MessageWindow from './MessageWindow';
const ServerWindow = () =>{
    const [isLoaded, setIsLoaded] = useState(false)
    let {serverId} = useParams();
    let id = Number(serverId);
    const server = useSelector(state => state.focusServer)
    const dispatch = useDispatch();
    const match = useRouteMatch();

    useEffect(() =>{
        dispatch(getIdServer(id)).then(() =>{
            setIsLoaded(true)
        })
    },[dispatch])




    return (
        <>
            <div className='main-view'>

                <div className='channel-container'>
                    {isLoaded &&
                        (
                        <>
                            <div className='server-title'>
                                {server.name}

                            </div>
                            <ChannelList id = {id}/>

                        </>

                        )
                    }
                </div>

                    <MessageWindow />
            </div>


        </>
    )

}

export default ServerWindow
