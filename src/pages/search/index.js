import React from 'react';
import * as BooksAPI from '../../BooksAPI';
import { withRouter } from 'react-router-dom';
import Book from '../../basicComponents/book';
import _ from 'lodash';
class SearchPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			myBooks: [],
			books: [],
			searchValue: '',
		};
		this.setBooksBasedOnSearch = this.setBooksBasedOnSearch.bind(this);
		this.moveBookToOtherShelf = this.moveBookToOtherShelf.bind(this);
	}
	async componentDidMount() {
		const listOfBooks = await BooksAPI.getAll();
		this.setState(() => ({
			myBooks: listOfBooks,
		}));
	}
	onChangeHandler = (event) => {
		this.setState({ searchValue: event.target.value });
		event.persist();
		if (!this.debouncedFn) {
			this.debouncedFn = _.debounce(() => {
				let searchString = event.target.value;
				this.setBooksBasedOnSearch(searchString);
			}, 300);
		}
		this.debouncedFn();
	};

	setBooksBasedOnSearch(value) {
		if (value) {
			BooksAPI.search(value).then((books) => {
				this.setState({ books: books });
			});
		} else {
			this.setState({ books: [] });
		}
	}
	moveBookToOtherShelf(book, shelf) {
		book.shelf = shelf;
		BooksAPI.update(book, shelf);
	}
	render() {
		return (
			<div className='app'>
				<div className='search-books'>
					<div className='search-books-bar'>
						<button
							className='close-search'
							onClick={() => this.props.history.push('/')}
						>
							Close
						</button>
						<div className='search-books-input-wrapper'>
							<input
								type='text'
								placeholder='Search by title or author'
								value={this.state.searchValue}
								onChange={this.onChangeHandler}
							/>
						</div>
					</div>
					<div className='search-books-results'>
						<ol className='books-grid'>
							{this.state.books.length > 1 ? (
								this.state.books.map((book) => {
									let bookdata = book;
									const bookOnShelf = this.state.myBooks.find(
										(myBook) => book.id === myBook.id
									);
									if (bookOnShelf) {
										bookdata = bookOnShelf;
									}
									return (
										<li key={bookdata.id}>
											<Book
												book={bookdata}
												moveBookToOtherShelf={this.moveBookToOtherShelf}
											/>
										</li>
									);
								})
							) : (
								<div className='emptyListOfSearchedBooks'>
									<h2>No result</h2>
								</div>
							)}
						</ol>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(SearchPage);
