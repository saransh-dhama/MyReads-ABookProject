import React, { useState } from 'react';
import PropTypes from 'prop-types';
const BookComponent = ({ book, moveBookToOtherShelf, ...props }) => {
	const [bookCollection, setCollectionValue] = useState(
		book.shelf ? book.shelf : 'none'
	);
	const updateCollection = (event) => {
		setCollectionValue(event.target.value);
		moveBookToOtherShelf(book, event.target.value);
	};
	return (
		<div className='book'>
			<div className='book-top'>
				<div
					className='book-cover'
					style={{
						width: 128,
						height: 193,
						backgroundImage: `url("${
							book.imageLinks && book.imageLinks.thumbnail
						}")`,
					}}
				></div>
				<div className='book-shelf-changer'>
					<select value={bookCollection} onChange={updateCollection}>
						<option value='move' disabled>
							Move to...
						</option>
						<option value='currentlyReading'>Currently Reading</option>
						<option value='wantToRead'>Want to Read</option>
						<option value='read'>Read</option>
						<option value='none'>None</option>
					</select>
				</div>
			</div>
			<div className='book-title'>{book.title && book.title}</div>
			<div className='book-authors'>
				{book.authors &&
					book.authors.map((author) => (
						<span key={`${book.id}${author}`}>{author} </span>
					))}
			</div>
		</div>
	);
};
BookComponent.propTypes = {
	book: PropTypes.object.isRequired,
};
export default BookComponent;
