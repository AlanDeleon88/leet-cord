import {IoSettingsSharp} from 'react-icons/io5'
import {RiLogoutBoxLine} from 'react-icons/ri'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';
import './UserBox.css'

const UserBox = () =>{
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if(!showMenu) return

        const closeMenu = () => {
            setShowMenu(false);
        }
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    const handleLogout = e =>{
        dispatch(logout());
        history.push('/')

    }
    return(
    <>

        <div className='user-box'>
        {showMenu &&
            <>
                <div className='user-dropdown-container'>
                    <button className='user-logout' onClick={handleLogout}>
                        Logout <RiLogoutBoxLine />
                    </button>

                </div>

            </>}
            <div className='user-ui-container'>
                <div className='user-info'>
                    <div className='profile-pic-container'>
                        <img src={user.profile_picture} className='profile-picture'/>
                    </div>
                    <div className='username-container'>
                        {user.username}

                    </div>
                </div>
                <div className='user-menu'>
                    <button className='user-setting-button' onClick={() =>{setShowMenu(true)}}>
                        <IoSettingsSharp />
                    </button>
                </div>

            </div>

        </div>

    </>
    )

}


export default UserBox
