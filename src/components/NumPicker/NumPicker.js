import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Clear from 'material-ui/svg-icons/content/clear';
import styles from './styles';
import './NumPicker.css';

class NumPicker extends PureComponent {
  constructor(props) {
    super(props);

    this.onCustomOptionChange = this.onCustomOptionChange.bind(this);
    this.onCustomOptionClick = this.onCustomOptionClick.bind(this);
    this.onCustomOptionClose = this.onCustomOptionClose.bind(this);
    this.onOptionClick = this.onOptionClick.bind(this);
    this.onResetNumPickerClick = this.onResetNumPickerClick.bind(this);
    this.state = {
      customOption: '',
      allowCustomOptionInput: false,
    };
  }

  componentDidUpdate() {
    if (this.customOptionInput) {
      this.customOptionInput.focus();
    }
  }

  onCustomOptionChange(e, value) {
    const customOption = Number(value);

    if (!isNaN(customOption)) {
      this.setState({ customOption });
    }
  }

  onCustomOptionClick() {
    if (Number.isInteger(this.state.customOption)) {
      return this.onOptionClick(this.state.customOption);
    }

    this.setState({ allowCustomOptionInput: true });
  }

  onCustomOptionClose() {
    this.setState({ allowCustomOptionInput: false });

    if (Number.isInteger(this.state.customOption)) {
      this.onOptionClick(this.state.customOption);
    }
  }

  onOptionClick(option) {
    this.props.onChange(option);
  }

  onResetNumPickerClick() {
    this.setState({ customOption: '', allowCustomOptionInput: false });
    this.onOptionClick(null);
  }

  renderCustomOptionInput() {
    return (
      <div className="numpicker-wrapper">
        <div className="custom-option-input-wrapper">
          <TextField
            ref={(input) => { this.customOptionInput = input; }}
            hintText="Input your own quantity of players"
            style={styles.customOptionInput}
            onChange={this.onCustomOptionChange}
            value={this.state.customOption}
          />
          <IconButton
            className="custom-option-input-close-btn"
            tooltipPosition="top-center"
            tooltip="Save and close"
            onTouchTap={this.onCustomOptionClose}
          >
            <Clear color="#19A2A6" />
          </IconButton>
        </div>
      </div>
    );
  }

  renderOptions() {
    const customOption = this.state.customOption;
    const { options, value } = this.props;

    return (
      <div className="numpicker-wrapper">
        {options.map((option, key) => (
          <FlatButton
            key={key}
            style={option === value ? styles.selectedOption : styles.option}
            onTouchTap={() => this.onOptionClick(option)}
          >
            {option}
          </FlatButton>
        ))}
        <FlatButton
          style={value === customOption ? styles.selectedOption : styles.option}
          onTouchTap={this.onCustomOptionClick}
        >
          {Number.isInteger(customOption) ? `${customOption}` : '...'}
        </FlatButton>
      </div>
    );
  }

  render() {
    const allowCustomOptionInput = this.state.allowCustomOptionInput;

    return (
      <Paper style={styles.paper} zDepth={4}>
        <IconButton
          className="reset-numpicker-btn"
          tooltipPosition="top-center"
          tooltip="Reset NumPicker Values"
          onTouchTap={this.onResetNumPickerClick}
        >
          <Clear color="#19A2A6" />
        </IconButton>
        <h4 className="numpicker-header">How many players?</h4>
        {allowCustomOptionInput ? this.renderCustomOptionInput() : this.renderOptions()}
      </Paper>
    );
  }
}

NumPicker.propTypes = {
  value: PropTypes.number,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NumPicker;
