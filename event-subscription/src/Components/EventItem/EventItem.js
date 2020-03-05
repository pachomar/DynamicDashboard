import React, { Component } from 'react';
import './EventItem.css';

class EventItem extends Component {
    
    constructor(props){
        super(props);
        this.state = { 
            eventSub: props.eventSub,
            subscribed: false
         };
    }

    componentWillReceiveProps(props) {
        this.setState({
            eventSub: props.eventSub
        });
    }

    render() {    
        function Subscribe(){
            //TODO
            //Add subscription logic (email, notifications, etc)
        }

        return (<div className="eventItem">
                    <div className="eventTitle"><b> {this.state.eventSub.name} </b></div>
                    <div className="eventLine">{this.state.eventSub.description}</div>
                    <div className="eventLine">{this.state.eventSub.location}</div>
                    <div className="eventLine">{this.state.eventSub.date}</div>
                    <label className="subCheck"><input type="checkbox" onChange={Subscribe()}></input>Subscribed</label>
                </div>
        );}
}

export default EventItem;