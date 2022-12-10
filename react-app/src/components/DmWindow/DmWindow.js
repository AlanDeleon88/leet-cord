import './DmWindow.css'
import { Switch, useParams,Route, useRouteMatch, NavLink} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageWindow from '../ServerWindow/MessageWindow';
import {IoSettingsSharp} from 'react-icons/io5'
import UserBox from '../UserBoxComponent';


const DmWindow = () =>{
    const [isLoaded, setIsLoaded] = useState(false);
    const user = useSelector(state=>state.session.user)
    const match = useRouteMatch();
    const dispatch = useDispatch();



    //!use props to thread through message window maybe.

    return (
        <>
            <div className='main-view'>
                <Switch>
                    <Route path={`${match.url}`}>
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

                                    </div>
                                    <UserBox />

                                </div>


                            </>

                            )
                        }
                    </div>

                        <MessageWindow type={'dm'}/>
                    </Route>
                </Switch>
            </div>



        </>
    )

}

export default DmWindow
