import './UserCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUserId } from '../../store/user'
import formatDate from '../../utils/formatDate'
import { addUserDmRoom } from '../../store/dmRooms'
import { postDmMsg } from '../../store/dmMessages'

const UserCard = ({userId}) => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)
    const [dmMessage, setDmMessage] = useState('')
    const history = useHistory()
    const user = useSelector(state=>state.focusUser)
    const currentUser = useSelector(state=>state.session.user)

    let date;

    //! might add a send message input directly into the card, write the message then it will redirect to the dm room.
    //!

    useEffect (() =>{
        dispatch(getUserId(userId)).then((res) =>{

            // date = formatDate(user.created_at, false)
            // console.log(date);
            setIsLoaded(true)
        })

    },[dispatch])

    const updateMessage = (e) => {
        setDmMessage(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        let dm_msg = {
            body: dmMessage,

        }
        if(dm_msg.body.trim()){
            dispatch(addUserDmRoom(userId)).then(res =>{
                if(res.dm_id){
                    let dmId = res.dm_id;
                    dispatch(postDmMsg(res.dm_id, dm_msg)).then( res =>{
                        if(!res){
                            history.push(`/dm/${dmId}`)
                        }
                        else{
                            console.log('TEST ERROR FROM DM MESSAGE');
                        }
                    })
                }
                else{
                    console.log('TEST ERROR');
                }

            })
        }
        else{
            //No-Op
        }
        /*
            dispatch to create a dm room or set it to active -> dispatch posting message to dm room -> history push to dm channel.
        */
        setDmMessage('')
    }

    return(
        <>
            <div className='user-card-container'>

                {isLoaded &&

                 <>
                    <div className='user-card-icon-container'>
                        <img src={user.profile_picture} className='user-card-icon'/>
                    </div>
                    <div className='username-input-bundle'>
                        <div className='user-card-username-container'>
                            {user.username}
                        </div>
                        <div className ='user-card-member-date-container'>
                            <div className = 'user-card-member-since'>
                                LEET-CORD MEMBER SINCE
                            </div>
                            <div className = 'user-card-date'>
                                {formatDate(user.created_at, false)}
                            </div>
                        </div>

                        { currentUser.id !== user.id ?
                            (
                                <>

                                    <div className='user-card-input-container'>
                                        <form onSubmit={handleSubmit}>

                                            <input type='text' value={dmMessage} onChange={updateMessage} placeholder={`Message @${user.username}`} className='user-card-input'/>

                                        </form>


                                    </div>

                                </>

                            )
                            :
                            (
                                <>
                                    <div className='user-card-placeholder'>

                                    </div>
                                </>

                            )

                        }

                    </div>

                 </>

               }


            </div>

        </>
    )
}

export default UserCard
