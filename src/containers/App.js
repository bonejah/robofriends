// import React, { useState, useEffect } from 'react';''

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry';

import './App.css'

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
  return {
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
    searchField: state.searchRobots.searchField
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  } 
}

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     robots: [],
  //     searchField: ''
  //   }
  // }

  // componentDidMount() {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response => response.json())
  //     .then(users => this.setState({ robots: users }))
  //     .catch(error => console.log('error', error));
  // }

  componentDidMount() {
    this.props.onRequestRobots();
  }

  // onSearchChange = (event) => {
  //   this.setState({ searchField: event.target.value })
  // }

  render() {
    // const { robots, searchField } = this.state;
    const { searchField, onSearchChange, robots, isPending } = this.props;

    const filteredRobots = robots.filter(robot => {
      return robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase());
    })

    return isPending ?
      <div>Loading...</div> :
      (
        <div className='tc'>
          <h1 className='f1'>Robo Friends</h1>
          {/* <SearchBox searchChange={this.onSearchChange} /> */}
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
  }
}

// Example using Hooks
// function App() {
//   const [robots, setRobots] = useState([]);
//   const [searchField, setSearchField] = useState('');

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response => response.json())
//       .then(users => setRobots(users))
//       .catch(error => console.log('error', error));
//   }, [])

//   const onSearchChange = (event) => {
//     setSearchField(event.target.value)
//   }

//   const filteredRobots = robots.filter(robot => {
//     return robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase());
//   });

//   console.log('robots', robots)

//   return !robots.length ?
//     <div>Loading...</div> :
//     (
//       <div className='tc'>
//         <h1 className='f1'>Robo Friends</h1>
//         <SearchBox searchChange={onSearchChange} />
//         <Scroll>
//           <ErrorBoundry>
//             <CardList robots={filteredRobots} />
//           </ErrorBoundry>
//         </Scroll>
//       </div>
//     );
// }

export default connect(mapStateToProps, mapDispatchToProps)(App);