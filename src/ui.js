class UI  {
	constructor() {
		this.posts = document.querySelector('#posts');
		this.titleInput = document.querySelector('#title');
		this.bodyInput = document.querySelector('#body');
		this.idInput = document.querySelector('#id');
		this.postSubmit = document.querySelector('.post-submit');
		this.formState = 'add';
	}

	showPosts(posts){
       let output = '';
       posts.forEach( (post) => {
       	 output += `
          <div class="card mb-3">
            <div class="card-body">
               <h4 class="card-title">${post.title}</h4>
               <p class="card-text">${post.body}</p>

                <a href="#" class="edit card-link" data-id="${post.id}">
                 <i class="fa fa-pencil"></i>
                </a>

	            <a href="#" class="delete card-link" data-id="${post.id}">
	              <i class="fa fa-remove"></i>
	            </a>

            </div>
          </div>
       	 `
       });

       this.posts.innerHTML = output;
	}

	showAlert(msg , className){
        this.clearAlert();

        //Create div 
		const div = document.createElement('div');
		
		//Add Class
		div.className = className;
		
		//Add Text
		div.appendChild(document.createTextNode(msg));
		
		//Get Parent
		const container = document.querySelector('.postsContainer');

		const posts = document.querySelector('#posts');
	   
	    //insert alert
		container.insertBefore(div, posts);

		//Timeout After 3 sec
		setTimeout(() => {
			this.clearAlert(); 
		},3000);

	}

	clearAlert(){
        const currentAlert = document.querySelector('.alert');
        if (currentAlert) {
        	currentAlert.remove();
        } 
	}

	clearFields(){
       this.titleInput.value = '';
       this.bodyInput.value = '';
	}

	fillForm(data){
		this.titleInput.value = data.title;
		this.bodyInput.value = data.body;
		this.idInput.value = data.id;

		this.changeFormState('edit');
	}


	clearIdInput(){
		this.idInput.value = '';
	}

	
	changeFormState(type){
       if (type === 'edit') {
       	this.postSubmit.textContent = 'Update Post';
       	this.postSubmit.className = 'post-submit btn btn-warning btn-block';

       	//Crete Cancel Button
       	const button = document.createElement('button');
       	button.className = 'post-cancel btn btn-light btn-block';
       	button.appendChild(document.createTextNode('Cancle Edit'));

       	//Get The Parent
       	const cardForm = document.querySelector('.card-form');
       	// Get element to insert before
        const formEnd = document.querySelector('.form-end');
        // Insert cancel button
       cardForm.insertBefore(button, formEnd);
       } else {
       	 this.postSubmit.textContent = 'Post It';
       	 this.postSubmit.className = 'post-submit btn btn-primary btn-block';

       	 //Remove Cancel Button
       	 if (document.querySelector('.post-cancel')) {
       	 	document.querySelector('.post-cancel').remove();
       	 }

       	 //Clear Id From The Hidden Field
       	 this.clearIdInput();
       	 //Clear The Text Fields
       	 this.clearFields();
       }
	}

	
}

export  const ui = new UI();