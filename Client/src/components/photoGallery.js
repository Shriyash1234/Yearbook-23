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
      const response = await fetch('/Yearbook23/photos');
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
      {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className='Memorylane'>
            <div id="gallery">
              {photos.map(photo => (
                <div key={photo.id}>
                  <img src={photo.thumbnailLink} />
                </div>
              ))}
            </div>
            <PhotoUploader/>
          </div>
        )}

    </div>
  );
};

export default PhotoGallery;
