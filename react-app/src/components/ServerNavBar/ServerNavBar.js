import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getServers,getUserServers } from '../../store/servers';
import {FaPlus} from 'react-icons/fa'
import { RiCompass3Fill } from "react-icons/ri";
import './ServerNavBar.css'
import ServerIcon from './ServerIcon';
import ServerFormsModal from './ServerFormsModal';

const ServerNavBar = () =>{
    const servers = Object.values(useSelector(state => state.servers))
    const user = useSelector(state => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeClass, setActiveClass] = useState(false)
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getUserServers(user.id)).then(() =>{
            setIsLoaded(true)
        })
    },[dispatch])

    return(
        <>
            <div className='nav-bar-container'>
                {isLoaded ?
                (<>
                    <ul className='server-list'>
                        <li>
                            <NavLink to={`/dm`} exact={false} className='circle' activeClassName='square'>
                                <div
                                    className='server-icon-container icon-dm'>
                                    <div className='dm-icon-marker-container'>
                                        <div className='server-marker'></div>
                                        <img className='dm-button' src='https://i.imgur.com/VxBVVgq.png'/>

                                    </div>

                                    <div className='dm-border-bottom'>

                                    </div>
                                </div>

                            </NavLink>
                        </li>
                        {servers.map(el =>{
                            return(
                                <li key={el.id}>
                                    <ServerIcon server={el} />
                                </li>
                            )
                        })}
                        <li>
                            <div className={activeClass ? 'add-server-active':'add-server-button'}>
                                <ServerFormsModal type={'Add'} setActiveClass={setActiveClass}/>
                            </div>

                        </li>
                        <li>
                                <NavLink exact={true} to='/explore' className='circle' activeClassName='square'>
                                <div className='server-icon-container'>
                                <div className='server-marker'></div>
                                <div className='explore' >
                                    <RiCompass3Fill />
                                </div>
                                {/* Add a div element to act as a marker on which server is active, use nav links active class to select it*/}
                            </div>
                                </NavLink>
                        </li>

                    </ul>
                </>
                )
                :
                (<>
                    Loading...
                </>

                )
                }
            </div>


        </>
    )
}

export default ServerNavBar
