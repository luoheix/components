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
