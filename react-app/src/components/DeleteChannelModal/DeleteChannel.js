import { useDispatch,useSelector } from "react-redux"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { deleteChannel } from "../../store/focusServer"
import { getChannelMessages } from "../../store/channelMessage"
import { getChannel } from "../../store/channel"
import './DeleteChannel.css'


const DeleteChannel = ({serverId, channel, setShowModal, setShowSettingModal}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const server = useSelector(state=>state.focusServer)

    const handleYes = e =>{
        e.preventDefault()

        //!dispatch to delete channel
        dispatch(deleteChannel(channel.channel_id, serverId))


        //! redirect to first channel of server IE /server/server.id/server.channels[0].channel_id
        // history.push(`/server/${serverId}/channel/${server.channels[0].channel_id}`)
        dispatch(getChannel(server.channels[0].channel_id))
        dispatch(getChannelMessages(server.channels[0].channel_id))
        setShowModal(false)
        setShowSettingModal(false)
    }

    const handleNo = e =>{
        e.preventDefault()

        setShowModal(false)
    }

    return(
        <>
            <div className="delete-channel-window">

                <div className="delete-channel-caption">
                    Are you sure you want to delete this Channel?
                </div>


                <div className="button-container">

                    <button className ='delete-yes delbutton' onClick={handleYes}>
                        Yes
                    </button>
                    <button className = 'delete-no delbutton' onClick={handleNo}>
                        No
                    </button>

                </div>

            </div>

        </>
    )
}

export default DeleteChannel
