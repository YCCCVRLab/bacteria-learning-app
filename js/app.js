const app = {
    currentPage: 'home',

    init: function() {
        this.setupNavigation();
        // Initialize other modules if they exist
        if (window.learn) window.learn.init();
        if (window.quiz) window.quiz.init();
        if (window.game) window.game.init();
    },

    setupNavigation: function() {
        const navLinks = document.querySelectorAll('.nav-links li');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const target = e.target.dataset.target;
                this.navigateTo(target);
            });
        });
    },

    navigateTo: function(pageId) {
        // Update active state in nav
        document.querySelectorAll('.nav-links li').forEach(link => {
            link.classList.toggle('active', link.dataset.target === pageId);
        });

        // Hide all sections
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
            section.classList.add('hidden');
        });

        // Show target section
        const targetSection = document.getElementById(pageId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            // Small timeout to allow display:block to apply before opacity transition
            setTimeout(() => {
                targetSection.classList.add('active');
            }, 10);
        }

        this.currentPage = pageId;
    }
};

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
