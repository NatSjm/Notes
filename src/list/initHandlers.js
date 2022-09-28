import { renderNotes } from './renderer';
import Collection from './Collection';
import { addBox, popupBox, popupTitle, titleTag, contentTag, categoryTag, addBtn, closeIcon } from './DOMelements';


export const initHandlers = () => {

	addBox.addEventListener("click", () => {
		popupTitle.innerText = "Add a new Note";
		addBtn.innerText = "Add Note";
		popupBox.classList.add("show");
		document.querySelector("body").style.overflow = "hidden";
		if (window.innerWidth > 660) titleTag.focus();
	});

	closeIcon.addEventListener("click", () => {
		Collection.getInstance().setUpdateId(null);
		titleTag.value = contentTag.value = "";
		popupBox.classList.remove("show");
		document.querySelector("body").style.overflow = "auto";
	});

	addBtn.addEventListener("click", async (e) => {
		e.preventDefault();
		let notes;
		const updateId = Collection.getInstance().getUpdateId();
		let title = titleTag.value.trim(),
			content = contentTag.value.trim(),
			category = categoryTag.value;

		if (title || description) {
			let noteInfo = {title, content, category};

			if (!updateId) {
				notes = await Collection.getInstance().createNote(noteInfo);
			} else {
				notes = await Collection.getInstance().updateNote(noteInfo);
			}
			renderNotes(notes);
			closeIcon.click();
		}
	});
};
