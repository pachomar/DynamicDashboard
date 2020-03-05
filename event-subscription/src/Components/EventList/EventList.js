import React, { Component } from 'react';
import EventItem from '../EventItem/EventItem';

class EventList extends Component {
    
    constructor(props){
        super(props);
        this.state = { 
            eventList: props.eventList
         };
    }

    componentWillReceiveProps(props) {
        this.setState({
            eventList: props.eventList
        });
    }

    render() {    
        return <tr>
            {
                this.state.eventList.map(function(ev){
                    return <td key={ev.id}><EventItem eventSub={ev}></EventItem></td>
                })
            }
        </tr>
    }        
}

export default EventList;