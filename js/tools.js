// MUZAN SIGMA TECH - Tools System

class ToolsSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupPasswordGenerator();
        this.setupSecurityAnalyzer();
    }

    setupPasswordGenerator() {
        const lengthSlider = document.getElementById('passwordLength');
        const lengthValue = document.getElementById('lengthValue');
        const generateBtn = document.getElementById('generatePassword');
        const copyBtn = document.getElementById('copyPassword');
        const passwordOutput = document.getElementById('generatedPassword');

        if (!lengthSlider || !generateBtn) return;

        // Update length display
        lengthSlider.addEventListener('input', (e) => {
            if (lengthValue) {
                lengthValue.textContent = e.target.value;
            }
        });

        // Generate password
        generateBtn.addEventListener('click', () => {
            const password = this.generatePassword();
            if (passwordOutput) {
                passwordOutput.value = password;
            }
        });

        // Copy password
        if (copyBtn && passwordOutput) {
            copyBtn.addEventListener('click', () => {
                passwordOutput.select();
                document.execCommand('copy');
                window.muzanApp?.showNotification('Mot de passe copié !', 'success');
            });
        }

        // Generate initial password
        setTimeout(() => {
            const password = this.generatePassword();
            if (passwordOutput) {
                passwordOutput.value = password;
            }
        }, 100);
    }

    generatePassword() {
        const length = parseInt(document.getElementById('passwordLength')?.value || 16);
        const includeUppercase = document.getElementById('includeUppercase')?.checked || true;
        const includeLowercase = document.getElementById('includeLowercase')?.checked || true;
        const includeNumbers = document.getElementById('includeNumbers')?.checked || true;
        const includeSymbols = document.getElementById('includeSymbols')?.checked || true;

        let charset = '';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (charset === '') {
            window.muzanApp?.showNotification('Sélectionnez au moins un type de caractère', 'warning');
            return '';
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        return password;
    }

    setupSecurityAnalyzer() {
        const analyzeBtn = document.getElementById('analyzeUrl');
        const urlInput = document.getElementById('urlToAnalyze');
        const resultDiv = document.getElementById('analysisResult');

        if (!analyzeBtn || !urlInput || !resultDiv) return;

        analyzeBtn.addEventListener('click', () => {
            const url = urlInput.value.trim();
            if (!url) {
                window.muzanApp?.showNotification('Veuillez entrer une URL', 'warning');
                return;
            }

            if (!this.isValidUrl(url)) {
                window.muzanApp?.showNotification('URL invalide', 'error');
                return;
            }

            this.analyzeUrl(url, resultDiv);
        });
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    async analyzeUrl(url, resultDiv) {
        resultDiv.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Analyse en cours...</p>
            </div>
        `;

        // Simulate analysis delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const analysis = this.performSecurityAnalysis(url);
        this.displayAnalysisResults(analysis, resultDiv);
    }

    performSecurityAnalysis(url) {
        // This is a mock analysis - in a real application, you would use actual security APIs
        const urlObj = new URL(url);
        const domain = urlObj.hostname;
        
        const analysis = {
            url: url,
            domain: domain,
            protocol: urlObj.protocol,
            timestamp: new Date().toISOString(),
            checks: []
        };

        // HTTPS Check
        analysis.checks.push({
            name: 'HTTPS',
            status: urlObj.protocol === 'https:' ? 'pass' : 'fail',
            message: urlObj.protocol === 'https:' ? 
                'Le site utilise HTTPS' : 
                'Le site n\'utilise pas HTTPS - risque de sécurité',
            severity: urlObj.protocol === 'https:' ? 'low' : 'high'
        });

        // Domain reputation (mock)
        const suspiciousDomains = ['malware.com', 'phishing.net', 'suspicious.org'];
        const isDomainSuspicious = suspiciousDomains.some(d => domain.includes(d));
        
        analysis.checks.push({
            name: 'Réputation du domaine',
            status: isDomainSuspicious ? 'fail' : 'pass',
            message: isDomainSuspicious ? 
                'Domaine potentiellement malveillant détecté' : 
                'Aucun problème de réputation détecté',
            severity: isDomainSuspicious ? 'high' : 'low'
        });

        // URL structure analysis
        const hasLongUrl = url.length > 100;
        const hasSuspiciousChars = /[<>{}|\\^`\[\]]/.test(url);
        const hasMultipleSubdomains = (domain.match(/\./g) || []).length > 2;

        analysis.checks.push({
            name: 'Structure de l\'URL',
            status: (hasLongUrl || hasSuspiciousChars || hasMultipleSubdomains) ? 'warning' : 'pass',
            message: hasLongUrl ? 'URL très longue détectée' :
                     hasSuspiciousChars ? 'Caractères suspects dans l\'URL' :
                     hasMultipleSubdomains ? 'Nombreux sous-domaines détectés' :
                     'Structure d\'URL normale',
            severity: (hasLongUrl || hasSuspiciousChars) ? 'medium' : 'low'
        });

        // Port analysis
        const port = urlObj.port;
        const commonPorts = ['80', '443', '8080', '8443'];
        const hasUncommonPort = port && !commonPorts.includes(port);

        analysis.checks.push({
            name: 'Port réseau',
            status: hasUncommonPort ? 'warning' : 'pass',
            message: hasUncommonPort ? 
                `Port non standard détecté: ${port}` : 
                'Port standard utilisé',
            severity: hasUncommonPort ? 'medium' : 'low'
        });

        // Calculate overall score
        const passCount = analysis.checks.filter(c => c.status === 'pass').length;
        const totalChecks = analysis.checks.length;
        analysis.score = Math.round((passCount / totalChecks) * 100);

        return analysis;
    }

    displayAnalysisResults(analysis, resultDiv) {
        const scoreColor = analysis.score >= 80 ? 'high' : 
                          analysis.score >= 60 ? 'medium' : 'low';

        resultDiv.innerHTML = `
            <div class="analysis-header">
                <h4>Analyse de sécurité</h4>
                <div class="analysis-url">${analysis.url}</div>
                <div class="analysis-timestamp">Analysé le ${new Date(analysis.timestamp).toLocaleString('fr-FR')}</div>
            </div>
            
            <div class="security-score">
                <span class="score-label">Score de sécurité:</span>
                <div class="score-bar">
                    <div class="score-fill ${scoreColor}" style="width: ${analysis.score}%"></div>
                </div>
                <span class="score-value">${analysis.score}/100</span>
            </div>
            
            <div class="security-checks">
                <h5>Vérifications de sécurité</h5>
                ${analysis.checks.map(check => `
                    <div class="security-check ${check.status}">
                        <div class="check-header">
                            <span class="check-name">${check.name}</span>
                            <span class="check-status ${check.status}">
                                ${check.status === 'pass' ? '✓' : 
                                  check.status === 'warning' ? '⚠' : '✗'}
                            </span>
                        </div>
                        <div class="check-message">${check.message}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="analysis-summary">
                <h5>Résumé</h5>
                <p>
                    ${analysis.score >= 80 ? 
                        '✅ Ce site semble sûr selon notre analyse.' :
                        analysis.score >= 60 ?
                        '⚠️ Ce site présente quelques points d\'attention.' :
                        '❌ Ce site présente des risques de sécurité potentiels.'
                    }
                </p>
                <p class="disclaimer">
                    <small>Cette analyse est indicative et ne remplace pas une évaluation de sécurité complète.</small>
                </p>
            </div>
        `;
    }

    // Additional utility tools
    generateHash(text, algorithm = 'SHA-256') {
        // This would use the Web Crypto API in a real implementation
        return crypto.subtle.digest(algorithm, new TextEncoder().encode(text))
            .then(hashBuffer => {
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            });
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    checkPasswordStrength(password) {
        let score = 0;
        const checks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            numbers: /\d/.test(password),
            symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
            noCommon: !this.isCommonPassword(password)
        };

        Object.values(checks).forEach(check => {
            if (check) score++;
        });

        return {
            score: score,
            maxScore: 6,
            strength: score <= 2 ? 'Faible' : 
                     score <= 4 ? 'Moyen' : 'Fort',
            checks: checks
        };
    }

    isCommonPassword(password) {
        const commonPasswords = [
            'password', '123456', '123456789', 'qwerty', 'abc123',
            'password123', 'admin', 'letmein', 'welcome', 'monkey'
        ];
        return commonPasswords.includes(password.toLowerCase());
    }

    encodeBase64(text) {
        return btoa(unescape(encodeURIComponent(text)));
    }

    decodeBase64(base64) {
        try {
            return decodeURIComponent(escape(atob(base64)));
        } catch (e) {
            return 'Erreur de décodage';
        }
    }

    generateQRCode(text) {
        // This would integrate with a QR code library in a real implementation
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
        return qrApiUrl;
    }
}

// Initialize tools system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.toolsSystem = new ToolsSystem();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ToolsSystem;
}