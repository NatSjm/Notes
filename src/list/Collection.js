const Collection = (() => {
	const initialCreatedAt = new Date().toLocaleDateString();

	let notes = [
		{
			id: 1,
			title: 'Note1',
			content: 'Content',
			category: 'idea',
			isArchived: false,
			createdAt: initialCreatedAt
		},
		{
			id: 2,
			title: 'Note2',
			content: 'Content',
			category: 'task',
			isArchived: true,
			createdAt: initialCreatedAt
		},
		{
			id: 3,
			title: 'Note3',
			content: 'Content',
			category: 'idea',
			isArchived: false,
			createdAt: initialCreatedAt
		},
		{
			id: 4,
			title: 'Note4',
			content: 'Content',
			category: 'thought',
			isArchived: false,
			createdAt: initialCreatedAt
		},
		{
			id: 5,
			title: 'Note5',
			content: 'Content5',
			category: 'task',
			isArchived: false,
			createdAt: initialCreatedAt

		},
		{
			id: 6,
			title: 'Note6',
			content: 'Content 28.02.2023 math, 28-02-2099 latin, 03/09/2015 english',
			category: 'idea',
			isArchived: false,
			createdAt: initialCreatedAt
		},
		{
			id: 7,
			title: 'Note7',
			content: 'Content',
			category: 'task',
			isArchived: false,
			createdAt: initialCreatedAt
		}
	];
	let instance;
	let updateId = null;

	const setUpdateId = (id) => {
		updateId = id;
	};

	const createNote = ({title, content, category}) => {
		const timestamp = Date.now();
		const newNote = {
			id: timestamp,
			title,
			content,
			category,
			createdAt: (new Date(timestamp)).toLocaleDateString(),
			isArchived: false
		};
		const newNotes = [...notes, newNote];
		notes = newNotes;
		return newNotes;
	};

	const updateNote = ({title, content, category}) => {
		if (!updateId) return;

		const updatedNoteIndex = notes.findIndex(({id}) => id === updateId);

		const updatedTask = notes[updatedNoteIndex];
		const newTask = {
			...updatedTask,
			title,
			content,
			category
		};
		notes[updatedNoteIndex] = newTask;
		return notes;
	};

	const toggleArchived = (noteId) => {
		const noteIndex = notes.findIndex(({id}) => id === noteId);
		const note = notes[noteIndex];
		const newNote = {
			...note,
			isArchived: !note.isArchived
		};
		notes[noteIndex] = newNote;
		return notes;
	};

	const deleteNote = (noteId) => {
		const newNotes = notes.filter(({id}) => id !== noteId);
		notes = newNotes;
		return newNotes;
	};

	const getNotes = () => {
		return notes;
	};

	const getUpdateId = () => updateId;

	const addTask = (task) => {
		notes.push(task);
	};

	const createInstance = () => {
		return {
			getNotes,
			addTask,
			getUpdateId,
			setUpdateId,
			updateNote,
			createNote,
			deleteNote,
			toggleArchived
		}
	};
	return {
		getInstance: () => instance || (instance = createInstance())
	}
})();

export default Collection;
