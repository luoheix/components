## Modal-prompt

基于 [Prompt](https://umijs.org/zh-CN/api#prompt) 离开页面时的二次确认弹窗, 不支持 `<a>` 标签跳转，可以使用 `history` 方法或 `Link` 组件跳转页面。

### 使用效果

```tsx
import React, { useState } from 'react';
import { history, Link } from 'umi';
import { Button } from 'antd';
import { ModalPrompt } from 'luows-component';

export default () => {
  const [isPrompt, setIsPrompt] = useState(true);
  return (
    <React.Fragment>
      <Button
        type={isPrompt ? 'primary' : 'default'}
        onClick={() => setIsPrompt(prev => !prev)}
      >{`点击切换（${isPrompt ? '拦截' : '不拦截'}）`}</Button>
      <br />
      <br />
      <h4>实例：</h4>
      <Button onClick={() => history.push('/')}>history 方法路由切换</Button>
      <br />
      <br />
      <Button onClick={() => history.goBack()}>history 方法路由后退</Button>
      <br />
      <br />
      <Link to="/">Link 标签跳转</Link>
      <br />
      <br />
      <a href="/">a 标签跳转（不支持）</a>
      {isPrompt && <ModalPrompt />}
    </React.Fragment>
  );
};
```

### 组件实现

```tsx | pure
import React, { useReducer } from 'react';
import { Prompt, history } from 'umi';
import { Modal } from 'antd';
import * as H from 'history';

interface State {
  visible: boolean;
  to?: string;
  action: H.Action;
}
interface Action {
  type: 'open' | 'close';
  payload?: Partial<State>;
}

const initState: State = {
  visible: false,
  to: undefined,
  action: 'PUSH',
};
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'open':
      return {
        ...state,
        visible: true,
        ...action.payload,
      };
    case 'close':
      return {
        ...state,
        visible: false,
        ...action.payload,
      };
    default:
      return state;
  }
};

interface ModalPromptProps {
  exclusion?: string[]; // 跳转路由排除列表
}

const ModalPrompt: React.FC<ModalPromptProps> = ({ exclusion }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <React.Fragment>
      <Prompt
        message={({ pathname, search }, action) => {
          dispatch({
            type: 'open',
            payload: { to: `${pathname}${search}`, action },
          });
          // 排除登录地址和 exclusion 地址
          const isExclusion =
            /^\/login\//.test(pathname) || exclusion?.includes(pathname);
          return isExclusion || state.visible;
        }}
      />
      <Modal
        title="二次确认弹窗"
        maskClosable={false}
        visible={state.visible}
        onCancel={() => dispatch({ type: 'close' })}
        onOk={() => {
          state.action === 'POP'
            ? history.goBack()
            : history[state.action.toLowerCase()](state.to);
        }}
      >
        你确定要离开么？
      </Modal>
    </React.Fragment>
  );
};

export default ModalPrompt;
```
