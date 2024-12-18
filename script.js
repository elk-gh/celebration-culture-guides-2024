let currentQuestionIndex = 0;
let questions = [];

// Cargar preguntas desde el archivo JSON
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        showQuestion();
    });

// Mostrar una pregunta
function showQuestion() {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const currentQuestion = questions[currentQuestionIndex];

    // Mostrar la pregunta
    questionElement.textContent = currentQuestion.question;

    // Limpiar respuestas previas
    answersElement.innerHTML = '';

    // Mezclar respuestas y mostrarlas
    const shuffledAnswers = currentQuestion.answers.sort(() => Math.random() - 0.5);
    shuffledAnswers.forEach(answer => {
        const div = document.createElement('div');
        div.textContent = answer.text;
        div.className = 'slds-box slds-theme_default';
        div.onclick = () => checkAnswer(answer.correct, div);
        answersElement.appendChild(div);
    });
}

// Validar respuesta
function checkAnswer(isCorrect, element) {
    if (isCorrect) {
        element.classList.add('slds-theme_success');
        element.innerHTML += ' ✅';
    } else {
        element.classList.add('slds-theme_error');
        element.innerHTML += ' ❌';
    }

    setTimeout(() => {
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
        showQuestion();
    }, 1500);
}
