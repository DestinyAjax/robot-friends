import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => this.setState({robots: users}))
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	render() {
		const filteredCards = this.state.robots.filter(robots => {
			return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})

		if(this.state.robots.length === 0) {
			return <h2 className="tc">Loading ...</h2>
		} else {
			return (
				<div className='tc'>
					<h1 className="tc f2">WHOT CARD GAME</h1>
					<SearchBox searchChange={this.onSearchChange} /><hr/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots={filteredCards} />
						</ErrorBoundry>
					</Scroll>
				</div>
			);
		}
	}
}

export default App;