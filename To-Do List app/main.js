var data = (localStorage.getItem("todoList")) ? JSON.parse(localStorage.getItem("todoList")) : {
	todo : [],
	completed : []
}
//SVG IMAGES 
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="nofill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
//RUN THE BELOW FUNCTION "FIRST" WHEN window startup
rendertodoList();

document.getElementById("add").addEventListener("click", abc);
document.getElementById("item").addEventListener("keydown", xyz);

function abc() {
	var value = document.getElementById("item").value;
	if(value) {
		additem(value);
	}
}
function xyz(e) {
	value = this.value;
	if(e.code === "Enter" && value) {
		additem(value);
	}
}
function additem(value) {
	additemtodo(value);
	document.getElementById("item").value = "";
	data.todo.push(value);
	dataObjectupdated();

}

function dataObjectupdated() {
	localStorage.setItem("todoList", JSON.stringify(data));
}

function rendertodoList() {
	if(!data.todo.length && !data.completed.length) return;  //if data object is empty, i.e if both todo and completed array are empty, return back
	
	for(var i = 0; i < data.todo.length; i++ ) {
		var value = data.todo[i]; //sending every element of todo arrayto the function 
		additemtodo(value);
	}
	for(var j = 0; j < data.completed.length; j++ ) {
		var value = data.completed[j]; //sending every element of completed arrayto the function 
		additemtodo(value, true);
	}	
}

function additemtodo(item, completed) {
	var ul = (completed) ? document.getElementById("completed") : document.getElementById("todo");
	var li = document.createElement("li");
	li.innerText = item;

	var buttons = document.createElement("div");
	buttons.classList.add("buttons");

	var remove = document.createElement("button");
	remove.classList.add("remove");
	remove.innerHTML = removeSVG;
	remove.addEventListener("click", removeItem);

	var complete = document.createElement("button");
	complete.classList.add("complete");
	complete.innerHTML = completeSVG;
	complete.addEventListener("click", completeItem);

	ul.insertBefore(li, ul.childNodes[0]);
	li.appendChild(buttons);
	buttons.appendChild(remove);
	buttons.appendChild(complete);
}

function removeItem() {
	var li = this.parentNode.parentNode; //"this" will always return the button of the PRESENT li clicked. 1stparentNode will return the div directly outside the button, that is the one with the class "buttons". 2nd parentNode will return the "li" within which the div is present which we wanna delete !!
	var ul = li.parentNode; //will return the ul withinwhich this li is present
	var id = ul.id;
	var value = li.innerText;
	if(id === "todo") {
	   data.todo.splice(data.todo.indexOf(value), 1);
	} else {
	 	 data.completed.splice(data.completed.indexOf(value), 1);
	}
	dataObjectupdated();
	ul.removeChild(li); //we are jumping on ul to delete li
}
function completeItem() {
	var item = this.parentNode.parentNode; 
	var parent = item.parentNode;
	var id = parent.id;
	var target = (id === "todo") ? document.getElementById("completed") : document.getElementById("todo"); //we are checking if the item is to be added to "completed" OR "todo" list
	var value = item.innerText;
	if ( id == "todo") {
		data.completed.push(value);
		data.todo.splice(data.todo.indexOf(value), 1);
	} else {
		data.todo.push(value);
		data.completed.splice(data.completed.indexOf(value), 1);
	}
	dataObjectupdated();
	
	
	parent.removeChild(item); //means remove from the present loction &
	target.insertBefore(item, target.childNodes[0]); // add it to the other list
}