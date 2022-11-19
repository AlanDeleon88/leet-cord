import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getIdServer } from "../../../store/focusServer"
import { ChannelListElement } from "./ChannelListElement"
const ChannelList = ({id}) =>{
    const dispatch = useDispatch()
    const server = useSelector(state => state.focusServer)
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        dispatch(getIdServer(id)).then(() =>{
            setIsLoaded(true)
        })

    },[dispatch])


    return(
        <>
        <ul className="channel-list">
            {isLoaded &&
            (
                <>

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
