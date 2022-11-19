import './ChannelList.css'
import { useRouteMatch, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getChannel } from '../../../store/channel';
export const ChannelListElement = ({channel, serverId}) =>{
    const match = useRouteMatch();
    const dispatch = useDispatch()
    const onChannelClick = () =>{
        dispatch(getChannel(channel.channel_id))
    }


    return(
        <>
            <div className="channel-name-box">
                {/* Change color of the text when the link is active.. eventually make this element a nav link */}
                <NavLink to={`/server/${serverId}/channel/${channel.channel_id}`} onClick={onChannelClick}>
                    # {channel.name}
                </NavLink>

            </div>
        </>
    )

}
