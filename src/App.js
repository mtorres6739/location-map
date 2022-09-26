import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      location: {},
      error: false,
      errorMessage: "",
    };
  }

  handleInput= (event) => {
    event.preventDefault();
    this.setState({
      searchQuery: event.target.value,
    });
  };

  handleSearch = event => {
    try {
      event.preventDefault();
      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
      const res = await axios.get(API);
      this.setState({ location: res.data[0] })
    } catch (error) {

    }
  }

  render() {
    return (
      <div className="App">
        <h1>App Component</h1>
        <input type="text" onChange={event => this.setState({ searchQuery: event.target.value })} />
        <button onClick={this.handleSearch}>Search</button>
        <ul>
          {this.state.searchResults.map(repo => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default App;

