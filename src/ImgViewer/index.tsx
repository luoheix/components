import React, { useReducer, useImperativeHandle } from 'react';
import Viewer from 'react-viewer';
import ViewerProps from 'react-viewer/lib/ViewerProps';

interface State {
  visible?: boolean;
  images?: string[];
  index?: number;
}
interface Action {
  type: 'open' | 'close';
  payload?: State;
}
type Reducer = (state: State, action: Action) => State;

const initState: State = {
  visible: false,
  images: [],
  index: 0,
};

const reducer: Reducer = (state, action): State => {
  const { images, index } = action.payload || {};
  switch (action.type) {
    case 'open':
      return {
        ...state,
        visible: true,
        images,
        index,
      };
    case 'close':
      return {
        ...state,
        visible: false,
        images: [],
        index: 0,
      };
    default:
      return state;
  }
};

export interface ViewerRef {
  preview: React.Dispatch<Action>;
}
const ImgViewer: React.ForwardRefRenderFunction<ViewerRef, ViewerProps> = (
  props,
  ref,
) => {
  const [state, dispatch] = useReducer(reducer, initState);

  useImperativeHandle(ref, () => ({
    preview: dispatch,
  }));

  return (
    <Viewer
      {...props}
      visible={state.visible}
      onClose={() => dispatch({ type: 'close' })}
      images={(state.images || []).map(v => ({ src: v }))}
      activeIndex={state.index}
    />
  );
};

export default React.forwardRef(ImgViewer);
