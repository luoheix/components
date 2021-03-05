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

### 文件目录

组件的目录结构
<Tree name="Calendar-manage" />

### index.tsx 文件

```tsx | pure
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
```

### index.less 文件

```less | pure
.calendar {
  padding: 16px;
  width: 500px;
  // position: relative;
  overflow: hidden;
}
```

### data.d.ts 文件

```ts | pure
export interface calendarChildListType {
  weekNumber: number;
  weekName: string;
  dateObj: Date;
}

export interface calendarListType {
  key: string;
  children: calendarChildListType[];
}
```

### CalendarHeader/index.tsx 文件

```tsx | pure
import React from 'react';
import { Button, Select } from 'antd';
import styles from './index.less';

interface CalendarHeaderProps {
  nowDate: Date;
  targetDate: Date;
  onChange: (dateType: string, value?: number) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  nowDate,
  targetDate,
  onChange,
}) => {
  return (
    <div className={styles.calendarHeader}>
      <div className={styles.pre}>
        <Button size="small" onClick={() => onChange('preYear')}>
          上一年
        </Button>
        <Button size="small" onClick={() => onChange('preMonth')}>
          上一月
        </Button>
      </div>
      <div className={styles.faseSelect}>
        <Select
          className={styles.year}
          size="small"
          showSearch
          value={targetDate.getFullYear()}
          onChange={value => onChange('selectYear', value)}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(it =>
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
              const yearValue = nowDate.getFullYear() - 50 + (it * 10 + item);
              return (
                <Select.Option key={`${it}_${item}`} value={yearValue}>
                  {yearValue}
                </Select.Option>
              );
            }),
          )}
        </Select>
        <Select
          className={styles.month}
          size="small"
          showSearch
          value={targetDate.getMonth() + 1}
          onChange={value => onChange('selectMonth', value)}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className={styles.next}>
        <Button size="small" onClick={() => onChange('nextMonth')}>
          下一月
        </Button>
        <Button size="small" onClick={() => onChange('nextYear')}>
          下一年
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
```

### CalendarHeader/index.less 文件

```less | pure
.calendarHeader {
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  // .center {
  //   font-size: 16px;
  // }

  button {
    &:last-child {
      margin-left: 5px;
    }
  }

  .faseSelect {
    .year {
      width: 70px;
    }

    .month {
      margin-left: 5px;
      width: 55px;
    }
  }
}
```

### CalendarTable/index.tsx 文件

```tsx | pure
import React, { useState } from 'react';
import { calendarListType } from '../data.d';
import styles from './index.less';

interface CalendarTableProps {
  dataSource: calendarListType[];
  nowDate: Date; // 当前时间
  targetDate: Date; // 目标时间
}

const CalendarTable: React.FC<CalendarTableProps> = ({
  dataSource,
  nowDate,
  targetDate,
}) => {
  const [nowDateList] = useState([
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate(),
  ]);
  const [nowYear, nowMonth, nowDay] = nowDateList;

  return (
    <div className={styles.calendarTable}>
      <ul className={styles.theader}>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
        <li>日</li>
      </ul>
      <div className={styles.tbody}>
        {dataSource.map(item => (
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
                itYear === nowYear && itMonth === nowMonth && itDay === nowDay;

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
                  <div className={styles['day-border']}>
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
                  </div>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default CalendarTable;
```

### CalendarTable/index.less 文件

```less | pure
.calendarTable {
  margin-top: 10px;
  // position: absolute;
  // top: 0;
  // left: 0;

  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
    border: 0;
  }

  .theader {
    display: flex;

    > li {
      flex: 1;
      text-align: center;
      font-size: 16px;
      line-height: 30px;
      background-color: #fafafa;
      border: 2px solid #999999;

      &:not(:last-child) {
        border-right: none;
      }
    }
  }

  .tbody {
    > ul {
      display: flex;

      > li {
        flex: 1;
        font-size: 18px;
        height: 60px;
        color: rgba(0, 0, 0, 0.25);
        border: 2px solid skyblue;
        border-top: none;

        &:not(:last-child) {
          border-right: none;
        }
      }
    }

    .day-border {
      width: 100%;
      height: 100%;
      cursor: pointer;
      border: 2px solid transparent;

      &:hover {
        border-color: #999;
      }

      .day-number {
        margin: 3px;
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
