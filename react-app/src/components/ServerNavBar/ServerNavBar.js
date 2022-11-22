import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getServers,getUserServers } from '../../store/servers';
import {FaPlus} from 'react-icons/fa'
import './ServerNavBar.css'
import ServerIcon from './ServerIcon';
import AddServerModal from './AddServerModal';

const ServerNavBar = () =>{
    const servers = Object.values(useSelector(state => state.servers))
    const user = useSelector(state => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false)
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
                            <NavLink to={`/${user.username}/dm`} className='circle' activeClassName='square'>
                                <div
                                    className='server-icon-container'>
                                    <div className='server-marker'></div>
                                    <img className='dm-button' src='https://i.imgur.com/VxBVVgq.png'/>
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
                            <div className='add-server-button'>
                                <AddServerModal type={'Add'}/>
                            </div>

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
