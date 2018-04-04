import React from 'react';
import PropTypes from 'prop-types';
import styles from './timepicker.css';

class TimePicker extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    onMerianChange: PropTypes.func,
    handleTimeChange: PropTypes.func
  }
  constructor(props) {
    super(props);
    /*this.textInput = React.createRef();*/
    this.state = {
      value: this.props.value || this.getTime()
    };
    this.onChange = this.onChange.bind(this);
    /*this.focusInput = this.focusInput.bind(this);*/
  }
  /*focusInput(e) {
    this.textInput.current.focus();
  }*/
  getTime() {
    var date, hour, minutes, meridian;
    date = new Date();
    hour = date.getHours();
    if(hour <= 11) {
      meridian = 'AM';
    } else {
      meridian = 'PM';
    }
    if(hour > 12) {
      hour = hour - 12;
    }
    if(hour == 0) {
      hour = 12;
    }
    minutes = date.getMinutes();
    if(minutes < 10) {
      minutes = '0' + minutes.toString();
    }
    var fullTime = hour.toString() + ':' + minutes.toString() + ' ' + meridian.toString();
    return(fullTime);
  }
  onChange(evt) {
    console.log("on change", evt.target.value);
    this.setState({
        value : event.target.value
    });
    console.log(this.props);
    this.props.handleTimeChange(evt.target.value);
  }
  handleChange=(evt, selectedHours) => {
    if(this.state.value) {
        let time = this.state.value.split(' ');
        var value = selectedHours + ' ' + time[1];
        this.setState({
          value: value
        });
        /*evt.currentTarget.scrollIntoViewIfNeeded();*/
        this.props.handleTimeChange(value);
    }
  }
  onMerianChange=(evt, selectedMeridian) => {
    if(this.state.value) {
        let time = this.state.value.split(' ');
        var value = time[0] + ' ' + selectedMeridian;
        this.setState({
          value: value
        });
        this.props.handleTimeChange(value);
    }
  }


  render() {
    var meridian = ['AM', 'PM'];
    var intervalInMinutes = 15;
    var h = 0;
    var minute = intervalInMinutes;
    var time = ["1:00"];
    if (intervalInMinutes > 0) {
      for (var i = 1; i < 13;) {
        if (minute > 60 || minute % 60 == 0) {
          i = i + 1;
          minute = minute % 60;
        }
        if (i > 12) break;
        if(minute == 0) {
          time.push(i + ":" + '00');
        } else {
          time.push(i + ":" + minute);
        }
        minute = minute + intervalInMinutes;
      }
    }
    return (
      <div className={styles.parentTimePickerDiv} tabIndex="-1">
        <div className={styles.inputDiv}>
          <input type="text" className={styles.timeInput} onChange={this.onChange} value={this.state.value} />
        </div>
        <div className={styles.timepicker}>
          <div className={styles.time}>
            <ul>
              {
                time.map((item, i) => {
                  return (<li key={i} className={`${this.state.value ? this.state.value.split(' ')[0] == item ? styles.timeSelected : null : null}`} onClick={(e) => this.handleChange(e, item) } >{item}</li>);
                })
              }
            </ul>
          </div>
          <div className={styles.meridian}>
            <ul>
              {
                meridian.map((item, i) => {
                  return (<li key={i} className={`${this.state.value ? this.state.value.indexOf(item) != -1 ? styles.timeSelected : null : null}`} onClick={(e) => this.onMerianChange(e, item)}>{item}</li>);
                })
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}


export { TimePicker };
