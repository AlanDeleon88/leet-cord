import React, { useState } from "react";
import './AddServerForm.css'
const ImageUploadComponent = ({setServerIcon}) =>{
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [uploadedImg, setUploadImg] = useState(false);
    const [prevImgUrl, setPrevImgUrl] = useState("");

    const handleSubmit = async (image) =>{
      // e.preventDefault();
      console.log(image);
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
          } else {
            setImageLoading(false);
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
            <img src={prevImgUrl} alt="your image" className="prev-img" />
          )
          :
          (
            <div className="img-place-holder">
             Server Icon

            </div>
          )
          }
          <form onSubmit={handleSubmit} id='photo-form'>
            <div className="upload-photo-container">
              {imageLoading && <p>Loading...</p>}
              <input type="file" accept="image/*" onChange={updateImage} />
              {/* <button type="submit" className="upload-img-btn">Upload</button> */}
            </div>
          </form>
        </>
      );
}

export default  ImageUploadComponent
