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
		return (
			<div>
			{
				this.state.name === '' ? < div className = "loader" > </div> :

				<div className = "product-info">
					<div>
						Name : {
							this.state.name
						}
					</div>
					<div>
						Rank: {
							this.state.rank
						}
					</div>
					<div>
						Dimensions: {
							this.state.dimensions
						}
					</div>
					<div>
						Category: {
							this.state.category
						}
					</div>
				</div>

			}
			</div>)
		}

	}

	export default FetchData