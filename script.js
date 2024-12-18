const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");

let questions = [];
let currentQuestionIndex = 0;

async function loadQuestions() {
    try {
        const response = await fetch("questions.json");
        questions = await response.json();
        startQuiz();
    } catch (error) {
        console.error("Error al cargar las preguntas:", error);
    }
}

function startQuiz() {
    currentQuestionIndex = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    setStatusClass(selectedButton, correct);
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.disabled = true;
    });
    setTimeout(() => {
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
        showQuestion();
    }, 1000);
}

function setStatusClass(element, correct) {
    element.classList.add(correct ? "correct" : "wrong");
}

// Cargar las preguntas al iniciar
loadQuestions();
