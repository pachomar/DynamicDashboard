import React, { Component } from 'react';
import './CreateWindow.css';  
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";

class CreateWindow extends Component {  

  constructor(props){
      super(props);
      this.state = { 
          name: '',
          description: '',
          category: 0,
          location: '',
          date: new Date(),
          categories: props.categories,
          callback: props.callback,
          close: props.close,
          errors: [],
          showErrors: false
      };
  }

  componentWillReceiveProps(props) {
      this.setState({
        categories: props.categories
      });
  }
  
  handleNameChange = name => {
    this.setState({
      name: name.target.value
    });
  };

  handleDescriptionChange = description => {
    this.setState({
      description: description.target.value
    });
  };

  handleCategoryChange = event => {
    this.setState({
      category: event.target.value
    });
  };

  handleLocationChange = location => {
    this.setState({
      location: location.target.value
    });
  };

  handleDateChange = date => {
    this.setState({
      date: date
    });
  };

  handleSaveChanges = function(obj){
    obj.state.errors[0] = (obj.state.name == '');
    obj.state.errors[1] = (obj.state.description == '');
    obj.state.errors[2] = (obj.state.category < 0);
    obj.state.errors[3] = (obj.state.location == '');
    obj.state.errors[4] = (obj.state.date == null);

    let validation = obj.state.errors.every(v => v === false);

    if(validation) {
      const newEvent = JSON.stringify({ 
          "name": obj.state.name,
          "description": obj.state.description,
          "location": obj.state.location,
          "date": obj.state.date.getFullYear() 
            + '-' + ("0" + (obj.state.date.getMonth() + 1)).slice(-2) 
            + '-' + ("0" + obj.state.date.getDate()).slice(-2),
          "categoryId": obj.state.category
        });

      this.state.callback(newEvent);
      this.state.close();
    }
    else{
       this.setState({ showErrors : !validation});
    }
  }

  render() {  
    return (
          <table width="100%">
            <tbody>
            <tr>
              <td colSpan="3">
                  <h2>Create Event</h2>
              </td>
            </tr>
            <tr>
              <td width="20%"><h5>Name: </h5></td>
              <td width="80%"><input className="inputField" onChange={this.handleNameChange}></input></td>
              <td><span className="errorMessage" style={{ display: (this.state.errors[0] ? 'block' : 'none')}}><b>*</b></span></td>
            </tr>
            <tr>
              <td width="20%"><h5>Description: </h5></td>
              <td width="80%"><input className="inputField" onChange={this.handleDescriptionChange}></input></td>
              <td><span className="errorMessage" style={{ display: (this.state.errors[1] ? 'block' : 'none')}}><b>*</b></span></td>
            </tr>
            <tr>
              <td width="20%"><h5>Category: </h5></td><td width="80%"><select className="inputField" 
                onChange={this.handleCategoryChange} value={this.state.category}>{
                 this.state.categories.map((obj) => {
                     return <option value={obj.id}>{obj.name}</option>
                 })
              }</select></td>
              <td><span className="errorMessage" style={{ display: (this.state.errors[2] ? 'block' : 'none')}}><b>*</b></span></td>
            </tr>
            <tr>
              <td width="20%"><h5>Location: </h5></td>
              <td width="80%"><input className="inputField" onChange={this.handleLocationChange}></input></td>
              <td><span className="errorMessage" style={{ display: (this.state.errors[3] ? 'block' : 'none')}}><b>*</b></span></td>
            </tr>
            <tr>
              <td width="20%"><h5>Date: </h5></td>
              <td width="80%" className="dateContainer"><DatePicker dateFormat="MM-dd-yyyy" id="datePicker" className="inputField"
                selected={this.state.date} onChange={this.handleDateChange}/></td>
              <td><span className="errorMessage" style={{ display: (this.state.errors[4] ? 'block' : 'none')}}><b>*</b></span></td>
            </tr>
            <tr>
              <td colSpan="3"><span className="errorMessage" style={{ display: (this.state.showErrors ? 'block' : 'none')}}>
                <b>* All fields are required</b></span>
              </td>
            </tr>
            <tr>
              <td colSpan="3" className="saveChanges" >
                  <Button className="saveButton" onClick={()=>{this.handleSaveChanges(this)}}>Save</Button>
              </td>
            </tr>
            </tbody>
          </table>
    )}
}  

export default CreateWindow;