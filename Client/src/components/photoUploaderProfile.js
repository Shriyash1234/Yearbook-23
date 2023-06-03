import React, { useState } from 'react';
import axios from 'axios';
import './CSS/profile3.css'
const PhotoUploaderProfile = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [photoLink, setPhotoLink] = useState('')
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        alert('Please select a file');
        return;
      }
      const name = document.getElementById('students-field-name').value;
      const bio = document.getElementById('students-field-message').value;
      const email = document.getElementById('students-field-mailAddress').value;

      if (!email) {
        alert('Please enter an email');
        return;
      }
      if (!name) {
        alert('Please enter a name');
        return;
      }
      if (!bio) {
        alert('Please enter a bio.');
        return;
      }
      setUploading(true);
      // Upload the file
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('email', email);
      formData.append('name', name);
      formData.append('bio', bio);
      const response = await axios.post('https://studentsiitgn.onrender.com/addProfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Get the photo link
      const link = response.data.link;
      setPhotoLink(link);
    } catch (error) {
      console.error('File size exceeds the limit(1MB)', error);
      alert('Profile added successfully');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='upload-photo-message'>
    <form method="post" id="message-form">
        <input type="file" className="textField" onChange={handleFileChange} />
        <div className="input-fields">
          <input type="text" name="name" id="students-field-name" placeholder="Your Name" value={name} onChange={handleNameChange} />
          <input type="text" name="mailAddress" id="students-field-mailAddress" placeholder="Your Email" value={email} onChange={handleEmailChange} />
        </div>
        <input type="text" name="bio" id="students-field-message" placeholder="Add Bio" value={bio} onChange={handleBioChange}></input>
        <div className="submit-btn">
          <button className="buttonn" onClick={handleUpload} disabled={uploading}>
            Submit
          </button>
        </div>
    </form>
  
      {uploading && <p className='uploading'>Uploading...</p>}
      {photoLink && (<p className='uploading'>Successfully uploaded</p>
      )}
    </div>
  );
};

export default PhotoUploaderProfile;
