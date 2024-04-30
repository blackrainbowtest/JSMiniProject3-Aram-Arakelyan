import { useCallback, useRef, useState } from "react";
import s from "./DragAndDropFileUpload.module.css";

export const DragAndDropFileUpload = ({ images, setImages }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const files = Array.from(e.dataTransfer.files);
        setImages((prevImages) => [...prevImages, ...files]);
      }
    },
    [setImages]
  );

  const handleChange = useCallback(
    (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
      }
    },
    [setImages]
  );

  const removeImage = useCallback(
    (index) => {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    },
    [setImages]
  );

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`${s.mainContainer} ${images.length ? "" : s.empty}`}
      onDragEnter={() => setDragActive(true)}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      {images.length > 0 &&
        images.map((image, index) => (
          <div key={index} className={s.imagesContainer}>
            <div className={s.imageWrapper}>
              <img
                src={URL.createObjectURL(image)}
                alt=''
                className={s.image}
              />
              <button
                className={s.deleteButton}
                onClick={() => removeImage(index)}
              >
                X
              </button>
            </div>
          </div>
        ))}

      <div
        className={`${s.dropArea} ${dragActive ? s.active : ""} ${
          images.length ? "" : s.empty
        }`}
        onDragEnter={() => setDragActive(true)}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className={s.icon}></div>
        <input
          type='file'
          multiple
          accept='image/*'
          value=''
          style={{ display: "none" }}
          onChange={handleChange}
          ref={fileInputRef}
        />
      </div>
    </div>
  );
};
