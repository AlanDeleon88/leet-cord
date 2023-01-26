import './ChannelList.css'
import { useRouteMatch, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getChannel } from '../../../store/channel';
import {IoSettingsSharp} from 'react-icons/io5'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import ChannelSettings from '../../ChannelSettingsModal/ChannelSettings';
import { getChannelMessages } from '../../../store/channelMessage';


export const ChannelListElement = ({channel, serverId}) =>{
    const [showSettingModal, setShowSettingModal] = useState(false);
    const match = useRouteMatch();
    const dispatch = useDispatch()
    const server = useSelector(state => state.focusServer)
    const user = useSelector(state => state.session.user)



    const onChannelClick = () =>{
        dispatch(getChannel(channel.channel_id))
        // console.log('DEBUG PLACE2===============================', channel.channel_id)
        dispatch(getChannelMessages(channel.channel_id))
        let cancel = document.getElementById('cancel-button')
        if(cancel){
            cancel.click();
        }

    }

    const handleSettings = e =>{
        setShowSettingModal(true)
    }



    return(
        <>
        <div className='channel-button-container'>
            <NavLink to={`${match.url}/${channel.channel_id}`} className="channel-name-box" activeClassName='active-name-box' onClick={onChannelClick}>
                {/* Change color of the text when the link is active.. eventually make this element a nav link */}
                <div className='channel-el-name-container'>

                    <div className='channel-el-name'>
                        <div style={{'paddingRight' : '4px'}}>
                            #
                        </div>
                        <div>

                            {` ${channel.name}`}

                        </div>
                    </div>

                </div>
            {server.owner_id == user.id &&

            (
                <div className='channel-setting-container'>
                    <button className='channel-settings-button' onClick={handleSettings}>
                    <IoSettingsSharp />
                    </button>
                </div>
            )

        }
        </NavLink>
            {
                showSettingModal &&
                (
                    <>
                        <Modal onClose={() =>{
                            setShowSettingModal(false)
                        }}>
                            <ChannelSettings channel={channel} setShowSettingModal={setShowSettingModal} serverId={serverId}/>
                        </Modal>

                    </>

                )
            }

        </div>

        </>
    )

}
