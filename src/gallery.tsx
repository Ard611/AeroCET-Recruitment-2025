import React, { useEffect, useState } from 'react';
import './gallery.css';

const Gallery: React.FC = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=2&limit=6')
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error('Failed to fetch images:', err));
  }, []);

  return (
    <div className="gallery-page">
      <h2>🖼️ Image Gallery</h2>
      <div className="image-grid">
        {images.map((img: any) => (
          <div key={img.id} className="image-card">
            <img src={img.download_url} alt={img.author} />
            <p>{img.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
