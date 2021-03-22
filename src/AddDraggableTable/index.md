## Add-draggable-table

可拖拽、可增删动态表格
文档地址：[antd 可拖拽、可增删动态表格 · 黑熊君](https://www.yuque.com/luowenshuai/design/rgrbhf 'antd 可拖拽、可增删动态表格 · 黑熊君')

## 使用效果

```tsx
import React from 'react';
import { Form, Button, Input, InputNumber, Table } from 'antd';
import { useDynamicList } from 'ahooks';
import { DragOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import ReactDragListView from 'react-drag-listview';

interface TableItem {
  name?: string;
  age?: string;
  memo?: string;
}

const AddDraggableTable = () => {
  const [form] = Form.useForm();
  const { list, remove, getKey, move, push, sortForm } = useDynamicList<
    TableItem
  >([
    { name: '张三', age: '23', memo: '我是张三' },
    { name: '李四', age: '21', memo: '我是李四' },
    {},
  ]);

  const columns: ColumnProps<TableItem>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      render: (text, row, index) => (
        <Form.Item
          name={['formListData', getKey(index), 'name']}
          initialValue={text}
        >
          <Input style={{ width: 100 }} placeholder="请输入名称" />
        </Form.Item>
      ),
    },
    {
      title: '年龄',
      dataIndex: 'age',
      render: (text, row, index) => (
        <Form.Item
          name={['formListData', getKey(index), 'age']}
          initialValue={text}
        >
          <InputNumber
            style={{ width: 100 }}
            placeholder="请输入年龄"
            min={0}
            precision={0}
          />
        </Form.Item>
      ),
    },
    {
      title: '备注',
      dataIndex: 'memo',
      render: (text, row, index) => (
        <Form.Item
          name={['formListData', getKey(index), 'memo']}
          initialValue={text}
        >
          <Input style={{ width: 100 }} placeholder="请输入备注" />
        </Form.Item>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, row, index) => (
        <Button.Group>
          <Button danger onClick={() => remove(index)}>
            删除
          </Button>
          <Button
            data-drag="draged"
            style={{ cursor: 'move', marginLeft: 10 }}
            icon={<DragOutlined />}
          />
        </Button.Group>
      ),
    },
  ];

  // 提交
  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        // values.formListData：数据正确顺序错误的列表
        // list：数据错误顺序正确的列表
        // sortForm：将 formListData 根据 list 顺序排序生成正确的有序列表
        console.log(
          '数据正确顺序错误：',
          values,
          '数据错误顺序正确：',
          list,
          '数据和顺序都正确：',
          sortForm(values.formListData),
        );
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  return (
    <Form form={form}>
      <ReactDragListView
        onDragEnd={(oldIndex: number, newIndex: number) =>
          move(oldIndex, newIndex)
        }
        handleSelector={'button[data-drag="draged"]'} // 根据标签属性绑定可拖拽 dom
      >
        <Table
          columns={columns}
          dataSource={list}
          rowKey={(r, index: any) => getKey(index).toString()}
          pagination={false}
        />
      </ReactDragListView>
      <Button
        style={{ marginTop: 8 }}
        block
        type="dashed"
        onClick={() => push({ name: '新增', age: '25' })}
      >
        + 新增一行
      </Button>
      <Button type="primary" style={{ marginTop: 16 }} onClick={onSubmit}>
        提交
      </Button>
    </Form>
  );
};

export default AddDraggableTable;
```
