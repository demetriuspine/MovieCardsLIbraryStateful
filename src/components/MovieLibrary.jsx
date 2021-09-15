import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import AddMovie from './AddMovie';

class MovieLibrary extends React.Component {
  constructor(props) { // https://pt.stackoverflow.com/questions/353624/react-por-que-utilizar-props-no-constructor
    super();

    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies: props.movies,
    };
  }

  filterMovies = (value) => {
    const { movies } = this.props;
    const checkboxFunc = movies.filter(({ bookmarked }) => bookmarked === true);
    const confirmValueOfCheck = value === true ? checkboxFunc : movies;

    this.setState({
      movies: confirmValueOfCheck,
    });
  }

  filterGenre = (value) => {
    const { movies } = this.props;
    const getGenre = movies.filter(({ genre }) => genre === value);
    const confirmGenre = value === '' ? movies : getGenre;

    this.setState({
      movies: confirmGenre,
    });
  }

  filterTitle = (value) => {
    const { movies } = this.props;
    const getTitle = movies.filter(({ title, subtitle, storyline }) => (
      title.includes(value) || subtitle.includes(value) || storyline.includes(value)
    ));
    const confirmTitle = value === '' ? movies : getTitle;
    this.setState({
      movies: confirmTitle,
    });
  }

  conditional = (name, value, checked) => {
    if (name === 'bookmarkedOnly') this.filterMovies(checked);
    if (name === 'selectedGenre') this.filterGenre(value);
    if (name === 'searchText') this.filterTitle(value);
  }

  handleChange = (event) => {
    const { target: { type, checked, value, name } } = event;
    const valueInput = type === 'checkbox' ? checked : value;
    this.setState(() => ({
      [name]: valueInput,
    }));
    this.conditional(name, value, checked);
  }

  filterCard = (newMovie) => {
    const { movies } = this.state;
    const array = [...movies, newMovie];
    this.setState({ movies: array });
  }

  render() {
    const { searchText, bookmarkedOnly, selectedGenre, movies } = this.state;
    return (
      <div>
        <SearchBar
          searchText={ searchText }
          onSearchTextChange={ this.handleChange }
          bookmarkedOnly={ bookmarkedOnly }
          onBookmarkedChange={ this.handleChange }
          selectedGenre={ selectedGenre }
          onSelectedGenreChange={ this.handleChange }
        />
        <MovieList movies={ movies } />
        <AddMovie onClick={ this.filterCard } />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default MovieLibrary;
