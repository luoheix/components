/**
 * @Description: 文本超长后显示 ... 和 Tootip，否则不显示，父元素必须存在宽度
 */
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