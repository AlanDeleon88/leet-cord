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
            <button className="channel-name-box" onClick={onChannelClick}>
                {/* Change color of the text when the link is active.. eventually make this element a nav link */}

                    # {channel.name}

            </button>
        </>
    )

}
