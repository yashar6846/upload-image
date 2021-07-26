import React, { useState } from "react";

const UpImg = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "w4rmr6ys");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/qashqai/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    setImage(file.secure_url);
    setLoading(false);
  };
  return (
    <div>
      <h2>Upload Img</h2>
      <input
        type="file"
        name="file"
        placeholder="uploadImage"
        onChange={uploadImage}
      />
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <img src={image} style={{ width: "200px" }} />
      )}
    </div>
  );
};

export default UpImg;
