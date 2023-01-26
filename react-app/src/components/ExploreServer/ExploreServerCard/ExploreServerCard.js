import './ExploreServerCard.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const ExploreServerCard = ({server}) => {
    const [showButton, setShowButton] = useState(false)
    const servers = Object.values(useSelector(state=>state.servers))
    const mouseEnter = e =>{
        setShowButton(true)

    }

    const mouseLeave = e =>{
        setShowButton(false)
    }

    return(
        <>
            <div className="server-card-main-container" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
                <div className="server-card-cover-img-container">
                    {server.server_icon?
                    (
                        <>
                            <img src={server.server_icon} className="server-card-cover-img"/>
                        </>
                    )
                    :
                    (
                        <>
                            <div className="server-card-cover-background">
                                {server.name.trim()[0]}
                            </div>
                        </>
                    )

                    }

                </div>
                <div className="server-card-icon-container">
                    {server.server_icon ?
                        (
                            <>
                                <img src={server.server_icon} className="server-card-icon"/>

                            </>
                        )
                        :
                        (
                            <>
                                <div className="server-card-default-icon">
                                    {server.name.trim()[0]}
                                </div>
                            </>
                        )

                    }
                </div>
                <div className="server-card-title-container">
                    {server.name}
                </div>
                <div className='server-card-desc-member-container'>
                    <div className="server-card-desc-container">
                        {server.description}
                    </div>
                    <div className='server-card-join-server-btn-container'>
                        {showButton &&
                        <>
                            {
                                servers.filter(el =>{
                                    {if(el.name === server.name){
                                        return true
                                    }
                                    else{
                                        return false
                                    }
                                }
                                }).length > 0 ?
                                (
                                    <>
                                        <div className='server-card-joined'>
                                            Server joined
                                        </div>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <button className='server-card-join-server-btn'>Join server</button>
                                    </>
                                )

                            }


                        </>
                        }
                    </div>

                    <div className="server-card-members-container">
                        Members: {server.members.length}
                    </div>
                </div>

            </div>

        </>
    )
}

export default ExploreServerCard
