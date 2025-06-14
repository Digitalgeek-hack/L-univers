// MUZAN SIGMA TECH - Marketplace System

class MarketplaceSystem {
    constructor() {
        this.items = [];
        this.filteredItems = [];
        this.currentFilter = 'all';
        this.favorites = this.loadFavorites();
        this.init();
    }

    init() {
        this.loadMarketplaceItems();
        this.setupEventListeners();
        this.renderItems();
    }

    setupEventListeners() {
        // Category filter
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.filterByCategory(e.target.value);
            });
        }

        // Search functionality
        const searchInput = document.getElementById('marketplaceSearch');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.searchItems(e.target.value);
                }, 300);
            });
        }
    }

    loadMarketplaceItems() {
        // In a real application, this would fetch from an API
        this.items = [
            {
                id: 1,
                title: "Bot Discord Multifonction",
                description: "Bot Discord complet avec modération, musique, jeux et commandes personnalisées. Interface d'administration web incluse.",
                category: "bots",
                price: "Gratuit",
                originalPrice: null,
                author: "MuzanDev",
                rating: 4.8,
                downloads: 2547,
                tags: ["discord", "bot", "modération", "musique"],
                image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400",
                featured: true,
                dateAdded: "2024-01-15",
                lastUpdated: "2024-01-20",
                language: "JavaScript",
                requirements: ["Node.js 16+", "Discord Bot Token"],
                preview: "https://github.com/example/discord-bot"
            },
            {
                id: 2,
                title: "Template Site Web Cyberpunk",
                description: "Template HTML/CSS/JS avec design cyberpunk, animations néon et effets glassmorphism. Parfait pour portfolios tech.",
                category: "templates",
                price: "25€",
                originalPrice: "45€",
                author: "CyberDesigner",
                rating: 4.9,
                downloads: 1834,
                tags: ["web", "template", "cyberpunk", "responsive"],
                image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400",
                featured: true,
                dateAdded: "2024-01-10",
                lastUpdated: "2024-01-18",
                language: "HTML/CSS/JS",
                requirements: ["Navigateur moderne"],
                preview: "https://demo.cyberpunk-template.com"
            },
            {
                id: 3,
                title: "Script d'Audit Sécurité Réseau",
                description: "Outil complet d'analyse de sécurité réseau avec scan de ports, détection de vulnérabilités et génération de rapports.",
                category: "scripts",
                price: "35€",
                originalPrice: null,
                author: "SecMaster",
                rating: 4.7,
                downloads: 892,
                tags: ["sécurité", "réseau", "audit", "pentesting"],
                image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
                featured: false,
                dateAdded: "2024-01-08",
                lastUpdated: "2024-01-16",
                language: "Python",
                requirements: ["Python 3.8+", "Nmap", "Linux/Windows"],
                preview: null
            },
            {
                id: 4,
                title: "Bot Trading Crypto Automatisé",
                description: "Bot de trading automatisé pour cryptomonnaies avec stratégies configurables et interface de monitoring en temps réel.",
                category: "bots",
                price: "150€",
                originalPrice: "200€",
                author: "CryptoTrader",
                rating: 4.6,
                downloads: 456,
                tags: ["crypto", "trading", "bot", "automatisation"],
                image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400",
                featured: true,
                dateAdded: "2024-01-05",
                lastUpdated: "2024-01-19",
                language: "Python",
                requirements: ["Python 3.9+", "API Exchange", "Capital de trading"],
                preview: null
            },
            {
                id: 5,
                title: "Kit d'Outils Développeur",
                description: "Collection d'outils essentiels pour développeurs : générateurs, validateurs, convertisseurs et utilitaires divers.",
                category: "tools",
                price: "15€",
                originalPrice: null,
                author: "DevToolsMaster",
                rating: 4.5,
                downloads: 1267,
                tags: ["outils", "développement", "utilitaires", "productivité"],
                image: "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=400",
                featured: false,
                dateAdded: "2024-01-12",
                lastUpdated: "2024-01-17",
                language: "Multi-language",
                requirements: ["Navigateur web"],
                preview: "https://devtools.example.com"
            },
            {
                id: 6,
                title: "Template Dashboard Admin",
                description: "Dashboard d'administration moderne avec graphiques, tableaux de données et interface responsive. Idéal pour applications web.",
                category: "templates",
                price: "40€",
                originalPrice: "60€",
                author: "AdminPro",
                rating: 4.8,
                downloads: 723,
                tags: ["dashboard", "admin", "template", "charts"],
                image: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=400",
                featured: false,
                dateAdded: "2024-01-07",
                lastUpdated: "2024-01-14",
                language: "HTML/CSS/JS",
                requirements: ["Navigateur moderne", "Serveur web"],
                preview: "https://admin-dashboard-demo.com"
            }
        ];

        this.filteredItems = [...this.items];
    }

    filterByCategory(category) {
        this.currentFilter = category;
        if (category === 'all') {
            this.filteredItems = [...this.items];
        } else {
            this.filteredItems = this.items.filter(item => item.category === category);
        }
        this.renderItems();
    }

    searchItems(query) {
        if (!query.trim()) {
            this.filteredItems = this.currentFilter === 'all' 
                ? [...this.items] 
                : this.items.filter(item => item.category === this.currentFilter);
        } else {
            const searchTerm = query.toLowerCase();
            this.filteredItems = this.items.filter(item => {
                const matchesSearch = 
                    item.title.toLowerCase().includes(searchTerm) ||
                    item.description.toLowerCase().includes(searchTerm) ||
                    item.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                    item.author.toLowerCase().includes(searchTerm);
                
                const matchesCategory = this.currentFilter === 'all' || item.category === this.currentFilter;
                
                return matchesSearch && matchesCategory;
            });
        }
        this.renderItems();
    }

    renderItems() {
        const grid = document.getElementById('marketplaceGrid');
        if (!grid) return;

        if (this.filteredItems.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <h3>Aucun résultat trouvé</h3>
                    <p>Essayez de modifier vos critères de recherche</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.filteredItems.map(item => this.createItemCard(item)).join('');
        this.attachCardEventListeners();
    }

    createItemCard(item) {
        const isFavorite = this.favorites.includes(item.id);
        const discountPercent = item.originalPrice ? 
            Math.round(((parseFloat(item.originalPrice.replace('€', '')) - parseFloat(item.price.replace('€', ''))) / parseFloat(item.originalPrice.replace('€', ''))) * 100) : 0;

        return `
            <div class="marketplace-card" data-id="${item.id}">
                ${item.featured ? '<div class="featured-badge">Populaire</div>' : ''}
                ${discountPercent > 0 ? `<div class="discount-badge">-${discountPercent}%</div>` : ''}
                
                <div class="card-image" style="background-image: url('${item.image}')">
                    <div class="card-overlay">
                        <button class="btn-secondary btn-preview" ${!item.preview ? 'disabled' : ''}>
                            ${item.preview ? 'Aperçu' : 'Pas d\'aperçu'}
                        </button>
                    </div>
                </div>
                
                <div class="card-content">
                    <div class="card-header">
                        <h3 class="card-title">${item.title}</h3>
                        <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${item.id}">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>
                    
                    <p class="card-description">${item.description}</p>
                    
                    <div class="card-tags">
                        ${item.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                        ${item.tags.length > 3 ? `<span class="tag">+${item.tags.length - 3}</span>` : ''}
                    </div>
                    
                    <div class="card-meta">
                        <div class="card-author">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            ${item.author}
                        </div>
                        <div class="card-rating">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                            </svg>
                            ${item.rating}
                        </div>
                        <div class="card-downloads">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7,10 12,15 17,10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            ${this.formatNumber(item.downloads)}
                        </div>
                    </div>
                </div>
                
                <div class="card-footer">
                    <div class="card-price">
                        <span class="current-price">${item.price}</span>
                        ${item.originalPrice ? `<span class="original-price">${item.originalPrice}</span>` : ''}
                    </div>
                    <button class="btn-primary btn-download" data-id="${item.id}">
                        ${item.price === 'Gratuit' ? 'Télécharger' : 'Acheter'}
                    </button>
                </div>
            </div>
        `;
    }

    attachCardEventListeners() {
        // Favorite buttons
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = parseInt(btn.dataset.id);
                this.toggleFavorite(itemId);
            });
        });

        // Download/Purchase buttons
        document.querySelectorAll('.btn-download').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = parseInt(btn.dataset.id);
                this.handleDownload(itemId);
            });
        });

        // Preview buttons
        document.querySelectorAll('.btn-preview').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.marketplace-card');
                const itemId = parseInt(card.dataset.id);
                this.showPreview(itemId);
            });
        });

        // Card click for details
        document.querySelectorAll('.marketplace-card').forEach(card => {
            card.addEventListener('click', () => {
                const itemId = parseInt(card.dataset.id);
                this.showItemDetails(itemId);
            });
        });
    }

    toggleFavorite(itemId) {
        const index = this.favorites.indexOf(itemId);
        if (index > -1) {
            this.favorites.splice(index, 1);
            window.muzanApp?.showNotification('Retiré des favoris', 'info');
        } else {
            this.favorites.push(itemId);
            window.muzanApp?.showNotification('Ajouté aux favoris', 'success');
        }
        
        this.saveFavorites();
        this.renderItems(); // Re-render to update favorite icons
    }

    handleDownload(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (!item) return;

        if (item.price === 'Gratuit') {
            this.downloadItem(item);
        } else {
            this.showPurchaseModal(item);
        }
    }

    downloadItem(item) {
        // Simulate download process
        window.muzanApp?.showNotification(`Téléchargement de "${item.title}" commencé`, 'success');
        
        // Track download
        item.downloads++;
        
        // In a real app, this would trigger actual download
        setTimeout(() => {
            window.muzanApp?.showNotification('Téléchargement terminé !', 'success');
        }, 2000);
    }

    showPurchaseModal(item) {
        // Create and show purchase modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content glass-card">
                <span class="modal-close">&times;</span>
                <h2>Acheter ${item.title}</h2>
                <div class="purchase-details">
                    <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                    <p>${item.description}</p>
                    <div class="price-info">
                        <span class="current-price">${item.price}</span>
                        ${item.originalPrice ? `<span class="original-price">${item.originalPrice}</span>` : ''}
                    </div>
                </div>
                <div class="purchase-actions">
                    <button class="btn-secondary" onclick="this.closest('.modal').remove()">Annuler</button>
                    <button class="btn-primary" onclick="window.marketplaceSystem.processPurchase(${item.id}); this.closest('.modal').remove();">Confirmer l'achat</button>
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

    processPurchase(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (!item) return;

        // Simulate purchase process
        window.muzanApp?.showNotification('Traitement du paiement...', 'info');
        
        setTimeout(() => {
            window.muzanApp?.showNotification(`Achat de "${item.title}" réussi !`, 'success');
            this.downloadItem(item);
        }, 2000);
    }

    showPreview(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (!item || !item.preview) return;

        window.open(item.preview, '_blank');
    }

    showItemDetails(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (!item) return;

        // Create detailed view modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content glass-card" style="max-width: 800px;">
                <span class="modal-close">&times;</span>
                <div class="item-details">
                    <div class="item-header">
                        <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px;">
                        <div class="item-info">
                            <h2>${item.title}</h2>
                            <p class="item-author">Par ${item.author}</p>
                            <div class="item-stats">
                                <span class="stat">⭐ ${item.rating}</span>
                                <span class="stat">📥 ${this.formatNumber(item.downloads)}</span>
                                <span class="stat">📅 ${this.formatDate(item.dateAdded)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="item-description">
                        <h3>Description</h3>
                        <p>${item.description}</p>
                    </div>
                    
                    <div class="item-requirements">
                        <h3>Prérequis</h3>
                        <ul>
                            ${item.requirements.map(req => `<li>${req}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="item-tags">
                        <h3>Tags</h3>
                        <div class="tags-list">
                            ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="item-actions">
                        <div class="price-section">
                            <span class="current-price">${item.price}</span>
                            ${item.originalPrice ? `<span class="original-price">${item.originalPrice}</span>` : ''}
                        </div>
                        <div class="action-buttons">
                            ${item.preview ? `<button class="btn-secondary" onclick="window.open('${item.preview}', '_blank')">Aperçu</button>` : ''}
                            <button class="btn-primary" onclick="window.marketplaceSystem.handleDownload(${item.id}); this.closest('.modal').remove();">
                                ${item.price === 'Gratuit' ? 'Télécharger' : 'Acheter'}
                            </button>
                        </div>
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

    loadFavorites() {
        const saved = localStorage.getItem('muzanFavorites');
        return saved ? JSON.parse(saved) : [];
    }

    saveFavorites() {
        localStorage.setItem('muzanFavorites', JSON.stringify(this.favorites));
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('fr-FR');
    }
}

// Initialize marketplace system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.marketplaceSystem = new MarketplaceSystem();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MarketplaceSystem;
}