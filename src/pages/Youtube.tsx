import React, { useState } from 'react';
import '../App.css';

const Surprise = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
  };

  return (
    <div className="container-frame">
      <h1 className="header-frame">Click the button for a surprise!</h1>
      <button className="button-frame" onClick={handleClick}>Reveal Surprise</button>
      {show && (
        <div className="surprise-frame">
          🎉 Ta-da! Here's your surprise! 🎊
          <div className="video-grid-frame">
            <div className="video-box-frame">
              <iframe
                src="https://www.youtube.com/embed/zZFcNVKytrU?si=BFYv8qlDI81U91kD"
                title="YouTube video 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-box-frame">
              <iframe
                src="https://www.youtube.com/embed/OBLj8rJGTS4?si=5njDtdUlWD5oI0le"
                title="YouTube video 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-box-frame">
              <iframe
                src="https://www.youtube.com/embed/ENvOIjtTiPE?si=J_Cg0AXsF4yWuwuH"
                title="YouTube video 3"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-box-frame">
              <iframe
                src="https://www.youtube.com/embed/f8wRhgAIiMc?si=lX7SDBq-2XFXSzIm"
                title="YouTube video 4"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Surprise;
