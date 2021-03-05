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
