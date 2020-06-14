import React from 'react';
import * as BooksAPI from '../../BooksAPI.js';
import Book from '../../basicComponents/book';
import { withRouter } from 'react-router-dom';
class HomePage extends React.Component {
	state = {
		shelfs: [
			{ name: 'Currently Reading', id: 'currentlyReading' },
			{ name: 'Want to Read', id: 'wantToRead' },
			{ name: 'Read', id: 'read' },
		],
		books: [],
	};
	constructor(props) {
		super(props);
		this.moveBookToOtherShelf = this.moveBookToOtherShelf.bind(this);
	}
	async componentDidMount() {
		const listOfBooks = await BooksAPI.getAll();
		this.setState(() => ({
			books: listOfBooks,
		}));
	}
	moveBookToOtherShelf(book, shelf) {
		console.log(book, shelf);
		book.shelf = shelf;
		this.setState(
			(previousState) => {
				const listOfBooks = previousState.books.filter(
					(bo) => bo.id !== book.id
				);
				listOfBooks.push(book);
				return {
					books: listOfBooks,
				};
			},
			() => BooksAPI.update(book, shelf)
		);
	}
	render() {
		return (
			<div className='app'>
				<div className='list-books'>
					<div className='list-books-title'>
						<h1>MyReads</h1>
					</div>
					<div className='list-books-content'>
						<div>
							{this.state.shelfs.map((shelf) => {
								return (
									<div className='bookshelf' key={shelf.id}>
										<h2 className='bookshelf-title'>{shelf.name}</h2>
										<div className='bookshelf-books'>
											<ol className='books-grid'>
												{this.state.books.length ? (
													this.state.books
														.filter((book) => book.shelf === `${shelf.id}`)
														.map((book) => {
															return (
																<li key={book.id}>
																	<Book
																		book={book}
																		moveBookToOtherShelf={
																			this.moveBookToOtherShelf
																		}
																	/>
																</li>
															);
														})
												) : (
													<div className='loader'></div>
												)}
											</ol>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className='open-search'>
						<button onClick={() => this.props.history.push('/search')}>
							Add a book
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(HomePage);
