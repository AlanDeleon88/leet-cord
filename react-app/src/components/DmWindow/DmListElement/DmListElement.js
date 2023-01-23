import './DmListElement.css'
import { useDispatch } from 'react-redux'
import { getDmRoom } from '../../../store/focusDm'
import { getDmMsg } from '../../../store/dmMessages'
import { useHistory,useRouteMatch } from 'react-router-dom'

const DmListElement = ({dm}) =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();
    const handleClick = () =>{
        dispatch(getDmRoom(dm.dm_id)).then((res) =>{
            dispatch(getDmMsg(dm.dm_id))

            history.push(`${match.url}/${dm.dm_id}`)
        })
    }

    return(
        <>

            <div className='dm-el-container' onClick={handleClick}>
                <div className='dm-el-icon-container'>
                    <img className="dm-el-icon" src={dm.other_user_icon}/>
                </div>
                <div className='dm-el-username'>
                    {dm.other_username}
                </div>
                <div className='dm-el-close-button-container'>
                    <button>Close</button>
                </div>

            </div>

        </>
    )

}

export default DmListElement
