import React, { useState } from "react";

const Profile = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handlePic = (e) => {
    const Pic = e.target.files[0];
    setFile(Pic);
  };
  const handleUpload = () => {
    // https://api.cloudinary.com/v1_1/qashqai/image/upload
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "w4rmr6ys");
    setUploading(true);
    fetch("https://api.cloudinary.com/v1_1/qashqai/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setImages((images) => [...images, res.secure_url]);
        setUploading(false);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="">
      <h1>Cloudinary upload</h1>
      <input type="file" onChange={handlePic} />
      <button onClick={handleUpload}>Upload</button>
      <div>
        {uploading && <p>uploading</p>}
        {images.map((image) => (
          <img src={image} key={image} alt="" />
        ))}
      </div>
    </div>
  );
};

export default Profile;
