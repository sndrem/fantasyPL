$(function() {
	const inputContainer = document.querySelector(".inputFieldContainer");
	const numberOfQuestions = document.querySelector('#numberOfQuestions');
	const saveButton = document.querySelector("#saveTippelappen");
	const filterButton = document.querySelector('.filterButton');

	if(typeof(Storage) === undefined) {
		alert("Ikke bruk en dårlig nettleser. Bruk Chrome feks.");
		return;
	}

	var localStorageTippelappen = localStorage.getItem('tippelappen');
	if(localStorageTippelappen) {

		const answerList = document.querySelector('.answerList');
		const correctAnswerContainer = document.querySelector('.correctAnswerContainer');
		if(answerList && correctAnswerContainer) {
			
			localStorageTippelappen = JSON.parse(localStorageTippelappen);

			localStorageTippelappen.forEach((question, id) => {
				const correctAnswerElement = document.createElement('input');
				correctAnswerElement.type = 'text';
				correctAnswerElement.placeholder = question.question;
				correctAnswerElement.className = 'fullWidth';
				correctAnswerElement.dataset.id = id;
				correctAnswerContainer.appendChild(correctAnswerElement);
			})

			users.forEach(user => {
				const answerElement = document.createElement("li");
				answerElement.innerHTML = `${user.name} - ${user.answers.join(", ")}`;
				answerList.appendChild(answerElement);
			});	
		}

	}


	createInputBoxes(numberOfQuestions);

	function createInputBoxes(numberOfBoxes) {
		if(!numberOfBoxes) return;
		inputContainer.innerHTML = '';
		for(var i = 1; i <= numberOfBoxes.value; i++) {
			inputContainer.appendChild(createQuestionBox(i))
		}
	}

	function createQuestionBox(id) {
		const formGroup = document.createElement("div");
		formGroup.classList = 'form-group tippelappQuestionBox';

		const label = document.createElement("label");
		label.innerHTML = `Spørsmål ${id}`;

		const inputField = document.createElement("input");
		inputField.type = "text";
		inputField.className = 'form-control questionInputField';

		formGroup.appendChild(label);
		formGroup.appendChild(inputField);
		
		return formGroup;
	}

	function updateQuestionBoxes() {
		createInputBoxes(numberOfQuestions.value || 0);
	}

	function saveTippelappen() {
		const questionInputs = Array.from(document.querySelectorAll('.questionInputField'));

		let questions = questionInputs.map((question, index) => {
			return {
				question: question.value
			}
		});

		localStorage.setItem('tippelappen', JSON.stringify(questions));
		
	}

	function filterUsers() {
		const correctAnswers = Array.from(document.querySelectorAll('.correctAnswerContainer input')).map(ele => ele.value);

		const correctUsers = users.filter(user => {
			
			return user.answers.every((answer, index) => {
				return answer.toLowerCase() == correctAnswers[index].toLowerCase();
			})
		});

		// Show correctUsers here
		
	}



	if(numberOfQuestions) {
		numberOfQuestions.addEventListener('change', updateQuestionBoxes);	
		saveButton.addEventListener('click', saveTippelappen);
	}
	
	
	filterButton.addEventListener('click', filterUsers);
});	