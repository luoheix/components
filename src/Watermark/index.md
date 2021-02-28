## Watermark

利用 canvas 和 svg 实现页面水印效果。  
文档地址：[利用 canvas / svg 实现水印 · 黑熊君](https://www.yuque.com/luowenshuai/design/watermark '利用 canvas / svg 实现水印 · 黑熊君')

### canvas 实现

- 利用 canvas 标签生成图片，作为页面元素的背景图来实现水印效果；

### svg 实现（更简单、性能更高）

- 生成 svg 标签，直接作为页面元素的背景图来实现水印效果；
- 特点：无需生成图片，可直接内嵌在 html 中或直接作为背景图使用；

## 使用效果

```tsx
import React, { Fragment, useState } from 'react';
import { Button } from 'antd';
import { Watermark } from 'luows-component';

const waterCanvasDom = <Watermark.Canvas />;
const waterSvgDom = <Watermark.Svg />;

export default () => {
  const [isWaterCanvas, setIsWaterCanvas] = useState(false);
  const [isWaterSvg, setIsWaterSvg] = useState(false);

  const onChangeCanvas = () => {
    setIsWaterCanvas(prev => !prev);
  };

  const onChangeSvg = () => {
    setIsWaterSvg(prev => !prev);
  };

  return (
    <Fragment>
      <Button onClick={onChangeCanvas}>
        {isWaterCanvas ? '移除 Canvas 水印' : '添加 Canvas 水印'}
      </Button>
      {isWaterCanvas ? waterCanvasDom : null}
      <Button style={{ marginLeft: 12 }} onClick={onChangeSvg}>
        {isWaterSvg ? '移除 Svg 水印' : '添加 Svg 水印'}
      </Button>
      {isWaterSvg ? waterSvgDom : null}
    </Fragment>
  );
};
```

## 组件实现

### canvas 实现

```tsx | pure
import React, { useState, useEffect } from 'react';
import Style from 'style-it';

// 生成水印背景图地址
const getCanvasUrl = (
  text = '用户名用户名',
  width = 500,
  height = 300,
  fontSize = 28,
  color = 'rgb(128,128,128)',
) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  if (context) {
    context.font = fontSize + 'px Arial';
    context.fillStyle = color;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.rotate((Math.PI / 180) * -30);
    context.fillText(`${new Date().toLocaleDateString()} ${text}`, 130, 250);
  }
  return canvas.toDataURL('image/png');
};

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
```

### svg 实现

```tsx | pure
import React, { useState, useEffect } from 'react';

/**
 * 因为安全原因 svg 需转译以便作为背景图使用，也可直接在浏览器中打开
 * 因为要保留 xvg 可读性，所以使用自定义方法进行转义
 */
const svgToUrl = (str: string) => {
  return `data:image/svg+xml,${str
    .replace(/\n/g, '')
    .replace(/<!--(.*)-->/g, '') // 必须去掉注释
    .replace(/[\r\n]/g, ' ') // 最好去掉换行
    .replace(/"/g, "'") // 单引号是保留字符，双引号改成单引号减少编码
    .replace(/%/g, '%25')
    .replace(/&/g, '%26')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')}`;
};
/**
 * 生成 svg 字符串
 * @param {object} options 参数
 * text 水印文字
 * <text> 属性（x y transform） 方向位置按需调整
 * <svg> 中fill属性决定字体颜色
 */
interface getCanvasUrlType {
  text?: string;
  width?: number;
  height?: number;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
}
const getCanvasUrl = (options?: getCanvasUrlType) => {
  const {
    text = `${new Date().toLocaleDateString()} Svg生成水印`,
    width = 500,
    height = 300,
    fontSize = 28,
    color = 'rgb(128,128,128)',
    fontFamily = 'inherit',
  } = options || {};
  return `<svg
    width="${width}"
    height="${height}"
    fill="${color}"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="38%"
      y="77%"
      transform="rotate(-30, 100 100)"
      font-size="${fontSize}"
      font-family="${fontFamily}"
      text-anchor="middle"
      dominant-baseline="middle"
    >${text}</text>
  </svg>`;
};

const WatermarkSvg = () => {
  const [svgUrl, setSvgUrl] = useState('');

  useEffect(() => {
    const newSvgUrl = svgToUrl(getCanvasUrl());
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
```
