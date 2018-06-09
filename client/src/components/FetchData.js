import React, {Component} from 'react';
import axios from 'axios';

class FetchData extends Component {

    constructor(props) {

        super(props)

        this.state = {

        }


    }

    componentDidMount() {

        axios.get('/api/hello')
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        return (<div>Fetch Data Comp</div>)
    }

}

export default FetchData