const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let questions = [];
let currentQuestionIndex = 0;

async function loadQuestions() {
    try {
        const response = await fetch("questions.json");
        questions = await response.json();
        showQuestion();
    } catch (error) {
        console.error("Error al cargar las preguntas:", error);
    }
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
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
    });
    nextButton.style.display = "block";
}

function setStatusClass(element, correct) {
    element.style.backgroundColor = correct ? "#28A745" : "#DC3545";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        alert("¡Quiz completado!");
        currentQuestionIndex = 0;
        showQuestion();
    }
});

// Cargar las preguntas al iniciar la aplicación
loadQuestions();
