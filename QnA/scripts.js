// Retrieve questions and answers from localStorage
const loadQuestions = () => {
  const savedQuestions = JSON.parse(localStorage.getItem('questions'));
  if (savedQuestions) {
    savedQuestions.forEach(question => {
      displayQuestion(question);
    });
  }
};

// Display the question and answers
const displayQuestion = (questionData) => {
  const questionContainer = document.createElement('div');
  questionContainer.classList.add('question');

  questionContainer.innerHTML = `
    <h3>Post:</h3>
    <p>${questionData.questionText}</p>
    <button class="delete-question-btn">Delete Post</button>
    <h4>Comments:</h4>
    <div class="answers">
      ${questionData.answers.map(answer => `<div class="answer"><p>${answer}</p></div>`).join('')}
    </div>
    <textarea class="answer-input" placeholder="Reply here..." rows="4"></textarea>
    <button class="answer-btn">Post Answer</button>
  `;

  // Append the question to the questions container
  document.getElementById('questions-container').appendChild(questionContainer);

  // Add delete functionality
  const deleteButton = questionContainer.querySelector('.delete-question-btn');
  deleteButton.addEventListener('click', () => {
    questionContainer.remove(); // Remove the question from the UI
    saveQuestions(); // Update localStorage after deletion
  });
};

// Save questions to localStorage
const saveQuestions = () => {
  const questions = [];
  document.querySelectorAll('.question').forEach((questionElement) => {
    const questionText = questionElement.querySelector('p').innerText;
    const answers = [];
    questionElement.querySelectorAll('.answer p').forEach(answer => {
      answers.push(answer.innerText);
    });
    questions.push({ questionText, answers });
  });

  localStorage.setItem('questions', JSON.stringify(questions));
};

// Handle asking a question
document.getElementById('ask-question-btn').addEventListener('click', function () {
  const questionText = document.getElementById('question-input').value.trim();

  if (questionText) {
    const questionData = { questionText, answers: [] };

    displayQuestion(questionData);
    saveQuestions();

    // Clear the question input field
    document.getElementById('question-input').value = '';
  } else {
    alert('Please enter a question!');
  }
});

// Handle posting an answer
document.getElementById('questions-container').addEventListener('click', function (event) {
  if (event.target && event.target.classList.contains('answer-btn')) {
    const answerInput = event.target.previousElementSibling;
    const answerText = answerInput.value.trim();

    if (answerText) {
      const questionElement = event.target.closest('.question');
      const answersContainer = questionElement.querySelector('.answers');
      const newAnswer = document.createElement('div');
      newAnswer.classList.add('answer');
      newAnswer.innerHTML = `<p>${answerText}</p>`;

      answersContainer.appendChild(newAnswer);
      answerInput.value = '';

      // Save questions after posting an answer
      saveQuestions();
    } else {
      alert('Please write an answer!');
    }
  }
});

// Load saved questions on page load
window.onload = loadQuestions;
