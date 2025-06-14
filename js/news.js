// MUZAN SIGMA TECH - News System

class NewsSystem {
    constructor() {
        this.articles = [];
        this.currentPage = 1;
        this.articlesPerPage = 6;
        this.init();
    }

    init() {
        this.loadNews();
        this.renderNews();
    }

    async loadNews() {
        // In a real application, this would fetch from RSS feeds or news APIs
        // For demo purposes, we'll use mock data
        this.articles = [
            {
                id: 1,
                title: "Nouvelle vulnérabilité critique découverte dans OpenSSL",
                description: "Une faille de sécurité majeure affectant des millions de serveurs web a été identifiée. Les experts recommandent une mise à jour immédiate.",
                content: "La communauté de la cybersécurité est en alerte suite à la découverte d'une vulnérabilité critique dans OpenSSL...",
                source: "CyberSecurity News",
                author: "Marie Dubois",
                publishedAt: "2024-01-20T10:30:00Z",
                category: "cybersécurité",
                tags: ["openssl", "vulnérabilité", "sécurité"],
                image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400",
                readTime: 5,
                views: 2847,
                featured: true
            },
            {
                id: 2,
                title: "L'IA générative révolutionne le développement logiciel",
                description: "Les outils d'intelligence artificielle transforment la façon dont les développeurs écrivent et maintiennent leur code.",
                content: "L'avènement des outils d'IA générative comme GitHub Copilot et ChatGPT change fondamentalement...",
                source: "Tech Innovation",
                author: "Pierre Martin",
                publishedAt: "2024-01-19T14:15:00Z",
                category: "développement",
                tags: ["ia", "développement", "automatisation"],
                image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400",
                readTime: 7,
                views: 1923,
                featured: true
            },
            {
                id: 3,
                title: "Quantum Computing : Vers une nouvelle ère de calcul",
                description: "Les dernières avancées en informatique quantique promettent de révolutionner de nombreux domaines technologiques.",
                content: "L'informatique quantique n'est plus de la science-fiction. Les récents développements...",
                source: "Quantum Tech",
                author: "Dr. Sophie Laurent",
                publishedAt: "2024-01-18T09:45:00Z",
                category: "innovation",
                tags: ["quantum", "computing", "innovation"],
                image: "https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=400",
                readTime: 8,
                views: 1456,
                featured: false
            },
            {
                id: 4,
                title: "Blockchain et Web3 : État des lieux en 2024",
                description: "Analyse des tendances actuelles et des perspectives d'avenir pour les technologies blockchain et Web3.",
                content: "Après plusieurs années de développement intense, l'écosystème blockchain...",
                source: "Blockchain Today",
                author: "Alex Chen",
                publishedAt: "2024-01-17T16:20:00Z",
                category: "blockchain",
                tags: ["blockchain", "web3", "crypto"],
                image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400",
                readTime: 6,
                views: 2134,
                featured: false
            },
            {
                id: 5,
                title: "DevOps et Cloud Native : Meilleures pratiques 2024",
                description: "Guide complet des pratiques DevOps modernes et des architectures cloud-native pour optimiser vos déploiements.",
                content: "L'adoption du DevOps et des architectures cloud-native continue de s'accélérer...",
                source: "DevOps Weekly",
                author: "Thomas Rodriguez",
                publishedAt: "2024-01-16T11:30:00Z",
                category: "devops",
                tags: ["devops", "cloud", "kubernetes"],
                image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400",
                readTime: 9,
                views: 1789,
                featured: true
            },
            {
                id: 6,
                title: "Cybersécurité : Les menaces émergentes de 2024",
                description: "Panorama des nouvelles menaces cybernétiques et des stratégies de défense à adopter cette année.",
                content: "Le paysage des menaces cybernétiques évolue constamment. En 2024, de nouveaux défis...",
                source: "Security Focus",
                author: "Emma Wilson",
                publishedAt: "2024-01-15T13:45:00Z",
                category: "cybersécurité",
                tags: ["cybersécurité", "menaces", "protection"],
                image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400",
                readTime: 7,
                views: 3021,
                featured: false
            },
            {
                id: 7,
                title: "Python 3.12 : Nouveautés et améliorations",
                description: "Découvrez les nouvelles fonctionnalités et optimisations apportées par la dernière version de Python.",
                content: "Python 3.12 apporte son lot de nouveautés et d'améliorations significatives...",
                source: "Python News",
                author: "Lucas Moreau",
                publishedAt: "2024-01-14T08:15:00Z",
                category: "développement",
                tags: ["python", "programmation", "mise-à-jour"],
                image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400",
                readTime: 5,
                views: 1567,
                featured: false
            },
            {
                id: 8,
                title: "Edge Computing : L'avenir du traitement de données",
                description: "Comment l'edge computing transforme la façon dont nous traitons et analysons les données en temps réel.",
                content: "L'edge computing représente un changement paradigmatique dans l'architecture...",
                source: "Edge Tech",
                author: "Sarah Kim",
                publishedAt: "2024-01-13T15:30:00Z",
                category: "innovation",
                tags: ["edge-computing", "iot", "données"],
                image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400",
                readTime: 6,
                views: 1234,
                featured: false
            }
        ];

        // Sort articles by publication date (newest first)
        this.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    }

    renderNews() {
        const newsGrid = document.getElementById('newsGrid');
        if (!newsGrid) return;

        const startIndex = (this.currentPage - 1) * this.articlesPerPage;
        const endIndex = startIndex + this.articlesPerPage;
        const articlesToShow = this.articles.slice(startIndex, endIndex);

        if (articlesToShow.length === 0) {
            newsGrid.innerHTML = `
                <div class="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10,9 9,9 8,9"></polyline>
                    </svg>
                    <h3>Aucun article disponible</h3>
                    <p>Revenez plus tard pour découvrir les dernières actualités tech</p>
                </div>
            `;
            return;
        }

        newsGrid.innerHTML = articlesToShow.map(article => this.createNewsCard(article)).join('');
        this.attachNewsEventListeners();
        this.renderPagination();
    }

    createNewsCard(article) {
        const publishedDate = new Date(article.publishedAt);
        const timeAgo = this.getTimeAgo(publishedDate);
        
        return `
            <article class="news-card" data-id="${article.id}">
                ${article.featured ? '<div class="featured-badge">À la une</div>' : ''}
                
                <div class="news-image" style="background-image: url('${article.image}')">
                    <div class="news-overlay">
                        <span class="news-category">${article.category}</span>
                    </div>
                </div>
                
                <div class="news-content">
                    <div class="news-meta">
                        <span class="news-source">${article.source}</span>
                        <span class="news-date">${timeAgo}</span>
                    </div>
                    
                    <h3 class="news-title">${article.title}</h3>
                    <p class="news-description">${article.description}</p>
                    
                    <div class="news-tags">
                        ${article.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    
                    <div class="news-footer">
                        <div class="news-stats">
                            <span class="stat">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12,6 12,12 16,14"></polyline>
                                </svg>
                                ${article.readTime} min
                            </span>
                            <span class="stat">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                ${this.formatViews(article.views)}
                            </span>
                        </div>
                        <button class="btn-secondary btn-read-more">Lire plus</button>
                    </div>
                </div>
            </article>
        `;
    }

    attachNewsEventListeners() {
        // Read more buttons
        document.querySelectorAll('.btn-read-more').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.news-card');
                const articleId = parseInt(card.dataset.id);
                this.showArticleModal(articleId);
            });
        });

        // Card click for full article
        document.querySelectorAll('.news-card').forEach(card => {
            card.addEventListener('click', () => {
                const articleId = parseInt(card.dataset.id);
                this.showArticleModal(articleId);
            });
        });
    }

    showArticleModal(articleId) {
        const article = this.articles.find(a => a.id === articleId);
        if (!article) return;

        // Increment view count
        article.views++;

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content glass-card" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
                <span class="modal-close">&times;</span>
                <article class="article-full">
                    <header class="article-header">
                        <img src="${article.image}" alt="${article.title}" class="article-image">
                        <div class="article-meta">
                            <span class="article-category">${article.category}</span>
                            <h1 class="article-title">${article.title}</h1>
                            <div class="article-info">
                                <div class="author-info">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    <span>Par ${article.author}</span>
                                </div>
                                <div class="publish-info">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12,6 12,12 16,14"></polyline>
                                    </svg>
                                    <span>${this.formatDate(article.publishedAt)}</span>
                                </div>
                                <div class="read-info">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                    </svg>
                                    <span>${article.readTime} min de lecture</span>
                                </div>
                            </div>
                        </div>
                    </header>
                    
                    <div class="article-content">
                        <p class="article-lead">${article.description}</p>
                        <div class="article-body">
                            ${this.formatArticleContent(article.content)}
                        </div>
                    </div>
                    
                    <footer class="article-footer">
                        <div class="article-tags">
                            <h4>Tags:</h4>
                            <div class="tags-list">
                                ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="article-stats">
                            <div class="stat-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                <span>${this.formatViews(article.views)} vues</span>
                            </div>
                            <div class="stat-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 9V5a3 3 0 0 0-6 0v4"></path>
                                    <rect x="2" y="9" width="20" height="12" rx="2" ry="2"></rect>
                                </svg>
                                <span>Source: ${article.source}</span>
                            </div>
                        </div>
                        
                        <div class="article-actions">
                            <button class="btn-secondary" onclick="window.newsSystem.shareArticle(${article.id})">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="18" cy="5" r="3"></circle>
                                    <circle cx="6" cy="12" r="3"></circle>
                                    <circle cx="18" cy="19" r="3"></circle>
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                                </svg>
                                Partager
                            </button>
                            <button class="btn-primary" onclick="window.newsSystem.saveArticle(${article.id})">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                </svg>
                                Sauvegarder
                            </button>
                        </div>
                    </footer>
                </article>
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

    formatArticleContent(content) {
        // Simple content formatting - in a real app, this would be more sophisticated
        const paragraphs = content.split('\n\n');
        return paragraphs.map(p => `<p>${p}</p>`).join('');
    }

    renderPagination() {
        const totalPages = Math.ceil(this.articles.length / this.articlesPerPage);
        if (totalPages <= 1) return;

        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination';
        paginationContainer.innerHTML = `
            <button class="pagination-btn ${this.currentPage === 1 ? 'disabled' : ''}" 
                    onclick="window.newsSystem.goToPage(${this.currentPage - 1})"
                    ${this.currentPage === 1 ? 'disabled' : ''}>
                Précédent
            </button>
            
            <div class="pagination-numbers">
                ${Array.from({length: totalPages}, (_, i) => i + 1)
                    .map(page => `
                        <button class="pagination-number ${page === this.currentPage ? 'active' : ''}"
                                onclick="window.newsSystem.goToPage(${page})">
                            ${page}
                        </button>
                    `).join('')}
            </div>
            
            <button class="pagination-btn ${this.currentPage === totalPages ? 'disabled' : ''}"
                    onclick="window.newsSystem.goToPage(${this.currentPage + 1})"
                    ${this.currentPage === totalPages ? 'disabled' : ''}>
                Suivant
            </button>
        `;

        const newsSection = document.getElementById('news');
        const existingPagination = newsSection.querySelector('.pagination');
        if (existingPagination) {
            existingPagination.remove();
        }
        newsSection.appendChild(paginationContainer);
    }

    goToPage(page) {
        const totalPages = Math.ceil(this.articles.length / this.articlesPerPage);
        if (page < 1 || page > totalPages) return;

        this.currentPage = page;
        this.renderNews();
        
        // Scroll to news section
        document.getElementById('news').scrollIntoView({ behavior: 'smooth' });
    }

    shareArticle(articleId) {
        const article = this.articles.find(a => a.id === articleId);
        if (!article) return;

        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.description,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            const shareText = `${article.title}\n${article.description}\n${window.location.href}`;
            navigator.clipboard.writeText(shareText).then(() => {
                window.muzanApp?.showNotification('Lien copié dans le presse-papiers', 'success');
            });
        }
    }

    saveArticle(articleId) {
        const article = this.articles.find(a => a.id === articleId);
        if (!article) return;

        // Save to localStorage
        const savedArticles = JSON.parse(localStorage.getItem('muzanSavedArticles') || '[]');
        if (!savedArticles.find(a => a.id === articleId)) {
            savedArticles.push({
                id: article.id,
                title: article.title,
                savedAt: new Date().toISOString()
            });
            localStorage.setItem('muzanSavedArticles', JSON.stringify(savedArticles));
            window.muzanApp?.showNotification('Article sauvegardé', 'success');
        } else {
            window.muzanApp?.showNotification('Article déjà sauvegardé', 'info');
        }
    }

    // Utility methods
    getTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'À l\'instant';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}j`;
        
        return date.toLocaleDateString('fr-FR');
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    formatViews(views) {
        if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
        if (views >= 1000) return (views / 1000).toFixed(1) + 'k';
        return views.toString();
    }

    // Search and filter methods
    searchArticles(query) {
        if (!query.trim()) {
            this.renderNews();
            return;
        }

        const searchTerm = query.toLowerCase();
        const filteredArticles = this.articles.filter(article => 
            article.title.toLowerCase().includes(searchTerm) ||
            article.description.toLowerCase().includes(searchTerm) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            article.category.toLowerCase().includes(searchTerm)
        );

        this.renderFilteredNews(filteredArticles);
    }

    filterByCategory(category) {
        if (category === 'all') {
            this.renderNews();
            return;
        }

        const filteredArticles = this.articles.filter(article => 
            article.category === category
        );

        this.renderFilteredNews(filteredArticles);
    }

    renderFilteredNews(articles) {
        const newsGrid = document.getElementById('newsGrid');
        if (!newsGrid) return;

        if (articles.length === 0) {
            newsGrid.innerHTML = `
                <div class="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <h3>Aucun article trouvé</h3>
                    <p>Essayez de modifier vos critères de recherche</p>
                </div>
            `;
            return;
        }

        newsGrid.innerHTML = articles.map(article => this.createNewsCard(article)).join('');
        this.attachNewsEventListeners();
    }
}

// Initialize news system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.newsSystem = new NewsSystem();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NewsSystem;
}