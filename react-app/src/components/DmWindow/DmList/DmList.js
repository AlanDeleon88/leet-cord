import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getUserDmRooms } from "../../../store/dmRooms"
import DmListElement from "../DmListElement"

const DmList = ({id}) =>{
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const dms = Object.values(useSelector(state=>state.dmRooms))


    useEffect(() =>{
        dispatch(getUserDmRooms(id))
        setIsLoaded(true)
    },[dispatch])

    return(
        <>
            {isLoaded &&
                <>
                    {dms &&
                        <>
                            {
                                dms.map(dm =>{
                                    if(dm.active){
                                        return(
                                            <>
                                                {/* dmListElement here */}
                                                {/* {dm.other_username} */}
                                                <DmListElement dm={dm} key={dm.dm_id}/>
                                            </>
                                        )
                                    }
                                })
                            }
                        </>
                    }
                </>
            }
        </>
    )
}

export default DmList
