import React, { Component } from 'react';
import NumPicker from '../../components/NumPicker';
import './App.css';

const options = [2, 4, 6, 8, 10];

class App extends Component {
  constructor(props) {
    super(props);

    this.onNumPickerChange = this.onNumPickerChange.bind(this);
    this.state = {
      selectedValue: null,
    };
  }

  onNumPickerChange(selectedValue) {
    this.setState({ selectedValue });
  }

  render() {
    const { selectedValue } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to the NumPicker example!</h2>
        </div>
        <div className="content-wrapper">
          <NumPicker
            options={options}
            value={selectedValue}
            onChange={this.onNumPickerChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
