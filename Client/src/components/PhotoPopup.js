import React, { useState } from 'react';
import './CSS/photoPopup.css';
import * as AiIcons from 'react-icons/ai';

const PhotoPopup = ({ photoUrl, onClose }) => {
  const [isDarkened, setIsDarkened] = useState(false);

  const handleClick = () => {
    setIsDarkened(true);
    onClose();
  };

  const popupClassName = `photo-popup ${isDarkened ? 'darkened' : ''}`;

  return (
    <div className={popupClassName} onClick={handleClick}>
      <div className="photo-popup-content">
        <img src={photoUrl} alt="Enlarged Photo" />
        <button className="close-button" onClick={onClose}>
          <AiIcons.AiOutlineClose />
        </button>
      </div>
    </div>
  );
};

export default PhotoPopup;
