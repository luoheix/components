import React, { useState, useRef } from 'react';
import { Row, Col, Space, Button, Form } from 'antd';
import { useSize } from 'ahooks';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.less';

interface TableFilterHeaderProps {
  children: React.ReactElement | React.ReactElement[];
  onReset: () => void;
  onSearch: () => void;
  loading: boolean;
  isParent?: boolean;
}

const TableFilterHeader: React.FC<TableFilterHeaderProps> = ({
  children,
  onReset,
  onSearch,
  loading,
  isParent,
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const ref = useRef(null);
  const { width = 0 } = useSize(ref);

  // 响应式：父元素/浏览器
  const colProps = isParent
    ? (() => {
        switch (true) {
          case width > 900:
            return { span: 6 };
          case width > 650:
            return { span: 8 };
          case width > 450:
            return { span: 12 };
          default:
            return { span: 24 };
        }
      })()
    : { xs: 24, sm: 12, md: 8, lg: 8, xl: 6, xxl: 6 };

  const childrenList: React.ReactElement[] = {
    '[object Object]': [children] as any, // 一个子项
    '[object Array]': children as any, // 多个子项
  }[Object.prototype.toString.call(children)];

  return (
    <Row gutter={24} className={styles.tableFilterHeader} ref={ref}>
      {childrenList.map(
        (item, index) =>
          // 收起状态只展示前三个
          (!collapsed || index < 3) && (
            <Col key={item?.props?.name || item?.props?.label} {...colProps}>
              {item}
            </Col>
          ),
      )}
      <Col flex="auto" style={{ textAlign: 'right' }}>
        <Form.Item>
          <Space>
            <Button onClick={onReset}>重置</Button>
            <Button
              type="primary"
              onClick={onSearch}
              loading={loading && { delay: 200 }}
            >
              查询
            </Button>
            {/* 条件超过三个可展开 */}
            {childrenList?.length > 3 && (
              <a
                className={styles.collapse}
                onClick={() => setCollapsed(prev => !prev)}
              >
                {collapsed ? '展开' : '收起'}
                <DownOutlined
                  className={styles.downIcon}
                  style={{
                    transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                  }}
                />
              </a>
            )}
          </Space>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default TableFilterHeader;
