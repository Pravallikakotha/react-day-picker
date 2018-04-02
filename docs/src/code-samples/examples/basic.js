/* eslint-disable */
import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 10, 11);

function Navbar({
  nextMonth,
  previousMonth,
  onPreviousClick,
  onNextClick,
  className,
  localeUtils,
}) {
  const months = localeUtils.getMonths();
  const prev = months[previousMonth.getMonth()];
  const next = months[nextMonth.getMonth()];
  const styleLeft = {
    float: 'left',
  };
  const styleRight = {
    float: 'right',
  };
  return (
    <div className={className}>
      <button style={styleLeft} onClick={() => onPreviousClick()}>
        ←
      </button>
      <button style={styleRight} onClick={() => onNextClick()}>
         →
      </button>
    </div>
  );
}

// eslint-disable-next-line
function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
}

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: null,
    };
  }

  handleDayClick = (day, { selected }) => {
    // eslint-disable-next-line
    console.log(day, selected);
    this.setState({
      selectedDay: selected ? undefined : day,
    });
  };

  render() {
    return (
      <DayPicker
        selectedDays={this.state.selectedDay}
        onDayClick={this.handleDayClick}
        captionElement={({ date, localeUtils }) => (
          <YearMonthForm
            date={date}
            localeUtils={localeUtils}
            onChange={this.handleYearMonthChange}
          />
        )}
        navbarElement={<Navbar />}
        todayButton={<div><div>Now</div><div>Today</div></div>}
        onTodayButtonClick={(day, modifiers) => console.log(day, modifiers)}
      />
    );
  }
}

export default Hello;
/* eslint-disable */