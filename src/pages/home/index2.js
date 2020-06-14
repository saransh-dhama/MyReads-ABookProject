import React, { useState, useContext, useEffect } from 'react';
import { store } from '../../utils/store';
import * as BooksAPI from '../../BooksAPI.js';
import Book from '../../basicComponents/book';
import { useHistory } from 'react-router';

const HomePage = ({ props }) => {
	const history = useHistory();
	const globalState = useContext(store);
	const { dispatch } = globalState;
	const allBooksInShelfs = globalState.state.books;
	const [shelfs] = useState([
		{ name: 'Currently Reading', id: 'currentlyReading' },
		{ name: 'Want to Read', id: 'wantToRead' },
		{ name: 'Read', id: 'read' },
	]);
	useEffect(() => {
		async function fetchAllBooksForThisUser() {
			return await BooksAPI.getAll();
		}
		fetchAllBooksForThisUser().then((books) => {
			dispatch({
				type: 'updateBooksList',
				books: books,
			});
		});
	}, [dispatch]);
	const moveBookToOtherShelf = (book, shelf) => {
		book.shelf = shelf;
		const listOfBooks = globalState.state.books.filter(
			(bo) => bo.id !== book.id
		);
		listOfBooks.push(book);
		dispatch({
			type: 'updateBooksList',
			books: listOfBooks,
		});
		BooksAPI.update(book, shelf);
	};
	return (
		<div className='app'>
			<div className='list-books'>
				<div className='list-books-title'>
					<h1>MyReads</h1>
				</div>
				<div className='list-books-content'>
					<div>
						{shelfs.map((shelf) => {
							return (
								<div className='bookshelf' key={shelf.id}>
									<h2 className='bookshelf-title'>{shelf.name}</h2>
									<div className='bookshelf-books'>
										<ol className='books-grid'>
											{allBooksInShelfs.length ? (
												allBooksInShelfs
													.filter((book) => book.shelf === `${shelf.id}`)
													.map((book) => {
														return (
															<li key={book.id}>
																<Book
																	book={book}
																	moveBookToOtherShelf={moveBookToOtherShelf}
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
					<button onClick={() => history.push('/search')}>Add a book</button>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
