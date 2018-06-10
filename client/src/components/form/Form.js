import React, {Component} from 'react';
import FetchData from '../fetch-data/FetchData';
import './style.css'

class Form extends Component {

  constructor(props) {

    super(props);

    this.state = {
      value: '',
      notEmptyInput: false,
      submitForm: false,
      searchTerm: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);

  }

  // ALSO NEED TO HANDLE CASE IF USER PRESSES ENTER KEY
  handleChange(e) {

    let userTyped = e.target.value;

    this.setState({
      value: userTyped
    });

    if (e.target.value !== '') {
      this.setState({
        value: userTyped,
        notEmptyInput: true
      });
    }
    else {
      this.setState({
        notEmptyInput: false
      });
    }

  }

  handleEnter(e) {

     if ((e.keyCode == 13 || e.which == 13) && !!e.target.value) {
       this.setState({
        submitForm: true,
        notEmptyInput: true,
        searchTerm: this.state.value
       });
     }
     else {
      this.setState({
        submitForm: false
      });
     }
  }

  handleClick(e) {
    console.log("clickced");
    // let inputNotEmpty = !!this.state.userTyped.trim().length && !!userTyped && notEmptyInput;
    if (!!this.state.notEmptyInput) {
      this.setState({
        notEmptyInput: true,
        submitForm: true,
        searchTerm: this.state.value
      });
    }
    // if (inputNotEmpty) {

    // }
  }

  render() {
      return (
      <div className = "form-container">
        <div className = "box">
        <div className = "inner-box" >
        <h1> Product Search </h1>
        < div className = "label" > ASIN </div>
        <input className = "custominput" value = { this.state.value} onChange = { this.handleChange} onKeyDown={this.handleEnter} placeholder="ex: B002QYW8LW"/>
        <button className = "custombutton" type = "button" onClick = { this.handleClick} > Submit </button>
          {
            !!this.state.notEmptyInput && !!this.state.submitForm &&
            <FetchData asin={this.state.searchTerm} />
          }
          </div>
          </div>
          </div>);
        }

      }

      export default Form;
