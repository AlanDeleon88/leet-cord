import './DmListElement.css'
import { useDispatch } from 'react-redux'
import { getDmRoom } from '../../../store/focusDm'
import { getDmMsg } from '../../../store/dmMessages'
import { useHistory,useRouteMatch,NavLink } from 'react-router-dom'
import { deleteUserDmRoom } from '../../../store/dmRooms'
import { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";



const DmListElement = ({dm}) =>{
    const [showClose, setShowClose] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();

    const handleClick = () =>{
        dispatch(getDmRoom(dm.dm_id)).then((res) =>{
            dispatch(getDmMsg(dm.dm_id))

            // history.push(`${match.url}/${dm.dm_id}`)
        })
    }
    const handleClose = e => {
        dispatch(deleteUserDmRoom(dm.dm_id))
        history.push('/dm')
    }

    const mouseLeave = e =>{
        setShowClose(false)
    }

    const mouseEnter = e =>{
        setShowClose(true)
    }

    return(
        <>

            <div className='dm-el-container' onMouseLeave={mouseLeave} onMouseOver = {mouseEnter}>
            <NavLink to={`${match.url}/${dm.dm_id}`} className='nav-inactive' activeClassName='nav-active'>
                <div className='dm-el-icon-username-container' onClick={handleClick}>
                    <div className='dm-el-icon-container'>
                        <img className="dm-el-icon" src={dm.other_user_icon}/>
                    </div>
                    <div className='dm-el-username'>
                        {dm.other_username}
                    </div>

                </div>
            </NavLink>

                <div className='dm-el-close-button-container'>
                    {showClose &&
                        <button onClick={handleClose} className='dm-el-close-button'>
                            <AiOutlineClose />
                        </button>
                    }
                </div>
            </div>

        </>
    )

}

export default DmListElement
