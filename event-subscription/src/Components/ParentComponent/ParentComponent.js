import React, { Component } from 'react';
import './ParentComponent.css';
import EventList from '../EventList/EventList';
import CreateWindow from '../CreateWindow/CreateWindow';
import Popup from "reactjs-popup";
import Button from 'react-bootstrap/Button';

class ParentComponent extends Component {
    
    constructor(){
        super();
        this.state = { 
            first5Events:[],
            events: [],
            categories: []
         };
         this.fetchOptions = this.fetchOptions.bind(this);
         this.addEvent = this.addEvent.bind(this);
    } 

    componentDidMount(){
        this.fetchOptions();
    }

    fetchOptions(){
        fetch('http://localhost:3001/events',{})
        .then((res) => {
            return res.json();
        }).then((json) => {
            json = json.filter(function(ev){ return Date.now() <= new Date(ev.date).getTime();});
            var sortedEvents = json.sort(function(a,b){ return new Date(a.date) - new Date(b.date); });
            this.setState({first5Events: sortedEvents.slice(0,5)});
            this.setState({events: sortedEvents.slice(6,sortedEvents.length)});
        })
        .catch((error) => {
            console.log(error);
            throw new Error('Failed to load events');
        });

        fetch('http://localhost:3001/categories',{})
        .then((res) => {
            return res.json();
        }).then((json) => {
            this.setState({categories: json })
        })
        .catch((error) => {
            console.log(error);
            throw new Error('Failed to load categories');
        });
    }

    addEvent(event){
        fetch('http://localhost:3001/events', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: event
        })
        .then((json) => {
            this.fetchOptions();
        })
        .catch((error) => {
            console.log(error);
            throw new Error('Failed to save event');
        });
    }

    render() {
        const items=[];
        
        for(var i=0; i < this.state.categories.length; i++)
        {
            items.push(<tr><td><h4>{this.state.categories[i].name}</h4></td></tr>);
            items.push(<EventList eventList={this.state.events.filter(function(ev) {return ev.categoryId == i;})}></EventList>);
        }

        return (<div>
            <Popup trigger={<Button variant="primary" className="createButton">Create Event</Button> } 
                position="left center" modal closeOnDocumentClick>
                    {close => (
                        <div>
                            <a className="close" onClick={close}>&times;</a>
                            <CreateWindow callback={this.addEvent} close={close} events={this.state.events} 
                                categories={this.state.categories}>
                             </CreateWindow>
                        </div>
                    )}
            </Popup>
            <table>
                <tbody>
                    <tr>
                        <td><h4>Upcoming 5 Events</h4></td>
                    </tr>
                    <EventList eventList={this.state.first5Events}></EventList>
                    {items}
                </tbody>
            </table>
        </div>
        )
    }
}

export default ParentComponent;
