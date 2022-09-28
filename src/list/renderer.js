import { editNote } from './editNote';
import Collection from './Collection';
import { getCategoryName } from './helpers';

const notesContainer = document.querySelector('#notes-list');
const archiveContainer = document.querySelector('#archive');
const categoriesContainer = document.querySelector('#categories');
const archiveHeader = document.querySelector('.archive-header');


const onDeleteNote = id => e => {
	e.preventDefault();
	const newNotes = Collection.getInstance().deleteNote(id);
	renderNotes(newNotes);
};
const archiveNote = id => e => {
	e.preventDefault();
	const newNotes = Collection.getInstance().toggleArchived(id);
	renderNotes(newNotes);
};


const renderListItem = (container) => (note) => {
	let filterCont = note.content.replaceAll("\n", '<br/>');
	let mentionedDates = (filterCont.match(/\d{1,2}\D\d{1,2}\D(\d{4}|\d{2})/g) || []).join(', ');

	let li = document.createElement('li'),
		details = document.createElement('div'),
		titleBlock = document.createElement('div'),
		contentBlock = document.createElement('div'),
		dateBlock = document.createElement('div'),
		categoryBlock = document.createElement('div'),
		mentionsBlock = document.createElement('div'),
		controlsBlock = document.createElement('div'),
		edit = document.createElement('button'),
		del = document.createElement('button'),
		archive = document.createElement('button');
	edit.innerHTML = `<i class="uil uil-pen"></i>`;
	del.innerHTML = `<i class="uil uil-trash-alt"></i>`;
	archive.innerHTML = !note.isArchived ? '<i class="uil uil uil-import"></i>' : '<i class="uil uil-upload"></i>';

	li.classList.add('note');
	details.classList.add('details');

	titleBlock.textContent = note.title;
	contentBlock.textContent = filterCont;
	dateBlock.textContent = note.createdAt;
	categoryBlock.textContent = getCategoryName(note.category);
	mentionsBlock.textContent = mentionedDates;

	titleBlock.classList.add('note-title');


	edit.addEventListener('click', editNote(note.id, note.title, note.content, note.category));
	del.addEventListener('click', onDeleteNote(note.id));
	archive.addEventListener('click', archiveNote(note.id));

	controlsBlock.appendChild(edit);
	controlsBlock.appendChild(del);
	controlsBlock.appendChild(archive);

	controlsBlock.classList.add('controls');


	details.appendChild(titleBlock);
	details.appendChild(dateBlock);
	details.appendChild(categoryBlock);
	details.appendChild(contentBlock);
	details.appendChild(mentionsBlock);
	li.appendChild(details);
	li.appendChild(controlsBlock);

	container.appendChild(li);
};

export const renderCategories = ({idea, task, thought}) => {
	let CategoriesTable = `                   
                     <li>
                        <div>
                            Tasks
                        </div>
                       <div>${task.unArchived}</div>
                       <div>${task.archived}</div>
                    </li>
                    <li>
                        <div>
                            Ideas
                        </div>
                       <div>${idea.unArchived}</div>
                       <div>${idea.archived}</div>
                    </li>
                  <li>
                        <div>
                            Random thought
                        </div>
                       <div>${thought.unArchived}</div>
                       <div>${thought.archived}</div>
                    </li>
`;
	categoriesContainer.insertAdjacentHTML("beforeend", CategoriesTable);
};


export const renderNotes = async (notes) => {
	if (!notes) return;

	const unArchivedNotes = [];
	const archivedNotes = [];
	const categories = {
		'task': {
			archived: 0,
			unArchived: 0
		},
		'idea': {
			archived: 0,
			unArchived: 0
		},
		'thought': {
			archived: 0,
			unArchived: 0
		}
	};

	try {
		await notes.forEach((note) => {
			if (note.isArchived) {
				archivedNotes.push(note);
				categories[note.category].archived++;
			} else {
				unArchivedNotes.push(note);
				categories[note.category].unArchived++;
			}
		});
		notesContainer.innerHTML = '';
		categoriesContainer.innerHTML = '';
		archiveContainer.innerHTML = '';
		unArchivedNotes.forEach(renderListItem(notesContainer));
		renderCategories(categories);

		if (archivedNotes.length > 0) {
			archiveHeader.classList.add('show');
		} else {
			(archiveHeader?.classList || {}).remove('show');
		}
		archivedNotes.forEach(renderListItem(archiveContainer));
	} catch (error) {
		console.log(error);
	}
};
