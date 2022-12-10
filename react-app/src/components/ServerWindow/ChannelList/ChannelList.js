import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getIdServer } from "../../../store/focusServer"
import { ChannelListElement } from "./ChannelListElement"
import {BsPlusLg} from 'react-icons/bs'
import AddChannelModal from "../../AddChannelModal"
const ChannelList = ({id}) =>{
    const dispatch = useDispatch()
    const server = useSelector(state => state.focusServer)
    const user = useSelector(state =>state.session.user)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getIdServer(id)).then(() =>{
            setIsLoaded(true)
            // console.log('IM THE ONE');
        })

    },[dispatch])

    const handleAddChannel = e =>{

    }


    return(
        <>
        <ul className="channel-list">
            {isLoaded &&
            (
                <>
                    <li className="channel-text">
                        <div>
                            Text Channels
                        </div>
                        { server.owner_id === user.id && (

                            <AddChannelModal serverId={id}/>

                        )

                        }

                    </li>

                        {server.channels.map(el =>{
                            return(
                                <li key={el.id}>
                                    <ChannelListElement channel={el} serverId={id}/>
                                </li>
                            )

                        })}

                </>



            )}
        </ul>

        </>
    )


}

export default ChannelList
