import React, {Component} from 'react';
import axios from 'axios';

class FetchData extends Component {

    constructor(props) {

        super(props)

        this.state = {
            name: '',
            rank: '',
            dimensions: '',
            category: ''
        }


    }

    componentWillMount() {

         axios.get('/api/fetch-data')
             .then(response => {
                 console.log(response.data);
                 this.setState({
                     name: response.data.name,
                     rank: response.data.rank,
                     dimensions: response.data.dimensions,
                     category: response.data.category,
                 })
             })
             .catch(function (error) {
                 console.log(error);
             });

    }

    render() {
        return (<div>
                    Name: {this.state.name}
                    Rank: {this.state.rank}
                    Dimensions: {this.state.dimensions}
                    Category: {this.state.category}
                </div>)
    }

}

export default FetchData