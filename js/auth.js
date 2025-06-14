// MUZAN SIGMA TECH - Authentication System

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkExistingSession();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(e.target);
            });
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister(e.target);
            });
        }
    }

    handleLogin(form) {
        const formData = new FormData(form);
        const email = formData.get('email') || form.querySelector('input[type="email"]').value;
        const password = formData.get('password') || form.querySelector('input[type="password"]').value;

        if (!email || !password) {
            window.muzanApp?.showNotification('Veuillez remplir tous les champs', 'warning');
            return;
        }

        const user = this.users.find(u => u.email === email);
        if (!user) {
            window.muzanApp?.showNotification('Utilisateur non trouvé', 'error');
            return;
        }

        if (!this.verifyPassword(password, user.password)) {
            window.muzanApp?.showNotification('Mot de passe incorrect', 'error');
            return;
        }

        this.loginUser(user);
        document.getElementById('loginModal').style.display = 'none';
        window.muzanApp?.showNotification(`Bienvenue ${user.username} !`, 'success');
    }

    handleRegister(form) {
        const formData = new FormData(form);
        const username = formData.get('username') || form.querySelector('input[type="text"]').value;
        const email = formData.get('email') || form.querySelector('input[type="email"]').value;
        const password = formData.get('password') || form.querySelector('input[type="password"]').value;

        if (!username || !email || !password) {
            window.muzanApp?.showNotification('Veuillez remplir tous les champs', 'warning');
            return;
        }

        if (!this.isValidEmail(email)) {
            window.muzanApp?.showNotification('Email invalide', 'error');
            return;
        }

        if (password.length < 6) {
            window.muzanApp?.showNotification('Le mot de passe doit contenir au moins 6 caractères', 'error');
            return;
        }

        if (this.users.find(u => u.email === email)) {
            window.muzanApp?.showNotification('Un compte avec cet email existe déjà', 'error');
            return;
        }

        if (this.users.find(u => u.username === username)) {
            window.muzanApp?.showNotification('Ce nom d\'utilisateur est déjà pris', 'error');
            return;
        }

        const newUser = this.createUser(username, email, password);
        this.users.push(newUser);
        this.saveUsers();
        this.loginUser(newUser);
        
        document.getElementById('registerModal').style.display = 'none';
        window.muzanApp?.showNotification(`Compte créé avec succès ! Bienvenue ${username} !`, 'success');
    }

    createUser(username, email, password) {
        return {
            id: Date.now(),
            username: username,
            email: email,
            password: this.hashPassword(password),
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            profile: null,
            preferences: {
                theme: 'dark',
                notifications: true,
                language: 'fr'
            },
            stats: {
                challengesCompleted: 0,
                totalPoints: 0,
                badges: [],
                favoriteItems: [],
                tutorialsWatched: []
            }
        };
    }

    loginUser(user) {
        user.lastLogin = new Date().toISOString();
        this.currentUser = user;
        this.saveSession();
        this.saveUsers();
        this.updateUI();
    }

    logoutUser() {
        this.currentUser = null;
        localStorage.removeItem('muzanUser');
        localStorage.removeItem('muzanSession');
        this.updateUI();
        window.muzanApp?.showNotification('Déconnexion réussie', 'info');
    }

    checkExistingSession() {
        const savedSession = localStorage.getItem('muzanSession');
        if (savedSession) {
            const session = JSON.parse(savedSession);
            const user = this.users.find(u => u.id === session.userId);
            
            if (user && this.isSessionValid(session)) {
                this.currentUser = user;
                this.updateUI();
            } else {
                localStorage.removeItem('muzanSession');
            }
        }
    }

    isSessionValid(session) {
        const sessionAge = Date.now() - new Date(session.createdAt).getTime();
        const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
        return sessionAge < maxAge;
    }

    saveSession() {
        if (this.currentUser) {
            const session = {
                userId: this.currentUser.id,
                createdAt: new Date().toISOString()
            };
            localStorage.setItem('muzanSession', JSON.stringify(session));
            localStorage.setItem('muzanUser', JSON.stringify(this.currentUser));
        }
    }

    updateUI() {
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');

        if (this.currentUser) {
            // User is logged in
            if (loginBtn) {
                loginBtn.textContent = this.currentUser.username;
                loginBtn.onclick = () => this.showUserMenu();
            }
            if (registerBtn) {
                registerBtn.style.display = 'none';
            }
        } else {
            // User is not logged in
            if (loginBtn) {
                loginBtn.textContent = 'Connexion';
                loginBtn.onclick = () => document.getElementById('loginModal').style.display = 'block';
            }
            if (registerBtn) {
                registerBtn.style.display = 'inline-block';
            }
        }
    }

    showUserMenu() {
        const menu = document.createElement('div');
        menu.className = 'user-menu glass-card';
        menu.innerHTML = `
            <div class="user-info">
                <h3>${this.currentUser.username}</h3>
                <p>${this.currentUser.email}</p>
                <div class="user-stats">
                    <span>Points: ${this.currentUser.stats.totalPoints}</span>
                    <span>Badges: ${this.currentUser.stats.badges.length}</span>
                </div>
            </div>
            <div class="user-actions">
                <button class="menu-item" onclick="window.authSystem.showProfile()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Mon Profil
                </button>
                <button class="menu-item" onclick="window.authSystem.showFavorites()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    Mes Favoris
                </button>
                <button class="menu-item" onclick="window.authSystem.showSettings()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                    Paramètres
                </button>
                <hr>
                <button class="menu-item logout" onclick="window.authSystem.logoutUser(); this.closest('.user-menu').remove();">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16,17 21,12 16,7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Déconnexion
                </button>
            </div>
        `;

        // Position menu
        const loginBtn = document.getElementById('loginBtn');
        const rect = loginBtn.getBoundingClientRect();
        menu.style.position = 'fixed';
        menu.style.top = (rect.bottom + 10) + 'px';
        menu.style.right = '20px';
        menu.style.zIndex = '2000';

        document.body.appendChild(menu);

        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!menu.contains(e.target) && e.target !== loginBtn) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 100);
    }

    showProfile() {
        // Implementation for profile modal
        console.log('Show profile for:', this.currentUser);
        window.muzanApp?.showNotification('Profil en cours de développement', 'info');
    }

    showFavorites() {
        // Implementation for favorites modal
        console.log('Show favorites for:', this.currentUser);
        window.muzanApp?.showNotification('Favoris en cours de développement', 'info');
    }

    showSettings() {
        // Implementation for settings modal
        console.log('Show settings for:', this.currentUser);
        window.muzanApp?.showNotification('Paramètres en cours de développement', 'info');
    }

    // Utility methods
    hashPassword(password) {
        // Simple hash for demo - use proper hashing in production
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    verifyPassword(password, hashedPassword) {
        return this.hashPassword(password) === hashedPassword;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    loadUsers() {
        const saved = localStorage.getItem('muzanUsers');
        return saved ? JSON.parse(saved) : [];
    }

    saveUsers() {
        localStorage.setItem('muzanUsers', JSON.stringify(this.users));
    }

    getCurrentUser() {
        return this.currentUser;
    }

    updateUserStats(stats) {
        if (this.currentUser) {
            Object.assign(this.currentUser.stats, stats);
            this.saveUsers();
            this.saveSession();
        }
    }

    addFavorite(itemId, itemType) {
        if (this.currentUser) {
            const favorite = { id: itemId, type: itemType, addedAt: new Date().toISOString() };
            this.currentUser.stats.favoriteItems.push(favorite);
            this.saveUsers();
            this.saveSession();
        }
    }

    removeFavorite(itemId) {
        if (this.currentUser) {
            this.currentUser.stats.favoriteItems = this.currentUser.stats.favoriteItems.filter(
                fav => fav.id !== itemId
            );
            this.saveUsers();
            this.saveSession();
        }
    }

    isFavorite(itemId) {
        if (!this.currentUser) return false;
        return this.currentUser.stats.favoriteItems.some(fav => fav.id === itemId);
    }
}

// Initialize auth system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authSystem = new AuthSystem();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthSystem;
}