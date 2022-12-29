import { NavLink } from "react-router-dom"
import ReactTooltip from "react-tooltip"
import { useDispatch, useSelector } from "react-redux"
import { getIdServer } from "../../store/focusServer";
import { useState } from "react";
import './ServerNavBar.css'
import { getChannel } from "../../store/channel";
import { useEffect } from "react";
import { getChannelMessages } from "../../store/channelMessage";

const ServerIcon = ({server}) => {
    const [hovered, setHovered] = useState(false)
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)
    const [serverName, setServerName] = useState('')
    const focusServer = useSelector(state =>state.focusServer)

    // useEffect(() =>{
    //     dispatch(getIdServer(server.id)).then((res) =>{
    //         setIsLoaded(true)
    //         let nameArr = res.name.split('')
    //         nameArr = nameArr.reverse();
    //         console.log('IM THE ONE');

    //         nameArr.forEach(char =>{
    //             if(char !== ' '){
    //                 setServerName(char)
    //             }
    //         })


    //         // console.log(nameArr);

    //     })
    // },[dispatch])


    const handleServerClick = () =>{
        dispatch(getIdServer(server.id))
        dispatch(getChannel(server.channels[0].channel_id))
        dispatch(getChannelMessages(server.channels[0].channel_id))

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
                            <div className='server-icon-container'>
                                <div className='server-marker'></div>
                                <img src={server.server_icon} className='server-icon' /> {/* make nav link later, with activeClassName might have to use states to toggle the cursor on and off..*/}

                            </div>

                            )
                                :
                            (
                            <div className='server-icon-container'>
                                <div className='server-marker'></div>
                                <div className='default-icon' > {server.name.split('').filter(char =>{
                                    if(char !== ' '){
                                        return true
                                    }
                                })[0]}
                                </div>
                                {/* Add a div element to act as a marker on which server is active, use nav links active class to select it*/}
                            </div>


                            )
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
