## Table-filter-header

响应式表格搜索头部，超过三个表单显示展开收起按钮。

## 使用效果

```tsx
import React, { useState } from 'react';
import { Form, Select, Input, DatePicker } from 'antd';
import { TableFilterHeader } from 'luows-component';

const { RangePicker } = DatePicker;

export default () => {
  const [loading, setLoading] = useState(false);

  const onSearch = () => {
    setLoading(true);
    console.log('查询');
    setTimeout(() => {
      console.log('查询完成');
      setLoading(false);
    }, 1000);
  };

  const onReset = () => {
    console.log('重置');
    onSearch();
  };

  return (
    <Form>
      {/* 只有一个表单 */}
      <div style={{ padding: 10 }}>
        <h3>// 只有一个表单</h3>
        <TableFilterHeader
          onReset={onReset}
          onSearch={onSearch}
          loading={loading}
          isParent={true}
        >
          <Form.Item label="Field A">
            <Input placeholder="请输入" />
          </Form.Item>
        </TableFilterHeader>
      </div>

      {/* 不超过三个表单 */}
      <div style={{ padding: 10 }}>
        <h3>// 不超过三个表单</h3>
        <TableFilterHeader
          onReset={onReset}
          onSearch={onSearch}
          loading={loading}
          isParent={true}
        >
          <Form.Item label="Field A">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="Field B">
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Field C">
            <Select placeholder="请选择">
              <Select.Option value="1">选项一</Select.Option>
              <Select.Option value="2">选项二</Select.Option>
              <Select.Option value="3">选项三</Select.Option>
            </Select>
          </Form.Item>
        </TableFilterHeader>
      </div>

      {/* 超过三个表单，拥有展开收起按钮 */}
      <div style={{ padding: 10 }}>
        <h3>// 超过三个表单，拥有展开收起按钮</h3>
        <TableFilterHeader
          onReset={onReset}
          onSearch={onSearch}
          loading={loading}
          isParent={true}
        >
          <Form.Item label="Field A">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="Field B">
            <Select placeholder="请选择">
              <Select.Option value="1">选项一</Select.Option>
              <Select.Option value="2">选项二</Select.Option>
              <Select.Option value="3">选项三</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Field C">
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Field D">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="Field E">
            <Input placeholder="请输入" />
          </Form.Item>
        </TableFilterHeader>
      </div>
    </Form>
  );
};
```

## 组件实现

### index.tsx 文件

```tsx | pure
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
```

### index.less 文件

```
.tableFilterHeader {
  :global {
    .ant-col .ant-form-item-control {
      overflow: hidden;
    }
  }

  .collapse {
    margin-left: 8px;

    .downIcon {
      margin-left: 8px;
      transition: 0.3s;
    }
  }
}
```
