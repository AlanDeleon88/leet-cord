import './DmWindow.css'
import { Switch, useParams,Route, useRouteMatch, NavLink} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageWindow from '../ServerWindow/MessageWindow';
import UserBox from '../UserBoxComponent';
import MessageInputComponent from '../ServerWindow/MessageInputComponent';
import ChannelHeader from '../ServerWindow/ChannelHeader';
import DmList from './DmList';
import DmPage from './DmPage';


const DmWindow = () =>{
    const [isLoaded, setIsLoaded] = useState(false);
    const user = useSelector(state=>state.session.user)
    const dispatch = useDispatch()
    // const dms = Object.values(useSelector(state=>state.dmRooms))
    const dm = useSelector(state=>state.focusDm)
    const match = useRouteMatch();
    // const dispatch = useDispatch();

    useEffect(() =>{
        // dispatch(getDmRoom)
    },[dispatch])

    //!use props to thread through message window maybe.

    return (
        <>
            <div className='main-view-dm'>
                    <div className='dm-list-container'>
                        {user &&
                            (
                            <>

                                <div className='dm-title'>

                                    <div>
                                        DM
                                    </div>

                                </div>

                                <div className='dm-list-user-box'>


                                    {/*User list of dms will go here...*/}
                                    <div className='dm-lists'>
                                        <DmList id={user.id} />

                                    </div>
                                    <UserBox />

                                </div>


                            </>

                            )
                        }
                    </div>
                <Switch>
                    <Route path={`${match.url}/:dmId`}>
                        <div className='header-message'>
                            <div className='channel-header'>
                                    {dm &&
                                        (
                                            <ChannelHeader dm={dm}/>

                                        )
                                    }
                                </div>

                            <div className='channel-message'>
                                <MessageWindow type={'dm'}/>
                            </div>
                            <div className='msg-input-container'>
                                <MessageInputComponent dmId={dm.id}/>
                            </div>
                        </div>
                    </Route>
                    <Route path={`${match.url}`}>
                        <DmPage />
                    </Route>
                </Switch>
            </div>



        </>
    )

}

export default DmWindow
