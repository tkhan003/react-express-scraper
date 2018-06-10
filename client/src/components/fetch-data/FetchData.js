import React, { Component } from 'react';
import axios from 'axios';
import './style.css';

class FetchData extends Component {

	constructor(props) {

		super(props)

		this.state = {
			name: '',
			rank: '',
			dimensions: '',
			category: ''
		}

		this.getDataFromApi = this.getDataFromApi.bind(this);

	}

	getDataFromApi() {
		let searchTerm = this.props.asin;
		console.log("get data called");

		if (!!searchTerm) {
			axios.get(`/api/fetch-data/${searchTerm}`)
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

	}


	componentWillMount() {
		this.getDataFromApi();
	}

	componentWillReceiveProps() {
		this.getDataFromApi();
	}

	render() {
		return (
			<div>
			{
				this.state.name === '' ? < div className = "loader" > </div> :

				<div className = "product-info">
					<div>
						Name : {this.state.name}
					</div>
					<div>
						Rank: {this.state.rank}
					</div>
					<div>
						Dimensions: {this.state.dimensions}
					</div>
					<div>
						Category: {this.state.category}
					</div>
				</div>

			}
			</div>)
		}

	}

	export default FetchData