## Custom-prompt-pro

基于 [react-router-navigation-prompt](https://github.com/ZacharyRSmith/react-router-navigation-prompt) 离开页面时的二次确认弹窗,。  
优点：

- 点击确认后不用手动控制跳转事件
- 支持刷新和浏览器地址直接切换
- 支持 `<a>` 标签跳转过来的页面和跳出的页面

缺点

- 只能自定义切换页面弹窗，离开页面使用的是浏览器默认弹窗

### 使用效果

```tsx
import React, { useState } from 'react';
import { history, Link } from 'umi';
import { Button } from 'antd';
import { CustomPromptPro } from 'luows-component';

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
      <Button onClick={() => history.goBack()}>
        history 方法路由后退，需是离开当前页面才生效
      </Button>
      <br />
      <br />
      <Link to="/">Link 标签跳转</Link>
      <br />
      <br />
      <Link to="/watermark">
        <Button>排除 "/watermark" 地址</Button>
      </Link>
      <br />
      <br />
      <a href="/">{`<a>`} 标签跳转</a>
      <CustomPromptPro exclusion={['/watermark']} visible={isPrompt} />
    </React.Fragment>
  );
};
```

### 组件实现

```tsx | pure
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
```
