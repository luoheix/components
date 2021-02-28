import WatermarkSvg from './WatermarkSvg';
import WatermarkCanvas from './WatermarkCanvas';
import { svgToUrl, getSvgStr } from './utils';

export default {
  Canvas: WatermarkCanvas,
  Svg: WatermarkSvg,
  getSvgUrl: () => svgToUrl(getSvgStr()),
};
