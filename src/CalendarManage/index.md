## Calendar-manage

利用 Date 实现日历管理系统，可以切换年/月。  
文档地址：[日历管理系统之一：初始化日历 · 黑熊君](https://www.yuque.com/luowenshuai/design/lfna4z '日历管理系统之一：初始化日历 · 黑熊君')

## 使用效果

```tsx
import React from 'react';
import { CalendarManage } from 'luows-component';

export default () => <CalendarManage />;
```

## 组件实现

### index.tsx 文件

```tsx | pure
import React, { useState, useEffect } from 'react';
import styles from './index.less';

interface calendarChildListType {
  dayNumber: number;
  isTargetMonth: boolean;
  isCurDay: boolean;
  weekNumber: number;
  weekName: string;
}

interface calendarListType {
  key: string;
  children: calendarChildListType[];
}

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

// 获取某月天数
// date 格式 ‘Date 对象’ 或 ‘2020-9’
const getMonthDays = (date = new Date()) => {
  const targetDate = switchDateObject(date);
  // 获取当前月份
  const curMonth = targetDate.getMonth();
  // 设置当前月1日，防止下一个月没有29-31日
  targetDate.setDate(1);
  // 将 targetDate 设置为下一个月
  targetDate.setMonth(curMonth + 1);
  // setDate(0) 会让 targetDate 日期变成前一个月的最后一天，也就是当前月的最后一天
  targetDate.setDate(0);
  // 获取 targetDate 的日期，也就是当前月的最后一天的日期，即当前月天数
  return targetDate.getDate();
};

// 是否是当年当月当日
const isCurYearMonthDay = (date: Date, dayNumber: number) => {
  const targetDate = switchDateObject(date);
  const nowDate = new Date();
  return (
    targetDate.getFullYear() === nowDate.getFullYear() &&
    targetDate.getMonth() === nowDate.getMonth() &&
    dayNumber === nowDate.getDate()
  ); // 是否为当年当月
};

// 获取初始列表，6 横 7 列
// date 格式 Date 对象 或 '2020-9'
const getInitList = (date = new Date()): calendarListType[] => {
  const targetDate = switchDateObject(date);
  targetDate.setDate(1); // 设置为当月第一天的星期数
  const targetWeekNumber = targetDate.getDay() || 7; // 目标月第一天
  const targetMonthDays = getMonthDays(targetDate); // 目标月天数
  targetDate.setDate(0); // 设置为上一月最后一天
  const lastMonthDays = getMonthDays(targetDate); // 上个月天数

  const initList = [];
  for (let i = 0; i < 6; i += 1) {
    const listItem = weekMapList.map((item, index) => {
      let dayNumber = i * 7 + index - targetWeekNumber + 2; // 0
      let isTargetMonth = false;
      let isCurDay = false;
      switch (true) {
        case dayNumber < 1:
          dayNumber += lastMonthDays;
          break;
        case dayNumber > targetMonthDays:
          dayNumber -= targetMonthDays;
          break;
        default:
          isTargetMonth = true;
          isCurDay = isCurYearMonthDay(date, dayNumber);
          break;
      }

      return {
        ...item,
        dayNumber,
        isTargetMonth,
        isCurDay,
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
  const [targetDate, setTargetDate] = useState(new Date()); // switchDateObject('2020-10')
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
              {item.children.map(it => (
                <li
                  style={
                    it.isTargetMonth
                      ? { color: 'rgba(0,0,0,.85)', backgroundColor: '#fafafa' }
                      : {}
                  }
                  key={it.weekNumber}
                >
                  <div
                    className={styles['day-number']}
                    style={
                      it.isCurDay
                        ? {
                            color: '#fff',
                            background: 'rgb(0, 150, 250)',
                          }
                        : {}
                    }
                  >
                    {it.dayNumber}
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CalendarManage;
```

### index.less 文件

```tsx | pure
.calendar {
  padding: 16px;
  width: 800px;
  // position: relative;
  overflow: hidden;

  .operat {
    display: flex;
    justify-content: space-between;

    > div {
      display: flex;
      justify-content: space-between;
    }

    .center {
      font-size: 16px;
    }

    button {
      cursor: pointer;

      &:last-child {
        margin-left: 5px;
      }
    }
  }

  .table {
    margin-top: 10px;
    // position: absolute;
    // top: 0;
    // left: 0;

    .header {
      display: flex;

      > li {
        flex: 1;
        text-align: center;
        font-size: 20px;
        line-height: 50px;
        background-color: #fafafa;
        border: 2px solid #999999;

        &:not(:last-child) {
          border-right: none;
        }
      }
    }

    .body {
      > ul {
        display: flex;

        > li {
          flex: 1;
          font-size: 20px;
          height: 100px;
          color: rgba(0, 0, 0, 0.25);
          border: 2px solid skyblue;
          border-top: none;

          &:not(:last-child) {
            border-right: none;
          }
        }
      }

      .day-number {
        margin: 5px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        text-align: center;
        line-height: 26px;
      }
    }
  }
}
```
