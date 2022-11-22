import {useState, useEffect} from 'react';
import {MdKeyboardArrowDown} from 'react-icons/md'
import {IoSettingsSharp} from 'react-icons/io5'
import { RiDeleteBin5Fill} from "react-icons/ri";
import {BsArrowLeftCircleFill} from 'react-icons/bs'
import './ServerOptions.css'

const ServerOptions = ({userId, serverId, serverName}) =>{
    const [showMenu, setShowMenu] = useState(false)


    const handleClick = () => {
        setShowMenu(!showMenu);
    }

    useEffect(() => {
        if(!showMenu) return

        const closeMenu = () => {
            setShowMenu(false);
        }
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    return (
    <>
    <div>
            <button onClick={handleClick} className='dropdown-arrow'>
                <div className='serv-title'>
                    {serverName}
                </div>
                <MdKeyboardArrowDown />

                </button>

            {showMenu && (
            <>
                <div className='server-options-dropdown'>
                    <ul style={{listStyle: 'none'}}  className='server-options'>
                        <li className='server-options-item'>Edit <IoSettingsSharp/></li>
                        {userId === serverId ? (
                            <li className='server-options-item delete-server'>Delete Server <RiDeleteBin5Fill/></li>

                        )
                        :
                        (
                            <li className='server-options-item leave-server'>Leave Server <BsArrowLeftCircleFill/> </li>
                        )
                        }

                    </ul>
                </div>

            </>
            )}

    </div>


    </>
    )

}

export default ServerOptions
