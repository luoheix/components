import { useReducer } from 'react';
/**
 * useViewer 定义
 */
interface ViewerState {
  visible?: boolean;
  images?: { src: string }[];
  index?: number;
}
interface Action {
  type: 'open' | 'close';
  payload?: Omit<ViewerState, 'images'> & { images?: string[] };
}
type ViewerReducer = (state: ViewerState, action: Action) => ViewerState;
const initViewerState: ViewerState = {
  visible: false,
  images: [],
  index: 0,
};
/**
 * 管理 react-viewer 状态
 */
const viewerReducer: ViewerReducer = (state, action): ViewerState => {
  const { images, index } = action.payload || {};
  switch (action.type) {
    case 'open':
      return {
        ...state,
        visible: true,
        images: (images || []).map(v => ({ src: v })),
        index,
      };
    case 'close':
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
};
export default () => useReducer(viewerReducer, initViewerState);
