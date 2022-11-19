import { NavLink } from "react-router-dom"
import ReactTooltip from "react-tooltip"
import { useDispatch, useSelector } from "react-redux"
import { getIdServer } from "../../store/focusServer";
import { useState } from "react";
import './ServerNavBar.css'
import { getChannel } from "../../store/channel";
import { useEffect } from "react";

const ServerIcon = ({server}) => {
    const [hovered, setHovered] = useState(false)
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)
    const focusServer = useSelector(state =>state.focusServer)

    // useEffect(() =>{
    //     dispatch(getIdServer(server.id)).then(() =>{
    //         setIsLoaded(true)
    //     })
    // },[dispatch])

    const handleServerClick = () =>{
        dispatch(getIdServer(server.id))
        dispatch(getChannel(server.channels[0].channel_id))

    }

    const handleHover = (e) =>{
        //! have a div marker show up to the right of the element if mouse hovers over server icon.
        setHovered(!hovered)
    }
    //!eventually try to figure out how to remember on what channel the user was on last.. maybe add a redux store..
    return(
        <>
            {true &&

                (<>
                    <NavLink to={`/server/${server.id}/channel/${server.channels[0].channel_id}`} exact={true} className ='circle' activeClassName="square" onClick={handleServerClick}>

                        <div data-tip={server.name} data-for='serverName' data-place='right'>
                        {server.server_icon ?
                            (
                            <>
                                <img src={server.server_icon} className='server-icon' /> {/* make nav link later, with activeClassName might have to use states to toggle the cursor on and off..*/}
                            </>
                            )
                                :
                            (<>
                                <div className='default-icon' > {server.name[0]}  </div>
                            </>)
                        }
                        </div>
                    <ReactTooltip id='serverName' />
                    </NavLink>


                </>)
            }


        </>
    )
}

export default ServerIcon
