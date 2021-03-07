import { Tree } from 'antd';
import styles from './index.less';

const treeMap = {
  // 日历管理目录树
  'Calendar-manage': [
    {
      title: 'CalendarManage',
      key: 'CalendarManage',
      selectable: false,
      children: [
        {
          title: 'index.tsx',
          key: 'indextsx-文件',
          isLeaf: true,
        },
        {
          title: 'index.less',
          key: 'indexless-文件',
          isLeaf: true,
        },
        {
          title: 'data.d.ts',
          key: 'datadts-文件',
          isLeaf: true,
        },
        {
          title: 'CalendarHeader',
          key: 'CalendarHeader',
          selectable: false,
          children: [
            {
              title: 'index.tsx',
              key: 'calendarheaderindextsx-文件',
              isLeaf: true,
            },
            {
              title: 'index.less',
              key: 'calendarheaderindexless-文件',
              isLeaf: true,
            },
          ],
        },
        {
          title: 'CalendarTable',
          key: 'CalendarTable',
          selectable: false,
          children: [
            {
              title: 'index.tsx',
              key: 'calendartableindextsx-文件',
              isLeaf: true,
            },
            {
              title: 'index.less',
              key: 'calendartableindexless-文件',
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

const DirectoryTree: React.FC<TreeProps> = ({ name }) => (
  <Tree.DirectoryTree
    className={styles['theme-tree']}
    showLine={{ showLeafIcon: false }}
    defaultExpandAll
    selectedKeys={[]}
    treeData={treeMap[name]}
    onSelect={([selectedKey]) => {
      // 页面跳转到对应位置
      const selectDom = document.getElementById(`${selectedKey}`);
      selectDom && selectDom.scrollIntoView();
    }}
  />
);

export default DirectoryTree;
