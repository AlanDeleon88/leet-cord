import {useState, useEffect} from 'react';
import {MdKeyboardArrowDown} from 'react-icons/md'
import {IoSettingsSharp} from 'react-icons/io5'
import { RiDeleteBin5Fill} from "react-icons/ri";
import {BsArrowLeftCircleFill} from 'react-icons/bs'
import EditServerForm from '../../ServerNavBar/ServerFormsModal/EditServerModal/EditServerForm';
import DeleteServer from '../../DeleteServerModal/DeleteServer';
import LeaveServerWindow from '../../LeaveServerModal';

import './ServerOptions.css'
import { Modal } from '../../../context/Modal';

const ServerOptions = ({userId, serverId, server}) =>{
    const [showMenu, setShowMenu] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showLeaveModal, setShowLeaveModal] = useState(false)


    const handleClick = () => {
        setShowMenu(!showMenu);
    }

    const clickShowMenuModal = e =>{
        setShowModal(!showModal)
    }

    const clickShowDeleteModal = e =>{
        setShowDeleteModal(!showModal)
    }

    const clickShowLeaveModal = e =>{
        setShowLeaveModal(true)
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
    <div className='option-container'>
            <button onClick={handleClick} className='dropdown-arrow'>
                <div className='serv-title'>
                    {server.name}
                </div>
                <MdKeyboardArrowDown />

                </button>

            {showMenu && (
            <>
                <div className='server-options-dropdown'>
                    <ul style={{listStyle: 'none'}}  className='server-options'>
                        {userId === server.owner_id ? (
                            <>
                            <li className='server-options-item' onClick={clickShowMenuModal}>
                                Edit
                                <IoSettingsSharp />

                            </li>
                            <li className='server-options-item delete-server' onClick={clickShowDeleteModal}>Delete Server <RiDeleteBin5Fill/></li>

                            </>

                        )
                        :
                        (
                            <li className='server-options-item leave-server' onClick={clickShowLeaveModal}> Leave Server <BsArrowLeftCircleFill/> </li>
                        )
                        }

                    </ul>
                </div>

            </>
            )}
            {showModal && (
                <Modal onClose={() =>{
                    setShowModal(false)
                }}>
                    <EditServerForm server={server} setShowModal={setShowModal}/>
                </Modal>

            )}
            {showDeleteModal && (
                <Modal onClose={() =>{
                setShowDeleteModal(false)
                }}>
                    <DeleteServer id={server.id} setShowDeleteModal={setShowDeleteModal}/>
                </Modal>
            )}
            {showLeaveModal &&
                <Modal onClose={()=>{
                    setShowLeaveModal(false)
                }}>
                    <LeaveServerWindow server={server} setShowLeaveModal={setShowLeaveModal}/>
                </Modal>

            }
    </div>


    </>
    )

}

export default ServerOptions
