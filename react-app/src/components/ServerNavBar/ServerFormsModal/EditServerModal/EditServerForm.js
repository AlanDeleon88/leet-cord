import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HiPencilSquare } from "react-icons/hi2";
import './EditServerForm.css'
import { getUserId } from "../../../../store/user";
import { updateServerIcon, updateServerName, updateServerDesc } from "../../../../store/focusServer";

const EditServerForm = ({server, setShowModal}) =>{
    const user = useSelector(state => state.session.user)
    const owner = useSelector(state => state.serverUser)
    const [name, setName] = useState('')
    const [inputtedName, setInputtedName] = useState(false)

    const [description, setDescription] = useState('')
    const [inputtedDesc, setInputtedDesc] = useState(false)

    const [serverIcon, setServerIcon] = useState('')
    const [servIconName, setServIconName] = useState('')

    const [isLoaded, setIsLoaded] = useState(false)
    const [imgLoading, setImgLoading] = useState(false)
    const [myServer, setMyServer] = useState(false)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();



    useEffect(() =>{

        let servNameArr = server.name.split('')
        servNameArr = servNameArr.filter(el =>{
            if(el !== ' '){
                return true
            }
            else{
                return false
            }
        })
        setServIconName(servNameArr[0]);
    })

    useEffect(() =>{
        dispatch(getUserId(server.owner_id)).then(() =>{
            setIsLoaded(true)
        })
    },[dispatch])

    useEffect(() =>{
        if(user.id === server.owner_id){
            setMyServer(true)
        }
    })

    const handleSave = (e) =>{
        const serverUpdate = {
            id: server.id,
            name: name,
            description: description,
            server_icon : serverIcon
        }
        console.log('SERVER UPDATE OBJ!!!',serverUpdate);
        let err = []
        if(serverUpdate.name){
            dispatch(updateServerName(serverUpdate, user.id)).then((res)=>{
                err.push(res)
                console.log(res);
            })
        }
        if(serverUpdate.description){
            dispatch(updateServerDesc(serverUpdate, user.id)).then((res)=>{
                err.push(res)
            })
        }
        if(serverUpdate.server_icon){
            dispatch(updateServerIcon(serverUpdate, user.id)).then((res)=>{
                err.push(res)
            })
        }
        // console.log('ERRORS', err);
        if(err.length > 0){
            setErrors(err)
            console.log(err);
        }
        else {
            window.alert('settings saved')
        }
    }

    const updateName = (e) => {
        setName(e.target.value)
        setInputtedName(true)
    }
    const updateDescription = (e) =>{
        setDescription(e.target.value)
        setInputtedDesc(true)
    }
    const refreshServerIcon = (e) =>{
        setServerIcon(e.target.value)
    }

    const handleSubmit = async (image) =>{
        // e.preventDefault();

        console.log(image);
          const formData = new FormData();
              // aws uploads can be a bit slow—displaying
              // some sort of loading message is a good idea
          setImgLoading(true)
          formData.append("image", image);
          const res = await fetch("/api/img/upload", {
            method: "POST",
            body: formData,
          });
          if (res.ok) {

              const img_url = await res.json();
              const serverUpdate = {
                id: server.id,
                name: name,
                description: description,
                server_icon : img_url.url
            }
              setImgLoading(false)
              setServerIcon(img_url.url);
              //!dispatch here
              //! temp dispatch, will implement it in the save button later.

            }
      }

    const updateImage = (e) =>{
        const file = e.target.files[0];
        handleSubmit(file);
    }

    return (
        <>
            <div className="server-info-container">

                <div className="sub-input-container">
                    <div className="icon-owner-container">
                        {server.server_icon ?
                            (
                            <>
                               {imgLoading ?
                                (
                                    <div className="default-prev-icon">
                                        LOADING
                                    </div>
                                )
                                :
                                (
                                    <img src={`${serverIcon ? serverIcon : server.server_icon}`} className='prev-server-icon'/>
                                )
                                }
                                <button className="edit-icon-button"
                                onClick={() =>
                                    {
                                        document.getElementById('file').click()
                                    }}>
                                    <HiPencilSquare />
                                 </button>

                                {myServer && (
                                    <>
                                        <input type="file" accept="image/*" onChange={updateImage} style={{display:'none'}} id='file'/>
                                    </>
                                )}
                            </>
                            )

                            :

                            (
                            <>
                                {imgLoading ?
                                (
                                    <div className="default-prev-icon" >
                                        LOADING
                                    </div>
                                )
                                :
                                (
                                <>
                                {serverIcon ?
                                    (<>
                                        <img src={serverIcon} className='prev-server-icon'/>
                                    </>
                                    )
                                    :
                                    (<>
                                         <div className="default-prev-icon">
                                             {servIconName}
                                        </div>
                                     </>
                                    )}
                                </>
                                )
                                }
                                <button style={{border:'none'}} className="edit-icon-button" onClick={() =>{
                                    document.getElementById('file').click()
                                 }}>
                                     <HiPencilSquare />
                                 </button>
                                {myServer && (
                                    <>
                                         <input type="file" accept="image/*" onChange={updateImage} style={{display:'none'}} id='file'/>
                                    </>
                                )}

                            </>
                        )
                    }

                    <div className="server-owner">
                        <div>
                            Server Owner
                        </div>
                        {isLoaded && (
                            <>
                                {owner.username}
                            </>
                        )}
                    </div>

                    </div>
                    <div className="name-desc-container">
                        {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                         ))}
                        <div className="edit-server name-input">
                            <label style={{color:'whitesmoke', fontSize:'40px'}}>
                                Server name
                            </label>
                            <input className="edit-text-input" type='text' value={inputtedName ? name : server.name} onChange={updateName}/>
                        </div>

                        <div className='edit-server desc-input'>
                            <label style={{color:'whitesmoke', fontSize:'40px'}}>
                                Description
                            </label>
                            <textarea className="edit-text-input" type='text' value={inputtedDesc? description : server.description} onChange={updateDescription}/>
                        </div>

                    </div>

                </div>

                <div className="edit-button-container">
                    <button className='save button-edit' onClick={handleSave}>Save</button>
                    <button className='back button-edit' onClick={(() => setShowModal(false))}>Back</button>
                </div>

            </div>


        </>
    )

}

export default EditServerForm
