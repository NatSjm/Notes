import { initHandlers } from './list/initHandlers';
import { renderNotes } from './list/renderer';
import Collection from './list/Collection';
import './index.scss';


document.addEventListener('DOMContentLoaded', () => {
	const notes = Collection.getInstance().getNotes();
	renderNotes(notes);
	initHandlers();
});

