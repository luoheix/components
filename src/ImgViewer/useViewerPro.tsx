import React, { useReducer, useRef } from 'react';
import ReactDOM from 'react-dom';
import Viewer from 'react-viewer';
import { useUpdateEffect } from 'ahooks';

/**
 * 图片查看器 hooks
 */
export default (() => {
  interface ViewerState {
    visible: boolean;
    images: { src: string }[];
    index: number;
  }
  interface Action {
    type: 'open' | 'close';
    payload?: {
      images?: string[];
      index?: number;
    };
  }
  type ViewerReducer = (state: ViewerState, action: Action) => ViewerState;
  const initViewerState: ViewerState = {
    visible: false,
    images: [],
    index: 0,
  };

  const viewerReducer: ViewerReducer = (state, action): ViewerState => {
    const { images, index = 0 } = action.payload || {};
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

  return () => {
    const [state, dispatch] = useReducer(viewerReducer, initViewerState);
    const divRef = useRef<HTMLDivElement>(document.createElement('div'));

    // 清除查看器
    const remove = () => {
      ReactDOM.unmountComponentAtNode(divRef.current);
      if (divRef.current.parentNode) {
        divRef.current.parentNode.removeChild(divRef.current);
      }
    };

    useUpdateEffect(() => {
      if (state.visible) {
        document.body.appendChild(divRef.current);
        ReactDOM.render(
          <Viewer
            visible={true}
            onClose={() => {
              dispatch({ type: 'close' });
            }}
            images={state.images}
            activeIndex={state.index}
          />,
          divRef.current,
        );
      } else {
        remove();
      }

      return () => {
        remove();
      };
    }, [state.visible]);

    return {
      state,
      show: (payload: Action['payload']) => {
        dispatch({ type: 'open', payload });
      },
    };
  };
})();
