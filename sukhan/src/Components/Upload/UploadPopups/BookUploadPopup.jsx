import React, { useState } from 'react';
import "./BookUploadPopup.scss"

const BookUploadPopup = () => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handleViewFile = () => {
    // display the image using a modal or lightbox
  };

  const handleUploadFile = () => {
    const formData = new FormData();
    formData.append('file', file);
    // send the file to a server using fetch or axios
  };

  return (
    <div className="BookUploadPopup">
    <div className="popup">
      <div className="popup-content">
        <form>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" value={description} onChange={handleDescriptionChange} />

          <label htmlFor="category">Choose Category:</label>
          <select id="category" value={category} onChange={handleCategoryChange}>
            <option value="">-- Select Category --</option>
            <option value="important">Important</option>
            <option value="urgent">Urgent</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>

          <label htmlFor="file">Choose File to Upload (Pdf only):</label>
          <input type="file" id="file" accept="pdf/*" onChange={handleFileChange} />

          {fileUrl && (
            <button type="button" className="view-file-button" onClick={handleViewFile}>
              View File
            </button>
          )}

          <button type="button" className="upload-file-button" onClick={handleUploadFile}>
            Upload File
          </button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default BookUploadPopup;
