import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getServers } from '../../store/servers';
import './ServerNavBar.css'
import ReactTooltip from 'react-tooltip'

const ServerNavBar = () =>{
    const servers = Object.values(useSelector(state => state.servers))
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();



    useEffect(() => {
        //! Eventually change this to all servers associated with logged in user.
        dispatch(getServers()).then(() =>{
            setIsLoaded(true)
        })
    },[dispatch])

    return(
        <>
            <div className='nav-bar-container'>
                {isLoaded ?
                (<>
                    <ul className='server-list'>
                        {servers.map(el =>{
                            return(
                                <li key={el.id}>
                                    <div data-tip={el.name} data-for='serverName' data-place='right'>
                                        {el.server_icon ?
                                            (
                                            <>
                                                <img src={el.server_icon} className='server-icon'/> {/* make nav link later, with activeClassName might have to use states to toggle the cursor on and off..*/}
                                            </>
                                            )
                                                :
                                            (<>
                                                    <div className='default-icon'> {el.name[0]}  </div>
                                            </>)
                                    }
                                    </div>
                                    <ReactTooltip id='serverName' />
                                </li>
                            )
                        })}

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
