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

interface CustomPromptProps {
  exclusion?: string[]; // 跳转路由排除列表
}

const CustomPrompt: React.FC<CustomPromptProps> = ({ exclusion }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <React.Fragment>
      <Prompt
        message={({ pathname, search }, action) => {
          // 排除登录地址、exclusion 地址和当前地址
          const isExclusion =
            /^\/login\//.test(pathname) ||
            exclusion?.includes(pathname) ||
            history.location.pathname === pathname;

          !isExclusion &&
            dispatch({
              type: 'open',
              payload: { to: `${pathname}${search}`, action },
            });

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

export default CustomPrompt;
