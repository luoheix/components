import React, { useState, useEffect } from 'react';
import styles from './index.less';

interface calendarChildListType {
  weekNumber: number;
  weekName: string;
  dateObj: Date;
}

interface calendarListType {
  key: string;
  children: calendarChildListType[];
}

// 当前时间
const nowDate = new Date();
const [nowYear, nowMonth, nowDay] = [
  nowDate.getFullYear(),
  nowDate.getMonth(),
  nowDate.getDate(),
];

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
  return Object.prototype.toString.call(date) === '[object Date]'
    ? new Date(date.valueOf())
    : new Date(date.replace(/-/g, '/'));
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
      const targetDateCopy = switchDateObject(date);
      targetDateCopy.setDate(dayNumber);
      return {
        ...item,
        dateObj: targetDateCopy,
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

  // 修改年份/月份
  const onChangeDate = (dateType: string) => {
    const newDate = new Date(targetDate.valueOf());
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
      default:
    }
    setTargetDate(newDate);
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.operat}>
        <div className={styles.pre}>
          <button type="button" onClick={() => onChangeDate('preYear')}>
            上一年
          </button>
          <button type="button" onClick={() => onChangeDate('preMonth')}>
            上一月
          </button>
        </div>
        <div
          className={styles.center}
        >{`${targetDate.getFullYear()} 年 ${targetDate.getMonth() +
          1} 月`}</div>
        <div className={styles.next}>
          <button type="button" onClick={() => onChangeDate('nextMonth')}>
            下一月
          </button>
          <button type="button" onClick={() => onChangeDate('nextYear')}>
            下一年
          </button>
        </div>
      </div>
      <div className={styles.table}>
        <ul className={styles.header}>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
          <li>日</li>
        </ul>
        <div className={styles.body}>
          {calendarList.map(item => (
            <ul key={item.key}>
              {item.children.map(it => {
                const { dateObj } = it;

                // 日历项
                const [itYear, itMonth, itDay] = [
                  dateObj.getFullYear(),
                  dateObj.getMonth(),
                  dateObj.getDate(),
                ];

                // 目标月
                const [targetYear, targetMonth] = [
                  targetDate.getFullYear(),
                  targetDate.getMonth(),
                  targetDate.getDate(),
                ];

                // 是否是目标月
                const isTargetMonth =
                  itYear === targetYear && itMonth === targetMonth;

                // 是否是今天
                const isToday =
                  itYear === nowYear &&
                  itMonth === nowMonth &&
                  itDay === nowDay;

                return (
                  <li
                    style={
                      isTargetMonth
                        ? {
                            color: 'rgba(0,0,0,.85)',
                            backgroundColor: '#fafafa',
                          }
                        : {}
                    }
                    key={it.weekNumber}
                  >
                    <div
                      className={styles['day-number']}
                      style={
                        isToday
                          ? {
                              color: '#fff',
                              background: 'rgb(0, 150, 250)',
                            }
                          : {}
                      }
                      title={`${itYear} 年 ${itMonth + 1} 月 ${itDay} 日`}
                    >
                      {itDay}
                    </div>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarManage;
