let currentQuestionIndex = 0;
let questions = [];

// Cargar preguntas desde el archivo JSON
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        showQuestion();
    });

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-button', 'slds-button');
        button.addEventListener('click', () => selectAnswer(button, answer.correct));
        answersElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    answersElement.innerHTML = '';
}

function selectAnswer(button, isCorrect) {
    const buttons = document.querySelectorAll('.answer-button');
    buttons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        button.classList.add('correct');
    } else {
        button.classList.add('wrong');
    }

    nextButton.style.display = 'block';
    nextButton.addEventListener('click', goToNextQuestion);
}

function goToNextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    showQuestion();
}
