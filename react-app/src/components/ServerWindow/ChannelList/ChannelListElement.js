import './ChannelList.css'
import { useRouteMatch, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getChannel } from '../../../store/channel';
import {IoSettingsSharp} from 'react-icons/io5'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import ChannelSettings from '../../ChannelSettingsModal/ChannelSettings';


export const ChannelListElement = ({channel, serverId}) =>{
    const [showSettingModal, setShowSettingModal] = useState(false);
    const match = useRouteMatch();
    const dispatch = useDispatch()
    const server = useSelector(state => state.focusServer)
    const user = useSelector(state => state.session.user)



    const onChannelClick = () =>{
        dispatch(getChannel(channel.channel_id))
    }

    const handleSettings = e =>{
        setShowSettingModal(true)
    }



    return(
        <>
        <div className='channel-button-container'>
            <button className="channel-name-box" onClick={onChannelClick}>
                {/* Change color of the text when the link is active.. eventually make this element a nav link */}

                    # {channel.name}

            </button>
            {server.owner_id == user.id &&
            (
                <button className='channel-settings-button' onClick={handleSettings}>
                <IoSettingsSharp />
                </button>
            )

            }
            {
                showSettingModal &&
                (
                    <>
                        <Modal onClose={() =>{
                            setShowSettingModal(false)
                        }}>
                            <ChannelSettings channel={channel} setShowSettingModal={setShowSettingModal}/>
                        </Modal>

                    </>

                )
            }

        </div>

        </>
    )

}
