const game = {
    score: 0,
    totalItems: 0,
    matchedItems: 0,
    activeDragElement: null,
    originalParent: null,
    nextSibling: null,
    offset: { x: 0, y: 0 },

    init: function () {
        this.setupGame();
    },

    setupGame: function () {
        const gameArea = document.getElementById('game-area');
        if (!gameArea || !window.bacteriaData) return;

        const bacteriaTypes = window.bacteriaData.types;
        this.totalItems = bacteriaTypes.length;
        this.matchedItems = 0;

        // Clear area
        gameArea.innerHTML = '';

        // Create drop zones (Images)
        const dropZonesContainer = document.createElement('div');
        dropZonesContainer.style.display = 'flex';
        dropZonesContainer.style.justifyContent = 'space-around';
        dropZonesContainer.style.padding = '40px';
        dropZonesContainer.style.flexWrap = 'wrap';
        dropZonesContainer.style.gap = '40px'; // Increased gap

        bacteriaTypes.forEach(type => {
            const zoneWrapper = document.createElement('div');
            zoneWrapper.style.display = 'flex';
            zoneWrapper.style.flexDirection = 'column';
            zoneWrapper.style.alignItems = 'center';
            zoneWrapper.style.gap = '10px';

            const img = document.createElement('img');
            img.src = type.image;
            img.style.width = '150px';
            img.style.height = '150px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '50%';
            img.style.border = '3px solid rgba(255,255,255,0.2)';
            img.draggable = false;

            const dropZone = document.createElement('div');
            dropZone.className = 'drop-zone';
            dropZone.dataset.id = type.id;
            dropZone.textContent = '?';

            zoneWrapper.appendChild(img);
            zoneWrapper.appendChild(dropZone);
            dropZonesContainer.appendChild(zoneWrapper);
        });

        gameArea.appendChild(dropZonesContainer);

        // Create draggable labels container
        const labelsContainer = document.createElement('div');
        labelsContainer.id = 'labels-container';
        labelsContainer.style.display = 'flex';
        labelsContainer.style.justifyContent = 'center';
        labelsContainer.style.flexWrap = 'wrap';
        labelsContainer.style.gap = '15px';
        labelsContainer.style.padding = '30px';
        labelsContainer.style.borderTop = '1px solid rgba(255,255,255,0.1)';
        labelsContainer.style.minHeight = '120px';

        // Shuffle labels
        const shuffledTypes = [...bacteriaTypes].sort(() => Math.random() - 0.5);

        shuffledTypes.forEach(type => {
            const label = document.createElement('div');
            label.className = 'draggable-label';
            label.textContent = type.name;
            label.dataset.id = type.id;

            // Add custom drag listeners
            this.addDragListeners(label);

            labelsContainer.appendChild(label);
        });

        gameArea.appendChild(labelsContainer);

        // Global mouse/touch move and up listeners
        document.addEventListener('mousemove', this.handleMove.bind(this));
        document.addEventListener('mouseup', this.handleUp.bind(this));
        document.addEventListener('touchmove', this.handleMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleUp.bind(this));
    },

    addDragListeners: function (element) {
        const startDrag = (e) => {
            e.preventDefault();
            if (this.activeDragElement) return;

            this.activeDragElement = element;

            // Store original location to return if dropped invalidly
            this.originalParent = element.parentNode;
            this.nextSibling = element.nextElementSibling;

            // Get client coordinates
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;

            // Calculate offset
            const rect = element.getBoundingClientRect();
            this.offset.x = clientX - rect.left;
            this.offset.y = clientY - rect.top;

            // Move to body to avoid transform context issues
            element.style.width = rect.width + 'px';
            element.style.height = rect.height + 'px';
            element.style.position = 'fixed';
            element.style.zIndex = '9999';
            element.style.left = rect.left + 'px';
            element.style.top = rect.top + 'px';
            element.style.cursor = 'grabbing';

            document.body.appendChild(element);
        };

        element.addEventListener('mousedown', startDrag);
        element.addEventListener('touchstart', startDrag, { passive: false });
    },

    handleMove: function (e) {
        if (!this.activeDragElement) return;
        e.preventDefault();

        const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
        const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);

        this.activeDragElement.style.left = (clientX - this.offset.x) + 'px';
        this.activeDragElement.style.top = (clientY - this.offset.y) + 'px';
    },

    handleUp: function (e) {
        if (!this.activeDragElement) return;

        const element = this.activeDragElement;
        const clientX = e.clientX || (e.changedTouches ? e.changedTouches[0].clientX : 0);
        const clientY = e.clientY || (e.changedTouches ? e.changedTouches[0].clientY : 0);

        // Check drop target
        element.style.visibility = 'hidden';
        const target = document.elementFromPoint(clientX, clientY);
        element.style.visibility = 'visible';

        const dropZone = target ? target.closest('.drop-zone') : null;

        if (dropZone) {
            this.handleDrop(element, dropZone);
        } else {
            this.revertPosition(element);
        }

        element.style.cursor = 'grab';
        element.style.zIndex = '';
        this.activeDragElement = null;
    },

    handleDrop: function (element, dropZone) {
        const draggedId = element.dataset.id;
        const targetId = dropZone.dataset.id;

        if (draggedId === targetId) {
            // Correct match
            dropZone.textContent = window.bacteriaData.types.find(t => t.id === draggedId).name;
            dropZone.style.borderColor = '#00ff88';
            dropZone.style.background = 'rgba(0, 255, 136, 0.2)';
            dropZone.classList.add('matched');

            element.remove(); // Remove from body

            game.matchedItems++;
            if (game.matchedItems === game.totalItems) {
                setTimeout(() => alert('Congratulations! You matched all bacteria!'), 500);
            }
        } else {
            // Incorrect
            dropZone.style.borderColor = '#ff0055';
            setTimeout(() => {
                if (!dropZone.classList.contains('matched')) {
                    dropZone.style.borderColor = 'rgba(255,255,255,0.3)';
                }
            }, 1000);
            this.revertPosition(element);
        }
    },

    revertPosition: function (element) {
        // Put back in original container
        element.style.position = 'relative';
        element.style.left = 'auto';
        element.style.top = 'auto';
        element.style.width = 'auto';
        element.style.height = 'auto';
        element.style.zIndex = '';

        if (this.originalParent) {
            if (this.nextSibling) {
                this.originalParent.insertBefore(element, this.nextSibling);
            } else {
                this.originalParent.appendChild(element);
            }
        }
    }
};

window.game = game;
