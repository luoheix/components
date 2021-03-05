## Auto-tooltip

利用 ahooks-useSize + antd-Tooltip 实现超长显示 ““... + Tooltip”” 效果，父容器必须有宽度。  
文档地址：[利用 ahooks-useSize 实现超长 Tooltip 效果 · 黑熊君](https://www.yuque.com/luowenshuai/design/gk0oxc '利用 ahooks-useSize 实现超长 Tooltip 效果 · 黑熊君')

## 使用效果

```tsx
import React from 'react';
import { AutoTooltip } from 'luows-component';

export default () => (
  <div style={{ width: 150 }}>
    <AutoTooltip title="超过容器宽度，超过容器宽度，超过容器宽度" />
    <AutoTooltip title="未超过容器宽度" />
  </div>
);
```

## 组件实现

### index.tsx 文件

```tsx | pure
import React, { useRef } from 'react';
import { useSize } from 'ahooks';
import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd/lib/tooltip';
import styles from './index.less';

// 同 antd-tootip 的 props
const AutoTooltip: React.FC<TooltipProps> = (props) => {
  const { title = '' } = props;
  const fixedRef = useRef(null);
  const autoRef = useRef(null);
  const fixedSize = useSize(fixedRef);
  const autoSize = useSize(autoRef);
  const isTootip =
    !!autoSize?.width && !!fixedSize?.width && autoSize.width < fixedSize.width;
  return (
    <div className={styles.overflow}>
      <div className={styles.fixed} ref={fixedRef}>
        {title}
      </div>
      <Tooltip {...props} {...(isTootip ? {} : { visible: false })}>
        <div className={styles.auto} ref={autoRef}>
          {title}
        </div>
      </Tooltip>
    </div>
  );
};
export default AutoTooltip;
```

### index.less 文件

```less | pure
.overflow {
  position: relative;
  width: 100%;

  .fixed {
    position: fixed;
    visibility: hidden;
  }

  .auto {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
```
