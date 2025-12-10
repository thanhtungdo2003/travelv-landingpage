import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export default function ScheduleCalendar({ schedules, selectedDate, onChange }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    const now = new Date();
    const validSchedules = schedules.filter((schedule) => {
      const date = new Date(schedule.start_date);
      return date >= now && schedule.available_slots > 0;
    });
    setAvailableDates(validSchedules);
  }, [schedules]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return { year, month, firstDay, lastDay };
  };

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newMonth;
    });
  };

  const getScheduleForDate = (date) => {
    const dStr = date.toISOString().split('T')[0];
    return (
      availableDates.find((s) => {
        const sStr = new Date(s.start_date).toISOString().split('T')[0];
        return sStr === dStr;
      }) || null
    );
  };

  const isDateSelectable = (date) => getScheduleForDate(date) !== null;

  const renderCalendarDays = () => {
    const { firstDay, lastDay } = getDaysInMonth(currentMonth);
    const startDay = (firstDay.getDay() + 6) % 7;
    const totalDays = lastDay.getDate();
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} style={styles.dayCell} />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const schedule = getScheduleForDate(date);
      const isSelectable = isDateSelectable(date);
      const isSelected =
        selectedDate && new Date(selectedDate).toDateString() === date.toDateString();
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <button
          key={day}
          style={{
            ...styles.dayCell,
            ...(isSelected ? styles.selectedDay : {}),
            ...(isToday ? styles.today : {}),
            ...(!isSelectable ? styles.disabledDay : {}),
          }}
          onClick={() => isSelectable && schedule && onChange(schedule)}
          disabled={!isSelectable}
        >
          <span
            style={{
              ...styles.dayText,
              ...(isSelected ? styles.selectedDayText : {}),
              ...(!isSelectable ? styles.disabledDayText : {}),
              ...(isToday ? styles.todayText : {}),
            }}
          >
            {day}
          </span>
          {schedule && (
            <div style={styles.scheduleIndicator}>
              <span style={styles.slotsText}>{schedule.available_slots}</span>
            </div>
          )}
        </button>
      );
    }

    return days;
  };

  const formatMonthYear = (date) =>
    date.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.calendarHeader}>
        <button onClick={() => navigateMonth('prev')} style={styles.navButton}>
          <ChevronLeft size={20} color="#4A90E2" />
        </button>

        <div style={styles.monthContainer}>
          <CalendarIcon size={18} color="#4A90E2" />
          <span style={styles.monthText}>{formatMonthYear(currentMonth)}</span>
        </div>

        <button onClick={() => navigateMonth('next')} style={styles.navButton}>
          <ChevronRight size={20} color="#4A90E2" />
        </button>
      </div>

      {/* Weekdays */}
      <div style={styles.weekDaysContainer}>
        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => (
          <span key={day} style={styles.weekDayText}>
            {day}
          </span>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={styles.calendarGrid}>{renderCalendarDays()}</div>

      {/* Selected date info */}
      {selectedDate && (
        <div style={styles.selectedInfo}>
          <span style={styles.selectedLabel}>Ngày đã chọn:</span>
          <br />
          <span style={styles.selectedDate}>{formatDate(selectedDate)}</span>
        </div>
      )}

      {/* Legend */}
      <div style={styles.legend}>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendColor, backgroundColor: '#4A90E2' }} />
          <span style={styles.legendText}>Có chỗ trống</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendColor, backgroundColor: '#FF9500' }} />
          <span style={styles.legendText}>Hôm nay</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendColor, backgroundColor: '#CCC' }} />
          <span style={styles.legendText}>Không khả dụng</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: '16px 0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  calendarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F0F7FF',
    border: 'none',
    cursor: 'pointer',
  },
  monthContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  monthText: {
    fontSize: 16,
    fontWeight: 600,
    color: '#333',
  },
  weekDaysContainer: {
    display: 'flex',
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 500,
    color: '#666',
  },
  calendarGrid: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '13%',
    aspectRatio: '1 / 1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 2,
    position: 'relative',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  dayText: {
    fontSize: 14,
    fontWeight: 500,
    color: '#333',
  },
  selectedDay: {
    backgroundColor: '#4A90E2',
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 600,
  },
  today: {
    backgroundColor: '#FF9500',
  },
  todayText: {
    color: 'white',
    fontWeight: 600,
  },
  disabledDay: {
    opacity: 0.3,
    cursor: 'not-allowed',
  },
  disabledDayText: {
    color: '#AAA',
  },
  scheduleIndicator: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    padding: '1px 4px',
  },
  slotsText: {
    fontSize: 8,
    color: 'white',
    fontWeight: 'bold',
  },
  selectedInfo: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F0F7FF',
    borderRadius: 8,
    borderLeft: '4px solid #4A90E2',
  },
  selectedLabel: {
    fontSize: 12,
    color: '#666',
  },
  selectedDate: {
    fontSize: 14,
    fontWeight: 600,
    color: '#333',
  },
  legend: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTop: '1px solid #F0F0F0',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 10,
    color: '#666',
  },
};
