/************* Module Basic *****************/
//CommonJs Module Syntax
// const person = require('./mymodule');
// console.log(person.name);

//ES2015 Module
//import { person, sayHello }  from "./mymodule2";
//import * as mod from "./mymodule2";
//import gretting from './mymodule2';
// console.log(mod.person.name);
// console.log(mod.sayHello());
//console.log(gretting);

/************* Module Basic End *****************/

import { http }  from "./http";
import { ui }  from "./ui";
//Get Posts on Dom LOad
document.addEventListener('DOMContentLoaded',getPosts);

//Listen For Add Post
document.querySelector('.post-submit').addEventListener('click',submitPost);

//Listen For Edit State
document.querySelector('#posts').addEventListener('click',enableEdit);

//Listen for cancel
document.querySelector('.card-form').addEventListener('click',cancelEdit);

//Listen for Delete
document.querySelector('#posts').addEventListener('click',deleteEvent);


//Get Post
function getPosts () {
	http.get('http://localhost:3000/posts')
	.then(data => ui.showPosts(data))
	.catch(err => console.log(err));
}


//Submit Post
function submitPost () {
	const title = document.querySelector('#title').value;
	const body = document.querySelector('#body').value;
	const id = document.querySelector('#id').value;
	const data = {
			title,
			body
		}
	if(title === '' || body === ''){
		ui.showAlert('Please Fill In All Fields','alert alert-danger');
	}else{
		if (id === '') {
			// Create Post
			http.post('http://localhost:3000/posts',data)
			.then(data => {
				ui.showAlert('Post Added','alert alert-success');
				ui.clearFields();
				getPosts();  
			})
			.catch(err => console.log(err));
		}else{
			//Update Post
			http.put(`http://localhost:3000/posts/${id}`,data)
			.then(data => {
				ui.showAlert('Post Updated','alert alert-success');
				ui.changeFormState('add');
				getPosts();  
			})
			.catch(err => console.log(err));
		}
	    
		
	}
	
}


//Enable Edit
function enableEdit (e) {
	if (e.target.parentElement.classList.contains('edit')) {
		const id = e.target.parentElement.dataset.id;
		const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;
        //console.log(title);
		const data = {
			id,
			title,
			body
		}
		//Fill The Form With The Current Post
		ui.fillForm(data);
	} else {
		// statement
	}
	e.preventDefault();
}


function cancelEdit (e) {
	if (e.target.classList.contains('post-cancel')) {
		ui.changeFormState('add');
	} else {
		// statement
	}

	e.preventDefault();
}

function deleteEvent (e) {
	if (e.target.parentElement.classList.contains('delete')) {
		const id = e.target.parentElement.dataset.id;
		console.log('Delete Item');
		http.delete(`http://localhost:3000/posts/${id}`)
			.then(data => {
				ui.showAlert('Post Deleted','alert alert-danger');
				ui.changeFormState('add');
				getPosts();  
			})
			.catch(err => console.log(err));
	}
}