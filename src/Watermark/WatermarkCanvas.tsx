import React, { useState, useEffect } from 'react';
import Style from 'style-it';
import { getCanvasUrl } from './utils';

const WatermarkCanvas = () => {
  const [canvasUrl, setCanvasUrl] = useState('');

  useEffect(() => {
    setCanvasUrl(getCanvasUrl());
  }, []);

  return (
    <Style>
      {`
        .watermark {
          position:fixed;
          top:0;
          left:0;
          z-index:9999;
          width:100%;
          height:100%;
          opacity: 0.2;
          pointer-events:none;
          background-repeat:repeat;
          background-image:url('${canvasUrl}')
        }
      `}
      <div className="watermark"></div>
    </Style>
  );
};
export default WatermarkCanvas;
