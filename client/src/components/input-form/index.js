import React, {Component} from 'react';
import FetchData from './children/fetch-data';
import './style.css'

class Inputform extends Component {

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

    // https: //www.amazon.com/dp/B06XTZDQCF/ref=sspa_dk_detail_3?psc=1&pd_rd_i=B06XTZDQCF&pd_rd_wg=WEJ5s&pd_rd_r=1Y3PSQAVFHHBTJQSYQZS&pd_rd_w=dCFhu
    // https: //www.amazon.com/dp/B06XTZDQCF/ref=sspa_dk_detail_3?psc=1&pd_rd_i=B06XTZDQCF&pd_rd_wg=WEJ5s&pd_rd_r=1Y3PSQAVFHHBTJQSYQZS&pd_rd_w=dCFhu
    // var regex = RegExp("http://www.amazon.com/([\\w-]+/)?(dp|gp/product)/(\\w+/)?(\\w{10})");


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

     if ((e.keyCode === 13 || e.which === 13) && !!e.target.value) {
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
    else {
      this.setState({
        notEmptyInput: false
      })
    }
    // if (inputNotEmpty) {

    // }
  }

  handleError() {
    console.log('errror triggered')
  }

  render() {
      return (
      <div className = "form-container">
        <div className = "box">
          <div className = "inner-box" >
            <h1> Product Search </h1>
            <div className = "label" > ASIN </div>
            <input className = "custominput" value = { this.state.value} onChange = { this.handleChange} onKeyDown={this.handleEnter} placeholder="ex: B002QYW8LW"/>
            <button className = "custombutton" type = "button" onClick = { this.handleClick} > Submit </button>
              {
              !!this.state.submitForm && !!this.state.notEmptyInput &&
               <FetchData asin={this.state.searchTerm} submitForm={this.state.submitForm} />
              }
              {
                !!this.state.submitForm && !!!this.state.notEmptyInput &&
                <div style = {{ paddingTop: '10px', fontSize: '10px', color: 'red'}}> * Not valid ASIN number,try again </div>
              }
              {
                !!!this.state.notEmptyInput &&
                <div style = {{ paddingTop: '10px', fontSize: '10px', color: 'red'}} > * Required field </div>
              }
          </div>
        </div>
        </div>);
  }

}

export default Inputform;

