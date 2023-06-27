import React, { useState } from 'react';
import axios from 'axios';
import './CSS/profile3.css'
const PhotoUploaderMessages = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [photoLink, setPhotoLink] = useState('');
  const [email, setEmail] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
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
      formData.append('email', email);
      const response = await axios.post('https://studentsiitgn.onrender.com/uploadMessageImg/'+props.mail, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Get the photo link
      const link = response.data.link;
      setPhotoLink(link);
    } catch (error) {
      console.error('File size exceeds the limit(1MB)', error);
      alert('Successfully uploaded');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='upload-photo-message'>
    <form method='post' id='message-form' className='juinor-response'>
      <input type="file" className="textField" onChange={handleFileChange} />
      <input type='text' name='email' id='email' style={{display:'none'}} onChange={handleEmailChange} value={props.mail}></input>
      <button className='buttonn' onClick={handleUpload} disabled={uploading}>
        Upload Photo
      </button>
    </form>  
      {uploading && <p className='uploading'>Uploading...</p>}
      {photoLink && (<p className='uploading'>Successfully uploaded</p>
      )}
    </div>
  );
};

export default PhotoUploaderMessages;
