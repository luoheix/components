import React from 'react';
import { Link } from 'umi';
import { Card, Row, Col } from 'antd';
import styles from './index.less';

import autoTooltipImg from '../assets/images/auto-tooltip.png';

const menuList = [
  {
    title: '文本超长显示 Tooltip 效果（自适应）',
    img: autoTooltipImg,
  },
];

export default () => {
  return (
    <Row className={styles.menuCards} gutter={24}>
      {menuList.map(item => (
        <Col span={6}>
          <Link to="/auto-tooltip">
            <Card className={styles.cardItem} hoverable title={item.title}>
              <div className={styles.over}>
                <img src={item.img} alt={item.title} />
              </div>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};
