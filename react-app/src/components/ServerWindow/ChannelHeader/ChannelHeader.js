import './ChannelHeader.css'

const ChannelHeader = ({channel}) =>{

    return(
        <>
            <div className='header-container'>

                <div className="channel-name-header">
                    {channel &&
                        <>
                        <div className='channel-name-header-container'>
                            <div>
                                #
                            </div>
                            <div>
                                 {channel.name}
                            </div>

                        </div>
                        </>
                    }
                </div>
                <div className='header-desc'>
                    {channel &&
                        <>
                            {channel.description}
                        </>
                    }
                </div>
            </div>
        </>
    )

}

export default ChannelHeader
