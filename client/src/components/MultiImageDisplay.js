import React, { useState } from 'react';

const CuteSingleImageTabs = ({ images }) => {
  const [activeTab, setActiveTab] = useState(0);

  const pastelColors = [
    '#fce7f3', // pink
    '#ede9fe', // purple
    '#e0f2fe', // blue
    '#dcfce7', // green
    '#fef9c3'  // yellow
  ];

  const containerStyle = {
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#fdf2f8',
    borderRadius: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const tabsContainerStyle = {
    display: 'flex',
    overflowX: 'auto',
    marginBottom: '16px',
    paddingBottom: '8px',
  };

  const tabStyle = (index) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    marginRight: '8px',
    borderRadius: '9999px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s',
    backgroundColor: activeTab === index ? '#ec4899' : 'white',
    color: activeTab === index ? 'white' : '#ec4899',
  });

  const heartStyle = {
    marginRight: '4px',
    width: '16px',
    height: '16px',
  };

  const imageContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '500px',
    overflow: 'hidden',
    borderRadius: '16px',
    backgroundColor: pastelColors[activeTab % pastelColors.length],
  };

  const imageStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  };

  return (
    <div style={containerStyle} className="cute-image-tabs">
      <div style={tabsContainerStyle} className="cute-image-tabs-nav">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={tabStyle(index)}
            className="cute-image-tab"
          >
            
            {index + 1}
          </button>
        ))}
      </div>
      <div style={imageContainerStyle} className="cute-image-container">
        <img
          src={images[activeTab]}
          alt={`Cute Image ${activeTab + 1}`}
          style={imageStyle}
          className="cute-image"
        />
      </div>
    </div>
  );
};

export default CuteSingleImageTabs;