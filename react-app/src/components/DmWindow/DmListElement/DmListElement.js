import './DmListElement.css'

const DmListElement = ({dm}) =>{
    const handleClick = () =>{

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
