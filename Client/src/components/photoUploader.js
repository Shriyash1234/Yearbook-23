import React, { useState } from 'react';
import axios from 'axios';
import './CSS/profile3.css'
const PhotoUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [photoLink, setPhotoLink] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        alert('Please select a file');
        return;
      }

      setUploading(true);

      // Upload the file
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Get the photo link
      const link = response.data.link;
      setPhotoLink(link);
    } catch (error) {
      console.error('File size exceeds the limit(1MB)', error);
      alert('File size exceeds the limit(1MB)');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='upload-photo'>
      <input type="file" className="textField" onChange={handleFileChange} />
      <button className='buttonn' onClick={handleUpload} disabled={uploading}>
        Upload Photo
      </button>
      {uploading && <p className='uploading'>Uploading...</p>}
      {photoLink && (<p className='uploading'>Successfully uploaded</p>
      )}
    </div>
  );
};

export default PhotoUploader;
