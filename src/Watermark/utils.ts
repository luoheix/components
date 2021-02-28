// 生成水印背景图地址
export const getCanvasUrl = (
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

/**
 * 因为安全原因 svg 需转译以便作为背景图使用，也可直接在浏览器中打开
 * 因为要保留 xvg 可读性，所以使用自定义方法进行转义
 */
export const svgToUrl = (str: string) => {
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
interface getSvgStrType {
  text?: string;
  width?: number;
  height?: number;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
}
export const getSvgStr = (options?: getSvgStrType) => {
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
