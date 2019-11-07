import React from 'react';
import './App.css';
import Book from './book/book';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      search: '',
      sort: '',
      error: null
    }
  }

  setParam = (e) => {
    const { name, value } = e.target;
    this.setState({[name]: value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { search, sort } = this.state;
    const params = {};
    if (search) {
      params.search = `search=${search}`
    }
    if (sort) {
      params.sort = `sort=${sort}`
    }
    const paramString = Object.keys(params).map(key => params[key]).join('&')
    const baseUrl = `http://localhost:8000/books`;
    const url = `${baseUrl}?${paramString}`;

    fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json();
    })
    .then(data => {
      this.setState({
        books: data,
        error: null
      });
    })
    .catch(error => {
      this.setState({error})
    })
  }

  render() {
    const books = this.state.books.map((book, i) => {
      return <Book key={i} {...book}/>
    })
    return (
      <main className="App">
        <h1>NYT Bestsellers</h1>
        <div className="search">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="search">Search</label>
            <input
              type="text"
              id="search"
              name="search"
              value={this.state.search}
              onChange={this.setParam}
            />
            <label htmlFor="sort">Sort</label>
            <select name="sort" id="sort" onChange={this.setParam}>
              <option value="">none</option>
              <option value="rank">by rank</option>
              <option value="title">by title</option>
            </select>
            <button type="submit">Search</button>
          </form>
          <div className="app_error">{this.state.error ? this.state.error : null}</div>
        </div>
        {books ? books : null}
      </main>
    );
  }
}

export default App;
