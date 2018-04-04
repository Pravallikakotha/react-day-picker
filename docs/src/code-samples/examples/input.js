import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {TimePicker} from '../../../../src/timepicker';
import PropTypes from 'prop-types';

function CustomOverlay({ classNames, selectedDay, children}) {
    const styleFlex = {
        display: 'flex',
    };
    console.log("helloooo");
    return (
        <div className={classNames.overlayWrapper}>
            <div className={classNames.overlay} style={styleFlex}>
                {children}
                <TimePicker value={children.props.selectedTime} handleTimeChange={children.props.handleTimeChange}/>
            </div>
        </div>
    );
}


export default class Example extends React.Component {
  static propTypes = {
    onDayChange: PropTypes.func,
    handleTimeChange: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: null,
      selectedTime: null
    };
  }

  handleTimeChange =(value) => {
    this.setState({
      selectedTime: value
    });
    console.log(value);
  }
  render() {
      return (
        <div>
          <p>Please type a day:</p>
          <DayPickerInput onDayChange={day => console.log(day)} handleTimeChange = {this.handleTimeChange} overlayComponent={CustomOverlay}
          dayPickerProps={{
              handleTimeChange: this.handleTimeChange,
              selectedTime: this.state.selectedTime
          }}
        keepFocus={false}/>
        </div>
      );
  }
}
