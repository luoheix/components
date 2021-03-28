import React, { useRef } from 'react';
import { Link } from 'umi';
import { Card, Row, Col } from 'antd';
import { useSize } from 'ahooks';
import styles from './index.less';
import autoTooltipImg from '../assets/images/auto-tooltip.png';
import tableFilterHeaderImg from '../assets/images/table-filter-header.png';
import watermarkImg from '../assets/images/watermark.png';
import calendarManageImg from '../assets/images/calendar-manage.png';
import addDraggableTableImg from '../assets/images/add-draggable-table.png';
import imgViewerImg from '../assets/images/img-viewer.png';
import modalPromptImg from '../assets/images/modal-prompt.png';

const menuList = [
  {
    path: '/auto-tooltip',
    title: '文本超长显示 Tooltip',
    img: autoTooltipImg,
  },
  {
    path: '/table-filter-header',
    title: '响应式表格搜索头部',
    img: tableFilterHeaderImg,
  },
  {
    path: '/watermark',
    title: '页面水印效果',
    img: watermarkImg,
  },
  {
    path: '/calendar-manage',
    title: '日历管理',
    img: calendarManageImg,
  },
  {
    path: '/add-draggable-table',
    title: '可拖拽、可增删动态表格',
    img: addDraggableTableImg,
  },
  {
    path: '/img-viewer',
    title: '基于 react-viewer 的图片查看器',
    img: imgViewerImg,
  },
  {
    path: '/modal-prompt',
    title: '基于 umi/prompt 离开页面时的二次确认弹窗',
    img: modalPromptImg,
  },
];

export default () => {
  const ref = useRef(null);
  const { width = 0 } = useSize(ref);

  // 响应式
  const span = (() => {
    switch (true) {
      case width > 1000:
        return 6;
      case width > 750:
        return 8;
      case width > 500:
        return 12;
      default:
        return 24;
    }
  })();

  return (
    <Row className={styles.menuCards} gutter={[24, 24]} ref={ref}>
      {menuList.map(item => (
        <Col span={span} key={item.path}>
          <Link to={item.path}>
            <Card className={styles.cardItem} hoverable title={item.title}>
              <div className={styles.over} style={{ height: width / 12 + 50 }}>
                {item.img && <img src={item.img} alt={item.title} />}
              </div>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};
