import React, { useState, useEffect } from 'react';
import { svgToUrl, getSvgStr } from './utils';

const WatermarkSvg = () => {
  const [svgUrl, setSvgUrl] = useState('');

  useEffect(() => {
    const newSvgUrl = svgToUrl(getSvgStr());
    setSvgUrl(newSvgUrl);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        width: '100%',
        height: '100%',
        opacity: 0.2,
        pointerEvents: 'none',
        background: `url("${svgUrl}") repeat`,
      }}
    />
  );
};
export default WatermarkSvg;
