import './ExploreServer.css'
import header from './explore-header.png'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getExploreServer } from '../../store/exploreServer'
import ExploreServerCard from './ExploreServerCard'

const ExploreServer = () =>{
    const [isLoaded, setIsLoaded] = useState(false)
    const servers = Object.values(useSelector(state=>state.exploreServers))
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getExploreServer()).then(res =>{
            setIsLoaded(true)
        })
    },[dispatch])

    return(
        <>
            <div className='explore-main-container'>
                <div className='explore-header-container'>
                    <img src={header} className='explore-header-img'/>
                    <div className='explore-header-caption'>
                        Find your community on leet-cord!
                        <div className='explore-header-sub'>
                            from gaming, to music, to learning, there's a place for you.
                        </div>
                    </div>
                </div>
                    <div className='explore-server-container'>
                        {isLoaded &&
                            servers.map(server =>{

                                return(
                                    <div>
                                        <ExploreServerCard server={server}/>
                                    </div>
                                )
                            })

                        }

                    </div>

            </div>
        </>
    )
}

export default ExploreServer
