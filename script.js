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
        const li = document.createElement('li');
        li.textContent = answer.text;
        li.className = 'slds-p-vertical_x-small slds-theme_alert-texture slds-border_bottom';
        li.onclick = () => checkAnswer(answer.correct, li);
        answersElement.appendChild(li);
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
