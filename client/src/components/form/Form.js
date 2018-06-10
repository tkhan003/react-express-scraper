import React, {Component} from 'react';
import FetchData from '../fetch-data/FetchData';
import './style.css'

class Form extends Component {

  constructor(props) {

    super(props);

    this.state = {
      value: '',
      notEmptyInput: false,
      searchTerm: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  // ALSO NEED TO HANDLE CASE IF USER PRESSES ENTER KEY
  handleChange(e) {

    let userTyped = e.target.value;
    //   let inputNotEmpty = !!this.state.userTyped.trim().length && !!userTyped && notEmptyInput;

    this.setState({
      // notEmptyInput: true,
      value: userTyped
    });

  }

  handleClick(e) {
    console.log("clickced");
    // let inputNotEmpty = !!this.state.userTyped.trim().length && !!userTyped && notEmptyInput;

    // if (inputNotEmpty) {
    this.setState({
      notEmptyInput: true,
      searchTerm: this.state.value
    });
    // }
  }

  render() {
      return (
      <div className = "form-container">
        <div className = "box">
        <div className = "inner-box" >
        <h1> Product Search </h1>
        < div className = "label" > ASIN </div>
        <input className = "custominput" value = { this.state.value} onChange = { this.handleChange} placeholder="ex: B002QYW8LW"/>
        <button className = "custombutton" type = "button" onClick = { this.handleClick} > Submit </button>
          {
            !!this.state.notEmptyInput &&
            <FetchData asin={this.state.searchTerm} />
          }
          </div>
          </div>
          </div>);
        }

      }

      export default Form;
