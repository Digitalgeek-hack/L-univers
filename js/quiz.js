// MUZAN SIGMA TECH - Quiz System

class QuizSystem {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.questions = this.getQuizQuestions();
        this.profiles = this.getProfiles();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadQuestion();
    }

    setupEventListeners() {
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevQuestion());
        }
    }

    getQuizQuestions() {
        return [
            {
                id: 1,
                question: "Quel est votre niveau d'expérience en programmation ?",
                options: [
                    { value: "beginner", text: "Débutant - Je commence tout juste", points: { beginner: 3, designer: 1 } },
                    { value: "intermediate", text: "Intermédiaire - J'ai quelques bases", points: { beginner: 1, hacker: 2, automation: 2 } },
                    { value: "advanced", text: "Avancé - Je maîtrise plusieurs langages", points: { hacker: 3, automation: 3 } },
                    { value: "expert", text: "Expert - Je développe professionnellement", points: { hacker: 4, automation: 4 } }
                ]
            },
            {
                id: 2,
                question: "Qu'est-ce qui vous intéresse le plus ?",
                options: [
                    { value: "security", text: "Cybersécurité et hacking éthique", points: { hacker: 4 } },
                    { value: "automation", text: "Automatisation et création de bots", points: { automation: 4 } },
                    { value: "design", text: "Design et expérience utilisateur", points: { designer: 4 } },
                    { value: "learning", text: "Apprendre les bases de la programmation", points: { beginner: 4 } }
                ]
            },
            {
                id: 3,
                question: "Quel type de projets vous attire le plus ?",
                options: [
                    { value: "pentest", text: "Tests de pénétration et audit de sécurité", points: { hacker: 3 } },
                    { value: "bots", text: "Développement de bots et scripts", points: { automation: 3 } },
                    { value: "websites", text: "Création de sites web et interfaces", points: { designer: 3, beginner: 2 } },
                    { value: "tools", text: "Outils et utilitaires pratiques", points: { automation: 2, hacker: 2 } }
                ]
            },
            {
                id: 4,
                question: "Combien de temps pouvez-vous consacrer à l'apprentissage par semaine ?",
                options: [
                    { value: "1-3h", text: "1-3 heures", points: { beginner: 2, designer: 1 } },
                    { value: "4-8h", text: "4-8 heures", points: { beginner: 1, automation: 2, designer: 2 } },
                    { value: "9-15h", text: "9-15 heures", points: { automation: 3, hacker: 2 } },
                    { value: "15h+", text: "Plus de 15 heures", points: { hacker: 4, automation: 4 } }
                ]
            },
            {
                id: 5,
                question: "Quel est votre objectif principal ?",
                options: [
                    { value: "career", text: "Faire carrière dans la cybersécurité", points: { hacker: 4 } },
                    { value: "freelance", text: "Devenir freelance en développement", points: { automation: 3, designer: 3 } },
                    { value: "hobby", text: "Apprendre par passion personnelle", points: { beginner: 3, designer: 2 } },
                    { value: "business", text: "Créer ma propre entreprise tech", points: { automation: 4, hacker: 2 } }
                ]
            }
        ];
    }

    getProfiles() {
        return {
            beginner: {
                title: "Explorateur Tech",
                description: "Vous êtes au début de votre parcours technologique. Parfait pour commencer par les bases !",
                color: "#00ff88",
                recommendations: [
                    "Tutoriels de programmation pour débutants",
                    "Cours d'introduction au développement web",
                    "Projets pratiques simples",
                    "Communauté d'entraide pour débutants"
                ],
                nextSteps: [
                    "Commencez par apprendre HTML/CSS",
                    "Découvrez JavaScript",
                    "Créez votre premier projet web",
                    "Rejoignez notre communauté débutant"
                ]
            },
            hacker: {
                title: "Hacker Éthique",
                description: "Vous avez l'âme d'un expert en cybersécurité. La sécurité informatique n'a pas de secret pour vous !",
                color: "#ff4444",
                recommendations: [
                    "Cours avancés de cybersécurité",
                    "Challenges de hacking éthique",
                    "Outils d'audit de sécurité",
                    "Certifications en cybersécurité"
                ],
                nextSteps: [
                    "Participez aux challenges CTF",
                    "Apprenez les techniques de pentesting",
                    "Maîtrisez les outils comme Kali Linux",
                    "Obtenez des certifications (CEH, OSCP)"
                ]
            },
            automation: {
                title: "Maître de l'Automatisation",
                description: "Vous excellez dans la création de bots et l'automatisation. L'efficacité est votre maître-mot !",
                color: "#0066ff",
                recommendations: [
                    "Tutoriels de création de bots",
                    "Scripts d'automatisation avancés",
                    "APIs et intégrations",
                    "Outils de déploiement automatisé"
                ],
                nextSteps: [
                    "Créez votre premier bot Discord",
                    "Automatisez vos tâches quotidiennes",
                    "Apprenez les APIs populaires",
                    "Développez des solutions sur mesure"
                ]
            },
            designer: {
                title: "Créateur Visuel",
                description: "Vous avez l'œil artistique et technique. Le design et l'expérience utilisateur sont vos domaines !",
                color: "#8a2be2",
                recommendations: [
                    "Cours de design UI/UX",
                    "Templates et ressources créatives",
                    "Outils de prototypage",
                    "Tendances design modernes"
                ],
                nextSteps: [
                    "Maîtrisez Figma et les outils de design",
                    "Créez votre portfolio en ligne",
                    "Apprenez les principes UX",
                    "Développez votre style unique"
                ]
            }
        };
    }

    loadQuestion() {
        const quizContent = document.getElementById('quizContent');
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');

        if (!quizContent) return;

        const question = this.questions[this.currentQuestion];
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;

        // Update progress
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        if (progressText) {
            progressText.textContent = `Question ${this.currentQuestion + 1}/${this.questions.length}`;
        }

        // Update buttons
        if (prevBtn) {
            prevBtn.disabled = this.currentQuestion === 0;
        }
        if (nextBtn) {
            nextBtn.textContent = this.currentQuestion === this.questions.length - 1 ? 'Terminer' : 'Suivant';
        }

        // Load question content
        quizContent.innerHTML = `
            <div class="quiz-question">
                <h3>${question.question}</h3>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <div class="quiz-option" data-value="${option.value}">
                            ${option.text}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Add event listeners to options
        const options = quizContent.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                this.answers[this.currentQuestion] = option.dataset.value;
            });
        });

        // Restore previous answer if exists
        if (this.answers[this.currentQuestion]) {
            const selectedOption = quizContent.querySelector(`[data-value="${this.answers[this.currentQuestion]}"]`);
            if (selectedOption) {
                selectedOption.classList.add('selected');
            }
        }
    }

    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.loadQuestion();
        } else {
            this.calculateResults();
        }
    }

    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.loadQuestion();
        }
    }

    calculateResults() {
        const scores = {
            beginner: 0,
            hacker: 0,
            automation: 0,
            designer: 0
        };

        // Calculate scores based on answers
        this.answers.forEach((answer, questionIndex) => {
            const question = this.questions[questionIndex];
            const selectedOption = question.options.find(opt => opt.value === answer);
            
            if (selectedOption && selectedOption.points) {
                Object.keys(selectedOption.points).forEach(profile => {
                    scores[profile] += selectedOption.points[profile];
                });
            }
        });

        // Find the profile with the highest score
        const topProfile = Object.keys(scores).reduce((a, b) => 
            scores[a] > scores[b] ? a : b
        );

        this.displayResults(topProfile, scores);
        this.saveResults(topProfile, scores);
    }

    displayResults(profileType, scores) {
        const quizContainer = document.getElementById('quizContainer');
        const quizResults = document.getElementById('quizResults');
        const profileResult = document.getElementById('profileResult');
        const recommendations = document.getElementById('recommendations');

        if (!quizResults || !profileResult || !recommendations) return;

        const profile = this.profiles[profileType];

        // Hide quiz, show results
        if (quizContainer) {
            quizContainer.style.display = 'none';
        }
        quizResults.style.display = 'block';

        // Display profile result
        profileResult.innerHTML = `
            <div class="profile-badge" style="background: ${profile.color}">
                ${profile.title}
            </div>
            <p>${profile.description}</p>
            <div class="profile-scores">
                ${Object.keys(scores).map(key => `
                    <div class="score-item">
                        <span class="score-label">${this.profiles[key].title}</span>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${(scores[key] / Math.max(...Object.values(scores))) * 100}%; background: ${this.profiles[key].color}"></div>
                        </div>
                        <span class="score-value">${scores[key]}</span>
                    </div>
                `).join('')}
            </div>
        `;

        // Display recommendations
        recommendations.innerHTML = `
            <h4>Recommandations personnalisées</h4>
            <div class="recommendations-grid">
                ${profile.recommendations.map(rec => `
                    <div class="recommendation-card">
                        <h5>${rec}</h5>
                    </div>
                `).join('')}
            </div>
            <h4>Prochaines étapes</h4>
            <ul class="next-steps">
                ${profile.nextSteps.map(step => `
                    <li>${step}</li>
                `).join('')}
            </ul>
            <div class="result-actions">
                <button class="btn-primary" onclick="window.muzanApp.showNotification('Profil sauvegardé !', 'success')">
                    Sauvegarder mon profil
                </button>
                <button class="btn-secondary" onclick="location.reload()">
                    Refaire le quiz
                </button>
            </div>
        `;

        // Add animation
        quizResults.classList.add('animate-fadeInUp');
    }

    saveResults(profileType, scores) {
        const results = {
            profile: profileType,
            scores: scores,
            date: new Date().toISOString(),
            answers: this.answers
        };

        localStorage.setItem('muzanQuizResults', JSON.stringify(results));

        // Update user profile if logged in
        const currentUser = JSON.parse(localStorage.getItem('muzanUser') || '{}');
        if (currentUser.username) {
            currentUser.profile = profileType;
            currentUser.quizScores = scores;
            localStorage.setItem('muzanUser', JSON.stringify(currentUser));
        }
    }

    getStoredResults() {
        const stored = localStorage.getItem('muzanQuizResults');
        return stored ? JSON.parse(stored) : null;
    }

    resetQuiz() {
        this.currentQuestion = 0;
        this.answers = [];
        const quizContainer = document.getElementById('quizContainer');
        const quizResults = document.getElementById('quizResults');

        if (quizContainer) {
            quizContainer.style.display = 'block';
        }
        if (quizResults) {
            quizResults.style.display = 'none';
        }

        this.loadQuestion();
    }
}

// Initialize quiz system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.quizSystem = new QuizSystem();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuizSystem;
}