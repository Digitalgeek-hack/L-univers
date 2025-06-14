// MUZAN SIGMA TECH - Main JavaScript

class MuzanSigmaTech {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupParticles();
        this.loadUserSession();
        this.setupSearch();
    }

    setupEventListeners() {
        // Navigation toggle
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Modal handlers
        this.setupModals();

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Hero buttons
        const startQuizBtn = document.getElementById('startQuizBtn');
        if (startQuizBtn) {
            startQuizBtn.addEventListener('click', () => {
                document.getElementById('quiz').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }

        const exploreBtn = document.getElementById('exploreBtn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                document.getElementById('tutorials').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        // Observe all cards and sections
        document.querySelectorAll('.glass-card, .tutorial-card, .marketplace-card, .challenge-card, .tool-card, .community-card, .news-card').forEach(el => {
            el.classList.add('scroll-reveal');
            observer.observe(el);
        });
    }

    setupParticles() {
        const heroParticles = document.querySelector('.hero-particles');
        if (!heroParticles) return;

        // Create floating particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            heroParticles.appendChild(particle);
        }
    }

    setupModals() {
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const loginModal = document.getElementById('loginModal');
        const registerModal = document.getElementById('registerModal');

        if (loginBtn && loginModal) {
            loginBtn.addEventListener('click', () => {
                loginModal.style.display = 'block';
            });
        }

        if (registerBtn && registerModal) {
            registerBtn.addEventListener('click', () => {
                registerModal.style.display = 'block';
            });
        }

        // Close modals
        document.querySelectorAll('.modal-close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        // Close modal on outside click
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('marketplaceSearch');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.performSearch(e.target.value);
                }, 300);
            });
        }
    }

    performSearch(query) {
        // Global search functionality
        const searchResults = this.searchContent(query);
        this.displaySearchResults(searchResults);
    }

    searchContent(query) {
        if (!query.trim()) return [];

        const results = [];
        const searchableContent = [
            ...this.getTutorials(),
            ...this.getMarketplaceItems(),
            ...this.getChallenges()
        ];

        searchableContent.forEach(item => {
            if (item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase()) ||
                item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))) {
                results.push(item);
            }
        });

        return results;
    }

    displaySearchResults(results) {
        // Implementation for displaying search results
        console.log('Search results:', results);
    }

    loadUserSession() {
        const savedUser = localStorage.getItem('muzanUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUIForLoggedInUser();
        }
    }

    updateUIForLoggedInUser() {
        if (this.currentUser) {
            const loginBtn = document.getElementById('loginBtn');
            const registerBtn = document.getElementById('registerBtn');
            
            if (loginBtn) {
                loginBtn.textContent = this.currentUser.username;
                loginBtn.onclick = () => this.showUserProfile();
            }
            
            if (registerBtn) {
                registerBtn.style.display = 'none';
            }
        }
    }

    showUserProfile() {
        // Show user profile modal or navigate to profile page
        console.log('Show user profile for:', this.currentUser);
    }

    // Data getters (these would typically come from an API)
    getTutorials() {
        return [
            {
                id: 1,
                title: "Introduction au Hacking Éthique",
                description: "Apprenez les bases du hacking éthique et de la cybersécurité",
                level: "beginner",
                tags: ["hacking", "cybersécurité", "débutant"],
                duration: "2h",
                rating: 4.8
            },
            {
                id: 2,
                title: "Développement d'Automatisations",
                description: "Créez des bots et scripts d'automatisation efficaces",
                level: "intermediate",
                tags: ["automation", "scripting", "python"],
                duration: "3h",
                rating: 4.6
            },
            {
                id: 3,
                title: "Design UI/UX Avancé",
                description: "Maîtrisez les techniques de design moderne",
                level: "advanced",
                tags: ["design", "ui", "ux"],
                duration: "4h",
                rating: 4.9
            }
        ];
    }

    getMarketplaceItems() {
        return [
            {
                id: 1,
                title: "Bot Discord Avancé",
                description: "Bot Discord complet avec modération et musique",
                category: "bots",
                price: "Gratuit",
                tags: ["discord", "bot", "modération"],
                rating: 4.7,
                downloads: 1250
            },
            {
                id: 2,
                title: "Template Site Web Moderne",
                description: "Template responsive avec animations CSS",
                category: "templates",
                price: "15€",
                tags: ["web", "template", "responsive"],
                rating: 4.5,
                downloads: 890
            },
            {
                id: 3,
                title: "Script de Sécurité",
                description: "Outils d'analyse de sécurité réseau",
                category: "scripts",
                price: "25€",
                tags: ["sécurité", "réseau", "analyse"],
                rating: 4.8,
                downloads: 567
            }
        ];
    }

    getChallenges() {
        return [
            {
                id: 1,
                title: "Challenge Cryptographie",
                description: "Déchiffrez ce message crypté",
                difficulty: "Moyen",
                points: 150,
                tags: ["crypto", "déchiffrement"],
                completed: false
            },
            {
                id: 2,
                title: "Audit de Sécurité Web",
                description: "Trouvez les vulnérabilités dans cette application",
                difficulty: "Difficile",
                points: 300,
                tags: ["web", "sécurité", "audit"],
                completed: false
            },
            {
                id: 3,
                title: "Reverse Engineering",
                description: "Analysez ce binaire et trouvez le flag",
                difficulty: "Expert",
                points: 500,
                tags: ["reverse", "binaire", "analyse"],
                completed: false
            }
        ];
    }

    // Utility functions
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease'
        });

        // Set background color based on type
        const colors = {
            info: '#0066ff',
            success: '#00ff88',
            warning: '#ffaa00',
            error: '#ff4444'
        };
        notification.style.background = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    formatDate(date) {
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.muzanApp = new MuzanSigmaTech();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MuzanSigmaTech;
}