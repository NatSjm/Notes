import Collection from './Collection';
import { addBox,  popupTitle, titleTag, contentTag, categoryTag, addBtn, } from "./DOMelements";



export const editNote = (id, title, filteredContent, category) => (e) => {
    e.preventDefault();
    let content = filteredContent.replaceAll('<br/>', '\r\n');
    Collection.getInstance().setUpdateId(id);
    addBox.click();
    titleTag.value = title;
    contentTag.value = content;
    categoryTag.value = category;
    popupTitle.innerText = "Update a Note";
    addBtn.innerText = "Update Note";
};


