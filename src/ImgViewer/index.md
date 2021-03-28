## Img-viewer

基于 react-viewer 的统一图片查看器。

- 缺点：需要引入并组件、定义传入 ref 和调用预览方法，基本属于过度封装。（组件显得没必要使用）
- 唯一优点：不需要管理 visible、images、index 状态。
  <!-- 文档地址：[响应式表格搜索头部 ts + hooks · 黑熊君](https://www.yuque.com/luowenshuai/design/ygflai '响应式表格搜索头部 ts + hooks · 黑熊君') -->

### 使用效果

```tsx
import React, { useRef } from 'react';
import { ImgViewer, ViewerRef } from 'luows-component';

export default () => {
  const viewerRef = useRef<ViewerRef>(null);

  const imgList = [
    'https://6865-heixongjun-ok4ws-1302448573.tcb.qcloud.la/personalBlog/xiongzhua.png',
    'https://6865-heixongjun-ok4ws-1302448573.tcb.qcloud.la/personalBlog/xiong.png',
  ];

  return (
    <React.Fragment>
      <div>
        {imgList.map((item, index) => (
          <img
            key={index}
            src={item}
            onClick={() => {
              viewerRef.current?.preview({
                type: 'open',
                payload: { images: imgList, index },
              });
            }}
          />
        ))}
      </div>
      <ImgViewer ref={viewerRef} />
    </React.Fragment>
  );
};
```

### 组件实现

```tsx | pure
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
```

## Use-viewer

基于 react-viewer 的统一图片查看器 hooks, 帮助管理图片查看器状态。

  <!-- 文档地址：[响应式表格搜索头部 ts + hooks · 黑熊君](https://www.yuque.com/luowenshuai/design/ygflai '响应式表格搜索头部 ts + hooks · 黑熊君') -->

### 使用效果

```tsx
import React, { useRef } from 'react';
import Viewer from 'react-viewer';
import { useViewer } from 'luows-component';

export default () => {
  const [state, dispatch] = useViewer();
  const imgList = [
    'https://6865-heixongjun-ok4ws-1302448573.tcb.qcloud.la/personalBlog/xiongzhua.png',
    'https://6865-heixongjun-ok4ws-1302448573.tcb.qcloud.la/personalBlog/xiong.png',
  ];

  return (
    <React.Fragment>
      <div>
        {imgList.map((item, index) => (
          <img
            key={index}
            src={item}
            onClick={() => {
              dispatch({
                type: 'open',
                payload: {
                  images: imgList,
                  index,
                },
              });
            }}
          />
        ))}
      </div>
      <Viewer
        visible={state.visible}
        onClose={() => dispatch({ type: 'close' })}
        images={state.images}
        activeIndex={state.index}
      />
    </React.Fragment>
  );
};
```

### 方法实现

```ts | pure
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
```
