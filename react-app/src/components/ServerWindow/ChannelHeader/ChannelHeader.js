import './ChannelHeader.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import { getDmRoom } from '../../../store/focusDm'
import { useParams } from 'react-router-dom'

const ChannelHeader = ({channel, dm}) =>{
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();
    const {dmId} = useParams();
    const id = Number(dmId)
    // console.log(dm);

    useEffect(() =>{
        dispatch(getDmRoom(id)).then(res =>{
            setIsLoaded(true)
        })
    },[dispatch])

    return(
        <>
            <div className='header-container'>

                {channel ?
                (
                    <>
                        <div className="channel-name-header">

                            <div className='channel-name-header-container'>
                                <div>
                                    #
                                </div>
                                <div>
                                    {channel.name}
                                </div>
                            </div>

                    </div>
                    <div className='header-desc'>

                                {channel.description}

                    </div>
                </>

                )

                :

                (
                    <>
                        <div className="channel-name-header">

                            <div className='channel-name-header-container'>
                                <div>
                                    @
                                </div>
                                <div>
                                {isLoaded &&
                                    <>
                                         {dm.other_user.username}
                                    </>
                                }

                                </div>
                            </div>

                        </div>
                        <div className='header-desc'>

                        </div>
                    </>

                )


                }



            </div>
        </>
    )

}

export default ChannelHeader
