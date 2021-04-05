import React from 'react';
import { Modal } from 'antd';
import NavigationPrompt from 'react-router-navigation-prompt';

interface CustomPromptProProps {
  visible?: boolean;
  exclusion?: string[]; // 排除的路由列表
}

const CustomPromptPro: React.FC<CustomPromptProProps> = ({
  visible = true,
  exclusion,
}) => {
  return (
    <NavigationPrompt
      allowGoBack={true} // 后退前进也使用自定义
      when={(prevLocation, nextLocation) => {
        const { pathname = '' } = nextLocation || {};

        // 排除登录、exclusion 和当前地址
        const isExclusion =
          /^\/user\//.test(pathname) ||
          exclusion?.includes(pathname) ||
          prevLocation.pathname === pathname;
        return visible && !isExclusion;
      }}
    >
      {({ onConfirm, onCancel }) => (
        <Modal
          visible
          onOk={onConfirm}
          onCancel={onCancel}
          title="二次确认弹窗"
          maskClosable={false}
        >
          你确定要离开么？
        </Modal>
      )}
    </NavigationPrompt>
  );
};

export default CustomPromptPro;
