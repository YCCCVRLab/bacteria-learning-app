const quiz = {
    currentQuestionIndex: 0,
    score: 0,
    questions: [],

    init: function () {
        if (window.bacteriaData) {
            this.questions = window.bacteriaData.quiz;
            this.renderQuestion();
        }
    },

    renderQuestion: function () {
        const container = document.getElementById('quiz-content');
        const scoreDisplay = document.getElementById('quiz-score');

        if (!container) return;

        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults(container);
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        scoreDisplay.textContent = `Score: ${this.score}`;

        container.innerHTML = `
            <h3 style="margin-bottom: 20px; font-size: 1.5rem;">${question.question}</h3>
            <div class="options-grid">
                ${question.options.map((option, index) => `
                    <button class="quiz-option" onclick="quiz.checkAnswer(${index}, this)">
                        ${option}
                    </button>
                `).join('')}
            </div>
        `;
    },

    checkAnswer: function (selectedIndex, buttonElement) {
        const question = this.questions[this.currentQuestionIndex];
        const options = document.querySelectorAll('.quiz-option');

        // Disable all buttons
        options.forEach(btn => btn.disabled = true);

        if (selectedIndex === question.correct) {
            buttonElement.classList.add('correct');
            this.score += 10;
        } else {
            buttonElement.classList.add('incorrect');
            // Highlight correct answer
            options[question.correct].classList.add('correct');
        }

        // Update score display
        document.getElementById('quiz-score').textContent = `Score: ${this.score}`;

        // Next question after delay
        setTimeout(() => {
            this.currentQuestionIndex++;
            this.renderQuestion();
        }, 1500);
    },

    showResults: function (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h2 style="font-size: 2.5rem; margin-bottom: 20px; color: var(--primary);">Quiz Complete!</h2>
                <p style="font-size: 1.5rem; margin-bottom: 30px;">Final Score: ${this.score} / ${this.questions.length * 10}</p>
                <button class="btn-primary" onclick="quiz.restart()">Try Again</button>
            </div>
        `;
    },

    restart: function () {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.renderQuestion();
    }
};

window.quiz = quiz;
