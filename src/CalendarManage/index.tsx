import React, { useState, useEffect } from 'react';
import { calendarListType } from './data.d';
import CalendarHeader from './CalendarHeader';
import CalendarTable from './CalendarTable';
import styles from './index.less';

// 当前时间
const nowDate = new Date();

const weekMapList = [
  {
    weekNumber: 1,
    weekName: '一',
  },
  {
    weekNumber: 2,
    weekName: '二',
  },
  {
    weekNumber: 3,
    weekName: '三',
  },
  {
    weekNumber: 4,
    weekName: '四',
  },
  {
    weekNumber: 5,
    weekName: '五',
  },
  {
    weekNumber: 6,
    weekName: '六',
  },
  {
    weekNumber: 0,
    weekName: '日',
  },
];

// 如果 date 为 Date 对象直接克隆，否则转化为 Date
const switchDateObject = (date: Date | string) => {
  return typeof date === 'string'
    ? new Date(date.replace(/-/g, '/'))
    : new Date(date.valueOf());
};

// 获取初始列表，6 横 7 列
// date 格式 Date 对象 或 '2020-9'
const getInitList = (date = nowDate): calendarListType[] => {
  const targetDate = switchDateObject(date);
  targetDate.setDate(1); // 设置为当月第一天的星期数
  const targetWeekNumber = targetDate.getDay() || 7; // 目标月第一天

  const initList = [];
  for (let i = 0; i < 6; i += 1) {
    const listItem = weekMapList.map((item, index) => {
      let dayNumber = i * 7 + index - targetWeekNumber + 2; // 0
      const dateObj = switchDateObject(date);
      dateObj.setDate(dayNumber);
      return {
        ...item,
        dateObj,
      };
    });
    initList.push({
      key: `other_${i}`,
      children: listItem,
    });
  }

  return initList;
};

const CalendarManage: React.FC<{}> = () => {
  const [targetDate, setTargetDate] = useState(nowDate); // switchDateObject('2020-10')
  const [calendarList, setCalendarList] = useState<calendarListType[]>([]);

  useEffect(() => {
    setCalendarList(getInitList(targetDate));
  }, [targetDate]);

  // 按钮修改年份/月份
  const onChangeDate = (dateType: string, value: number = 0) => {
    const newDate = switchDateObject(targetDate);
    switch (dateType) {
      case 'preYear':
        newDate.setFullYear(newDate.getFullYear() - 1);
        break;
      case 'nextYear':
        newDate.setFullYear(newDate.getFullYear() + 1);
        break;
      case 'preMonth':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case 'nextMonth':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case 'selectYear':
        newDate.setFullYear(value);
        break;
      case 'selectMonth':
        newDate.setMonth(value - 1);
        break;
      default:
    }
    setTargetDate(newDate);
  };

  return (
    <div className={styles.calendar}>
      <CalendarHeader
        nowDate={nowDate}
        targetDate={targetDate}
        onChange={onChangeDate}
      />
      <CalendarTable
        dataSource={calendarList}
        nowDate={nowDate}
        targetDate={targetDate}
      />
    </div>
  );
};

export default CalendarManage;
