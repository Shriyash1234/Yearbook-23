import React, { useEffect, useState } from 'react';
import Header from './header';
import Navbar from './sidebar';
import './CSS/memorylane.css'
import PhotoUploader from './photoUploader';
const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    var navTextElements = document.getElementsByClassName('nav-text');
    if (navTextElements.length > 1) {
    var secondNavTextElement = navTextElements[2];

    var aTag = secondNavTextElement.querySelector('a');

    if (aTag) {
        aTag.style.backgroundColor = '#0b1d26';
    }
    }
    fetchPhotos();
  }, []);

  
  const fetchPhotos = async () => {
    try {
      const response = await fetch('https://studentsiitgn.onrender.com/Yearbook23/photos');
      const fetchedPhotos = await response.json();
  
      // Add isLoaded property to each photo
      // const photosWithLoadingState = fetchedPhotos.map(photo => ({
      //   ...photo,
      //   isLoaded: false
      // }));
  
      setPhotos(fetchedPhotos);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };
  function toggleDisplay(){
    const ele = document.getElementsByClassName('upload-photo')[0]

    if(ele.style.display === 'none')
    {
        ele.style.display = 'flex'
    }
    else
    {
        ele.style.display = 'none'
    }
}

  const handleImageLoad = (photoId) => {
    setPhotos(prevPhotos => {
      return prevPhotos.map(photo => {
        if (photo.id === photoId) {
          return {
            ...photo,
            isLoaded: true
          };
        }
        return photo;
      });
    });
  };
  
  

  return (
    <div>
      <Header/>
      <Navbar/>
      <button className='toggleDisplay' onClick={toggleDisplay}>T</button>
      {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className='Memorylane'>
            <img className='MAPRC-Memorylane' src={require('../Assests/pictures/MAPRC-Memorylane2.jpg')}></img>
            <div id="gallery">
              {photos.map(photo => (
                <a target="_blank" href={photo.webViewLink}>
                <div key={photo.id}>
                  <img src={photo.thumbnailLink} />
                </div>
                </a>
              ))}
            </div>
            <PhotoUploader/>
          </div>
        )}

    </div>
  );
};

export default PhotoGallery;
