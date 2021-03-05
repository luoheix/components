import { Tree } from 'antd';
import styles from './index.less';

const treeMap = {
  'Calendar-manage': [
    {
      title: 'CalendarManage',
      key: 'CalendarManage',
      children: [
        { title: 'index.tsx', key: 'index.tsx', isLeaf: true },
        { title: 'index.less', key: 'index.less', isLeaf: true },
        { title: 'data.d.ts', key: 'data.d.ts', isLeaf: true },
        {
          title: 'CalendarHeader',
          key: 'CalendarHeader',
          children: [
            {
              title: 'index.tsx',
              key: 'CalendarHeader/index.tsx',
              isLeaf: true,
            },
            {
              title: 'index.less',
              key: 'CalendarHeader/index.less',
              isLeaf: true,
            },
          ],
        },
        {
          title: 'CalendarTable',
          key: 'CalendarTable',
          children: [
            {
              title: 'index.tsx',
              key: 'CalendarTable/index.tsx',
              isLeaf: true,
            },
            {
              title: 'index.less',
              key: 'CalendarTable/index.less',
              isLeaf: true,
            },
          ],
        },
      ],
    },
  ],
};

interface TreeProps {
  name: 'Calendar-manage' | 'Auto-tooltip';
}

export default ({ name }: React.FC<TreeProps>) => (
  <Tree.DirectoryTree
    className={styles['theme-tree']}
    showLine={{ showLeafIcon: false }}
    selectable={false}
    defaultExpandAll
    treeData={treeMap[name]}
  />
);
