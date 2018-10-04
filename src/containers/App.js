import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import { setSearchField } from '../actions';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

const mapStateToProps = state => {
	return {
		searchField: state.searchField
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value))
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => this.setState({robots: users}))
	}

	render() {
		const { robots } = this.state;
		const { searchField, onSearchChange } = this.props;
		const filteredCards = this.state.robots.filter(robots => {
			return robots.name.toLowerCase().includes(searchField.toLowerCase());
		})

		if(robots.length === 0) {
			return <h2 className="tc">Loading ...</h2>
		} else {
			return (
				<div className='tc'>
					<h1 className="tc f2">MEET MY ROBOT FRIENDS</h1>
					<SearchBox searchChange={onSearchChange} /><hr/>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);