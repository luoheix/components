import React, { useRef } from 'react';
import { Link } from 'umi';
import { Card, Row, Col } from 'antd';
import { useSize } from 'ahooks';
import styles from './index.less';
import autoTooltipImg from '../assets/images/auto-tooltip.png';

const menuList = [
  {
    path: '/auto-tooltip',
    title: '文本超长显示 Tooltip 效果（自适应）',
    img: autoTooltipImg,
  },
  {
    path: '/table-filter-header',
    title: '响应式表格搜索头部',
    // img: autoTooltipImg,
  },
  // {
  //   path: '/auto-tooltip',
  //   title: '文本超长显示 Tooltip 效果（自适应）',
  //   img: autoTooltipImg,
  // },
];

export default () => {
  const ref = useRef();
  const { width } = useSize(ref);

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
