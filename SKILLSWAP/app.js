// Sample skill data
const skillsData = [
    {
        id: 1,
        title: "Web Development",
        icon: "fas fa-code",
        provider: "Alex Chen",
        location: "San Francisco",
        description: "Learn HTML, CSS, JavaScript and modern frameworks from an experienced developer.",
        category: "technology",
        saved: false
    },
    {
        id: 2,
        title: "Guitar Lessons",
        icon: "fas fa-guitar",
        provider: "Maria Garcia",
        location: "Austin",
        description: "Professional guitarist offering beginner to intermediate guitar lessons. All styles.",
        category: "music",
        saved: false
    },
    {
        id: 3,
        title: "Spanish Conversation",
        icon: "fas fa-language",
        provider: "Carlos Ruiz",
        location: "Miami",
        description: "Native Spanish speaker offering conversation practice and cultural immersion.",
        category: "languages",
        saved: false
    },
    {
        id: 4,
        title: "Personal Training",
        icon: "fas fa-dumbbell",
        provider: "James Wilson",
        location: "Chicago",
        description: "Certified personal trainer offering fitness coaching and workout planning.",
        category: "sports",
        saved: false
    },
    {
        id: 5,
        title: "Italian Cooking",
        icon: "fas fa-utensils",
        provider: "Sofia Ricci",
        location: "Boston",
        description: "Learn authentic Italian recipes and cooking techniques from a native Italian chef.",
        category: "arts",
        saved: false
    },
    {
        id: 6,
        title: "Watercolor Painting",
        icon: "fas fa-paint-brush",
        provider: "Emma Lee",
        location: "Seattle",
        description: "Beginner-friendly watercolor painting lessons. No prior experience needed.",
        category: "arts",
        saved: false
    }
];

// DOM Elements
const skillListings = document.getElementById('skillListings');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const getStartedBtn = document.getElementById('getStartedBtn');
const joinNowBtn = document.getElementById('joinNowBtn');
const authModal = document.getElementById('authModal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterSubmit = document.getElementById('newsletterSubmit');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderSkills(skillsData);
    setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Category filter
    categoryFilter.addEventListener('change', handleCategoryFilter);
    
    // Auth buttons
    getStartedBtn.addEventListener('click', () => showAuthModal('register'));
    joinNowBtn.addEventListener('click', () => showAuthModal('register'));
    
    // Modal close
    closeModal.addEventListener('click', () => authModal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === authModal) authModal.style.display = 'none';
    });
    
    // Newsletter
    newsletterSubmit.addEventListener('click', handleNewsletterSubmit);
}

// Render skills to the page
function renderSkills(skills) {
    skillListings.innerHTML = '';
    
    if (skills.length === 0) {
        skillListings.innerHTML = '<p class="no-results">No skills match your search criteria.</p>';
        return;
    }
    
    skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <div class="skill-image">
                <i class="${skill.icon}"></i>
            </div>
            <div class="skill-content">
                <h3 class="skill-title">${skill.title}</h3>
                <div class="skill-meta">
                    <span><i class="fas fa-user"></i> ${skill.provider}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${skill.location}</span>
                </div>
                <p class="skill-description">${skill.description}</p>
                <div class="skill-actions">
                    <button class="btn btn-outline save-btn" data-id="${skill.id}" style="color: var(--dark); border-color: var(--light-gray);">
                        <i class="fas fa-heart${skill.saved ? ' saved' : ''}"></i> ${skill.saved ? 'Saved' : 'Save'}
                    </button>
                    <button class="btn btn-primary swap-btn" data-id="${skill.id}">
                        <i class="fas fa-exchange-alt"></i> Swap
                    </button>
                </div>
            </div>
        `;
        skillListings.appendChild(skillCard);
    });
    
    // Add event listeners to the new buttons
    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', handleSaveSkill);
    });
    
    document.querySelectorAll('.swap-btn').forEach(btn => {
        btn.addEventListener('click', handleSwapRequest);
    });
}

// Handle search functionality
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    
    const filteredSkills = skillsData.filter(skill => {
        const matchesSearch = skill.title.toLowerCase().includes(searchTerm) || 
                             skill.description.toLowerCase().includes(searchTerm) ||
                             skill.provider.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || skill.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    renderSkills(filteredSkills);
}

// Handle category filter
function handleCategoryFilter() {
    handleSearch(); // Reuse the search functionality which also considers category
}

// Handle saving a skill
function handleSaveSkill(e) {
    const skillId = parseInt(e.currentTarget.getAttribute('data-id'));
    const skill = skillsData.find(s => s.id === skillId);
    
    if (skill) {
        skill.saved = !skill.saved;
        e.currentTarget.innerHTML = `<i class="fas fa-heart${skill.saved ? ' saved' : ''}"></i> ${skill.saved ? 'Saved' : 'Save'}`;
        
        // Visual feedback
        if (skill.saved) {
            e.currentTarget.style.color = 'var(--accent)';
            showNotification('Skill saved to your favorites!');
        } else {
            e.currentTarget.style.color = 'var(--dark)';
            showNotification('Skill removed from favorites.');
        }
    }
}

// Handle swap request
function handleSwapRequest(e) {
    const skillId = parseInt(e.currentTarget.getAttribute('data-id'));
    const skill = skillsData.find(s => s.id === skillId);
    
    if (skill) {
        showNotification(`Swap request sent to ${skill.provider}! They will be notified of your interest.`);
        
        // You could add more complex logic here like:
        // 1. Checking if user is logged in
        // 2. Sending the request to a backend
        // 3. Updating UI to show pending status
    }
}

// Show authentication modal
function showAuthModal(type) {
    modalBody.innerHTML = '';
    
    if (type === 'login') {
        modalBody.innerHTML = `
            <h2>Login to Your Account</h2>
            <form class="auth-form" id="loginForm">
                <div class="form-group">
                    <label for="loginEmail">Email</label>
                    <input type="email" id="loginEmail" required>
                </div>
                <div class="form-group">
                    <label for="loginPassword">Password</label>
                    <input type="password" id="loginPassword" required>
                </div>
                <button type="submit" class="form-submit">Login</button>
                <div class="form-toggle">
                    Don't have an account? <a id="showRegister">Register</a>
                </div>
            </form>
        `;
    } else {
        modalBody.innerHTML = `
            <h2>Create an Account</h2>
            <form class="auth-form" id="registerForm">
                <div class="form-group">
                    <label for="registerName">Full Name</label>
                    <input type="text" id="registerName" required>
                </div>
                <div class="form-group">
                    <label for="registerEmail">Email</label>
                    <input type="email" id="registerEmail" required>
                </div>
                <div class="form-group">
                    <label for="registerPassword">Password</label>
                    <input type="password" id="registerPassword" required>
                </div>
                <div class="form-group">
                    <label for="registerSkills">Skills You Offer</label>
                    <input type="text" id="registerSkills" placeholder="e.g., Web Development, Guitar">
                </div>
                <div class="form-group">
                    <label for="registerLearn">Skills You Want to Learn</label>
                    <input type="text" id="registerLearn" placeholder="e.g., Spanish, Cooking">
                </div>
                <button type="submit" class="form-submit">Register</button>
                <div class="form-toggle">
                    Already have an account? <a id="showLogin">Login</a>
                </div>
            </form>
        `;
    }
    
    authModal.style.display = 'block';
    
    // Add event listeners to the form and toggle links
    const form = document.getElementById(type === 'login' ? 'loginForm' : 'registerForm');
    form.addEventListener('submit', handleAuthSubmit);
    
    const toggleLink = document.getElementById(type === 'login' ? 'showRegister' : 'showLogin');
    toggleLink.addEventListener('click', () => {
        showAuthModal(type === 'login' ? 'register' : 'login');
    });
}

// Handle authentication form submission
function handleAuthSubmit(e) {
    e.preventDefault();
    
    if (e.target.id === 'loginForm') {
        // In a real app, you would validate credentials with a backend
        showNotification('Login successful! Redirecting...');
        setTimeout(() => {
            authModal.style.display = 'none';
        }, 1500);
    } else {
        // In a real app, you would send registration data to a backend
        showNotification('Registration successful! Welcome to SkillSwap.');
        setTimeout(() => {
            authModal.style.display = 'none';
        }, 1500);
    }
}

// Handle newsletter subscription
function handleNewsletterSubmit() {
    const email = newsletterEmail.value;
    
    if (!email || !email.includes('@')) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    showNotification('Thank you for subscribing to our newsletter!');
    newsletterEmail.value = '';
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type === 'error' ? 'error' : ''}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}