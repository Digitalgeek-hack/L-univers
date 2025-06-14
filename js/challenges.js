// MUZAN SIGMA TECH - Challenges System

class ChallengesSystem {
    constructor() {
        this.challenges = [];
        this.userProgress = this.loadUserProgress();
        this.badges = this.loadBadges();
        this.init();
    }

    init() {
        this.loadChallenges();
        this.updateUserStats();
        this.renderChallenges();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Challenge cards click handlers will be attached after rendering
    }

    loadChallenges() {
        this.challenges = [
            {
                id: 1,
                title: "Déchiffrage César",
                description: "Déchiffrez ce message crypté avec le chiffre de César : 'PXCDQ VLJPD WHFK'",
                category: "cryptographie",
                difficulty: "Facile",
                points: 100,
                timeLimit: 30, // minutes
                hints: [
                    "Le chiffre de César utilise un décalage fixe",
                    "Essayez différents décalages de 1 à 25",
                    "Le message déchiffré est en français"
                ],
                solution: "MUZAN SIGMA TECH",
                explanation: "Le message était chiffré avec un décalage de 3 positions dans l'alphabet.",
                tags: ["crypto", "débutant", "césar"],
                completed: false,
                attempts: 0,
                maxAttempts: 5
            },
            {
                id: 2,
                title: "Injection SQL Basique",
                description: "Trouvez la vulnérabilité SQL dans cette requête et exploitez-la pour récupérer tous les utilisateurs.",
                category: "web-security",
                difficulty: "Moyen",
                points: 250,
                timeLimit: 45,
                hints: [
                    "Regardez comment les paramètres sont traités",
                    "Essayez d'injecter du code SQL",
                    "L'objectif est de contourner l'authentification"
                ],
                solution: "' OR '1'='1",
                explanation: "L'injection SQL permet de contourner l'authentification en rendant la condition toujours vraie.",
                tags: ["sql", "injection", "web"],
                completed: false,
                attempts: 0,
                maxAttempts: 3
            },
            {
                id: 3,
                title: "Analyse de Malware",
                description: "Analysez ce fichier binaire et identifiez sa fonction principale. Hash MD5: d41d8cd98f00b204e9800998ecf8427e",
                category: "reverse-engineering",
                difficulty: "Difficile",
                points: 500,
                timeLimit: 120,
                hints: [
                    "Utilisez des outils d'analyse statique",
                    "Examinez les chaînes de caractères",
                    "Analysez les appels système"
                ],
                solution: "keylogger",
                explanation: "Le binaire est un keylogger qui enregistre les frappes clavier dans un fichier log.",
                tags: ["malware", "reverse", "analyse"],
                completed: false,
                attempts: 0,
                maxAttempts: 3
            },
            {
                id: 4,
                title: "Buffer Overflow",
                description: "Exploitez cette vulnérabilité de débordement de tampon pour exécuter du code arbitraire.",
                category: "binary-exploitation",
                difficulty: "Expert",
                points: 750,
                timeLimit: 180,
                hints: [
                    "Identifiez la taille du buffer",
                    "Contrôlez le pointeur de retour",
                    "Utilisez un shellcode approprié"
                ],
                solution: "shellcode_execution",
                explanation: "Le débordement permet d'écraser l'adresse de retour et d'exécuter un shellcode.",
                tags: ["buffer", "overflow", "exploitation"],
                completed: false,
                attempts: 0,
                maxAttempts: 2
            },
            {
                id: 5,
                title: "Stéganographie Image",
                description: "Un message secret est caché dans cette image. Trouvez-le et déchiffrez-le.",
                category: "steganography",
                difficulty: "Moyen",
                points: 300,
                timeLimit: 60,
                hints: [
                    "Examinez les bits de poids faible",
                    "Utilisez des outils de stéganographie",
                    "Le message peut être chiffré"
                ],
                solution: "hidden_message_found",
                explanation: "Le message était caché dans les LSB (Least Significant Bits) de l'image.",
                tags: ["stego", "image", "caché"],
                completed: false,
                attempts: 0,
                maxAttempts: 4
            },
            {
                id: 6,
                title: "Réseau Forensics",
                description: "Analysez cette capture réseau et identifiez l'activité malveillante.",
                category: "network-forensics",
                difficulty: "Difficile",
                points: 600,
                timeLimit: 90,
                hints: [
                    "Utilisez Wireshark pour l'analyse",
                    "Recherchez des communications suspectes",
                    "Examinez les protocoles utilisés"
                ],
                solution: "data_exfiltration_detected",
                explanation: "Une exfiltration de données via DNS tunneling a été détectée.",
                tags: ["réseau", "forensics", "wireshark"],
                completed: false,
                attempts: 0,
                maxAttempts: 3
            }
        ];

        // Load user progress for each challenge
        this.challenges.forEach(challenge => {
            const progress = this.userProgress[challenge.id];
            if (progress) {
                challenge.completed = progress.completed;
                challenge.attempts = progress.attempts;
                challenge.completedAt = progress.completedAt;
                challenge.timeSpent = progress.timeSpent;
            }
        });
    }

    loadBadges() {
        return [
            {
                id: 'first_challenge',
                name: 'Premier Pas',
                description: 'Complétez votre premier challenge',
                icon: '🎯',
                earned: false,
                condition: (progress) => Object.values(progress).some(p => p.completed)
            },
            {
                id: 'crypto_master',
                name: 'Maître Crypto',
                description: 'Complétez 3 challenges de cryptographie',
                icon: '🔐',
                earned: false,
                condition: (progress, challenges) => {
                    const cryptoChallenges = challenges.filter(c => c.category === 'cryptographie');
                    return cryptoChallenges.filter(c => progress[c.id]?.completed).length >= 3;
                }
            },
            {
                id: 'speed_demon',
                name: 'Démon de Vitesse',
                description: 'Complétez un challenge en moins de 10 minutes',
                icon: '⚡',
                earned: false,
                condition: (progress) => Object.values(progress).some(p => p.completed && p.timeSpent < 600)
            },
            {
                id: 'persistent',
                name: 'Persévérant',
                description: 'Complétez un challenge difficile après plusieurs tentatives',
                icon: '💪',
                earned: false,
                condition: (progress, challenges) => {
                    return Object.entries(progress).some(([id, p]) => {
                        const challenge = challenges.find(c => c.id == id);
                        return p.completed && p.attempts > 2 && challenge?.difficulty === 'Difficile';
                    });
                }
            },
            {
                id: 'expert_level',
                name: 'Niveau Expert',
                description: 'Complétez un challenge expert',
                icon: '👑',
                earned: false,
                condition: (progress, challenges) => {
                    return Object.entries(progress).some(([id, p]) => {
                        const challenge = challenges.find(c => c.id == id);
                        return p.completed && challenge?.difficulty === 'Expert';
                    });
                }
            },
            {
                id: 'completionist',
                name: 'Complétionniste',
                description: 'Complétez tous les challenges disponibles',
                icon: '🏆',
                earned: false,
                condition: (progress, challenges) => {
                    return challenges.every(c => progress[c.id]?.completed);
                }
            }
        ];
    }

    renderChallenges() {
        const grid = document.getElementById('challengesGrid');
        if (!grid) return;

        grid.innerHTML = this.challenges.map(challenge => this.createChallengeCard(challenge)).join('');
        this.attachChallengeEventListeners();
    }

    createChallengeCard(challenge) {
        const difficultyColors = {
            'Facile': '#00ff88',
            'Moyen': '#ffaa00',
            'Difficile': '#ff4444',
            'Expert': '#8a2be2'
        };

        const progressPercent = challenge.maxAttempts > 0 ? 
            ((challenge.maxAttempts - challenge.attempts) / challenge.maxAttempts) * 100 : 100;

        return `
            <div class="challenge-card ${challenge.completed ? 'completed' : ''}" data-id="${challenge.id}">
                ${challenge.completed ? '<div class="completed-badge">✓ Terminé</div>' : ''}
                
                <div class="challenge-header">
                    <h3 class="challenge-title">${challenge.title}</h3>
                    <div class="challenge-difficulty" style="color: ${difficultyColors[challenge.difficulty]}">
                        ${challenge.difficulty}
                    </div>
                </div>
                
                <p class="challenge-description">${challenge.description}</p>
                
                <div class="challenge-tags">
                    ${challenge.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                
                <div class="challenge-info">
                    <div class="info-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12,6 12,12 16,14"></polyline>
                        </svg>
                        ${challenge.timeLimit} min
                    </div>
                    <div class="info-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                        </svg>
                        ${challenge.points} pts
                    </div>
                    <div class="info-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 12l2 2 4-4"></path>
                            <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                            <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                        </svg>
                        ${challenge.attempts}/${challenge.maxAttempts}
                    </div>
                </div>
                
                <div class="challenge-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progressPercent}%"></div>
                    </div>
                </div>
                
                <div class="challenge-actions">
                    <button class="btn-primary ${challenge.attempts >= challenge.maxAttempts && !challenge.completed ? 'disabled' : ''}" 
                            ${challenge.attempts >= challenge.maxAttempts && !challenge.completed ? 'disabled' : ''}>
                        ${challenge.completed ? 'Revoir' : 'Commencer'}
                    </button>
                    ${challenge.attempts > 0 && !challenge.completed ? 
                        `<button class="btn-secondary hint-btn" data-id="${challenge.id}">Indice</button>` : ''}
                </div>
            </div>
        `;
    }

    attachChallengeEventListeners() {
        // Challenge start buttons
        document.querySelectorAll('.challenge-card .btn-primary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.challenge-card');
                const challengeId = parseInt(card.dataset.id);
                this.startChallenge(challengeId);
            });
        });

        // Hint buttons
        document.querySelectorAll('.hint-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const challengeId = parseInt(btn.dataset.id);
                this.showHint(challengeId);
            });
        });
    }

    startChallenge(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (!challenge) return;

        if (challenge.attempts >= challenge.maxAttempts && !challenge.completed) {
            window.muzanApp?.showNotification('Nombre maximum de tentatives atteint', 'error');
            return;
        }

        this.showChallengeModal(challenge);
    }

    showChallengeModal(challenge) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content glass-card" style="max-width: 800px;">
                <span class="modal-close">&times;</span>
                <div class="challenge-modal">
                    <div class="challenge-modal-header">
                        <h2>${challenge.title}</h2>
                        <div class="challenge-timer" id="challengeTimer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12,6 12,12 16,14"></polyline>
                            </svg>
                            <span id="timerDisplay">${challenge.timeLimit}:00</span>
                        </div>
                    </div>
                    
                    <div class="challenge-content">
                        <div class="challenge-description">
                            <h3>Description</h3>
                            <p>${challenge.description}</p>
                        </div>
                        
                        <div class="challenge-workspace">
                            <h3>Votre réponse</h3>
                            <textarea id="challengeAnswer" placeholder="Entrez votre réponse ici..." rows="4"></textarea>
                            <div class="workspace-tools">
                                <button class="btn-secondary" onclick="document.getElementById('challengeAnswer').value = ''">Effacer</button>
                                <button class="btn-secondary" id="hintBtn-${challenge.id}">Indice (${challenge.hints.length} disponibles)</button>
                            </div>
                        </div>
                        
                        <div class="challenge-info-panel">
                            <div class="info-row">
                                <span>Difficulté:</span>
                                <span class="difficulty-badge">${challenge.difficulty}</span>
                            </div>
                            <div class="info-row">
                                <span>Points:</span>
                                <span class="points-badge">${challenge.points} pts</span>
                            </div>
                            <div class="info-row">
                                <span>Tentatives:</span>
                                <span class="attempts-badge">${challenge.attempts}/${challenge.maxAttempts}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="challenge-actions">
                        <button class="btn-secondary" onclick="this.closest('.modal').remove()">Abandonner</button>
                        <button class="btn-primary" id="submitAnswer">Valider</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.display = 'block';

        // Start timer
        this.startTimer(challenge.timeLimit * 60, modal);

        // Setup event listeners
        const submitBtn = modal.querySelector('#submitAnswer');
        const answerTextarea = modal.querySelector('#challengeAnswer');
        const hintBtn = modal.querySelector(`#hintBtn-${challenge.id}`);

        submitBtn.addEventListener('click', () => {
            const answer = answerTextarea.value.trim();
            this.submitAnswer(challenge.id, answer, modal);
        });

        hintBtn.addEventListener('click', () => {
            this.showHint(challenge.id);
        });

        // Close modal handlers
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    startTimer(seconds, modal) {
        const timerDisplay = modal.querySelector('#timerDisplay');
        let timeLeft = seconds;

        const timer = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            timerDisplay.textContent = `${minutes}:${secs.toString().padStart(2, '0')}`;

            if (timeLeft <= 0) {
                clearInterval(timer);
                window.muzanApp?.showNotification('Temps écoulé !', 'warning');
                modal.remove();
            }

            timeLeft--;
        }, 1000);

        // Store timer reference to clear it if modal is closed
        modal.timer = timer;
        
        // Clear timer when modal is removed
        const originalRemove = modal.remove;
        modal.remove = function() {
            clearInterval(timer);
            originalRemove.call(this);
        };
    }

    submitAnswer(challengeId, answer, modal) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (!challenge) return;

        challenge.attempts++;

        const isCorrect = answer.toLowerCase() === challenge.solution.toLowerCase();

        if (isCorrect) {
            challenge.completed = true;
            challenge.completedAt = new Date().toISOString();
            
            // Calculate time spent (approximate)
            const timerDisplay = modal.querySelector('#timerDisplay');
            const timeLeft = this.parseTimeLeft(timerDisplay.textContent);
            challenge.timeSpent = (challenge.timeLimit * 60) - timeLeft;

            this.saveUserProgress();
            this.updateUserStats();
            this.checkBadges();

            window.muzanApp?.showNotification(`Challenge "${challenge.title}" réussi ! +${challenge.points} points`, 'success');
            
            // Show solution modal
            this.showSolutionModal(challenge);
        } else {
            if (challenge.attempts >= challenge.maxAttempts) {
                window.muzanApp?.showNotification('Nombre maximum de tentatives atteint', 'error');
                this.showSolutionModal(challenge);
            } else {
                window.muzanApp?.showNotification(`Réponse incorrecte. ${challenge.maxAttempts - challenge.attempts} tentatives restantes`, 'warning');
            }
        }

        this.saveUserProgress();
        this.renderChallenges();
        modal.remove();
    }

    showSolutionModal(challenge) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content glass-card">
                <span class="modal-close">&times;</span>
                <div class="solution-modal">
                    <h2>${challenge.completed ? '🎉 Challenge Réussi !' : '💡 Solution'}</h2>
                    
                    <div class="solution-content">
                        <h3>Solution</h3>
                        <div class="solution-box">
                            <code>${challenge.solution}</code>
                        </div>
                        
                        <h3>Explication</h3>
                        <p>${challenge.explanation}</p>
                        
                        ${challenge.completed ? `
                            <div class="completion-stats">
                                <div class="stat">
                                    <span class="stat-label">Points gagnés</span>
                                    <span class="stat-value">+${challenge.points}</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-label">Tentatives</span>
                                    <span class="stat-value">${challenge.attempts}</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-label">Temps</span>
                                    <span class="stat-value">${this.formatTime(challenge.timeSpent || 0)}</span>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="solution-actions">
                        <button class="btn-primary" onclick="this.closest('.modal').remove()">Continuer</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.display = 'block';

        // Close modal handlers
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    showHint(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (!challenge) return;

        const hintIndex = Math.min(challenge.attempts, challenge.hints.length - 1);
        const hint = challenge.hints[hintIndex];

        window.muzanApp?.showNotification(`Indice: ${hint}`, 'info');
    }

    updateUserStats() {
        const userScore = document.getElementById('userScore');
        const userBadges = document.getElementById('userBadges');
        const userRank = document.getElementById('userRank');

        const totalPoints = this.challenges
            .filter(c => c.completed)
            .reduce((sum, c) => sum + c.points, 0);

        const earnedBadges = this.badges.filter(b => b.earned).length;

        const rank = this.calculateRank(totalPoints);

        if (userScore) userScore.textContent = totalPoints;
        if (userBadges) userBadges.textContent = earnedBadges;
        if (userRank) userRank.textContent = rank;
    }

    calculateRank(points) {
        if (points >= 2000) return 'Expert';
        if (points >= 1000) return 'Avancé';
        if (points >= 500) return 'Intermédiaire';
        if (points >= 100) return 'Débutant';
        return 'Novice';
    }

    checkBadges() {
        this.badges.forEach(badge => {
            if (!badge.earned && badge.condition(this.userProgress, this.challenges)) {
                badge.earned = true;
                window.muzanApp?.showNotification(`Nouveau badge débloqué: ${badge.name} ${badge.icon}`, 'success');
            }
        });
        this.saveBadges();
    }

    loadUserProgress() {
        const saved = localStorage.getItem('muzanChallengeProgress');
        return saved ? JSON.parse(saved) : {};
    }

    saveUserProgress() {
        const progress = {};
        this.challenges.forEach(challenge => {
            if (challenge.attempts > 0 || challenge.completed) {
                progress[challenge.id] = {
                    completed: challenge.completed,
                    attempts: challenge.attempts,
                    completedAt: challenge.completedAt,
                    timeSpent: challenge.timeSpent
                };
            }
        });
        this.userProgress = progress;
        localStorage.setItem('muzanChallengeProgress', JSON.stringify(progress));
    }

    saveBadges() {
        localStorage.setItem('muzanBadges', JSON.stringify(this.badges));
    }

    parseTimeLeft(timeString) {
        const [minutes, seconds] = timeString.split(':').map(Number);
        return minutes * 60 + seconds;
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
}

// Initialize challenges system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.challengesSystem = new ChallengesSystem();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChallengesSystem;
}