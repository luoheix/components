import React, { useState } from 'react';
import { Row, Col, Space, Button, Form } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.less';

// 响应式
const colProps = { xs: 24, sm: 12, md: 8, lg: 8, xl: 6, xxl: 6 };

interface TableFilterHeaderProps {
  children: React.ReactElement | React.ReactElement[];
  onReset: () => void;
  onSearch: () => void;
  loading: boolean;
}

const TableFilterHeader: React.FC<TableFilterHeaderProps> = ({
  children,
  onReset,
  onSearch,
  loading,
}) => {
  const [collapsed, setCollapsed] = useState(true);

  const childrenList: React.ReactElement[] = {
    '[object Object]': [children] as any, // 一个子项
    '[object Array]': children as any, // 多个子项
  }[Object.prototype.toString.call(children)];

  return (
    <Row gutter={24} className={styles.tableFilterHeader}>
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
