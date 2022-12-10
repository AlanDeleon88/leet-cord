import React, { useState } from "react";
import './ServerForm.css'
import ReactTooltip from "react-tooltip"
const ImageUploadComponent = ({setServerIcon}) =>{
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [uploadedImg, setUploadImg] = useState(false);
    const [prevImgUrl, setPrevImgUrl] = useState("");
    const [errors, setErrors] = useState([])

    const handleSubmit = async (image) =>{
      // e.preventDefault();
      // console.log(image);
        const formData = new FormData();
            // aws uploads can be a bit slow—displaying
            // some sort of loading message is a good idea

        setImageLoading(true);

        formData.append("image", image);
        const res = await fetch("/api/img/upload", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
            const img_url = await res.json();
            setImageLoading(false);
            setServerIcon(img_url.url);
            setUploadImg(true);
            setPrevImgUrl(img_url.url);
            // console.log(img_url.url);
          } else if (res.status < 500){
            setImageLoading(false);
            // console.log(res);
            const error = []
            error.push('File not uploaded, an error occured')
            // setErrors(error)
            window.alert(error[0])
            // a real app would probably use more advanced
            // error handling
            // console.log("error");
          }

    }

    const updateImage = async (e) => {
        const file = e.target.files[0];
        handleSubmit(file);



      };

    return (
      <>
          {uploadedImg ? (
            <>
              <div data-tip={'upload an image'} data-for='image' data-place='center'>
              <button onClick={() =>{
                document.getElementById('file').click();
              }} style={{border:'none', backgroundColor:'transparent'}}>
                <img src={prevImgUrl} alt="your image" className="prev-img" />
              </button>

              </div>
              <div>
                  {errors.map((error, ind) => (
                    <div key={ind} className='error'>{error}</div>
                  ))}
              </div>
              <ReactTooltip id='image' />

            </>
          )
          :
          (
            <button className="img-place-holder" onClick={() =>{
              document.getElementById('file').click();
            }}>
             Upload Server Icon
            </button>
          )
          }
          <form onSubmit={handleSubmit} id='photo-form'>
            <div className="upload-photo-container">
              {imageLoading && <p>Loading...</p>}
              <input type="file" accept="image/*" onChange={updateImage} style={{display:'none'}} id='file'/>
              {/* <button type="submit" className="upload-img-btn">Upload</button> */}
            </div>
          </form>
        </>
      );
}

export default  ImageUploadComponent
