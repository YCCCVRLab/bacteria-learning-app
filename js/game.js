const game = {
    score: 0,
    totalItems: 0,
    matchedItems: 0,
    draggedItem: null,

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
        dropZonesContainer.style.gap = '20px';

        bacteriaTypes.forEach(type => {
            const zoneWrapper = document.createElement('div');
            zoneWrapper.style.textAlign = 'center';

            const img = document.createElement('img');
            img.src = type.image;
            img.style.width = '150px';
            img.style.height = '150px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '50%';
            img.style.border = '3px solid rgba(255,255,255,0.2)';
            img.style.marginBottom = '10px';
            img.draggable = false; // Prevent image dragging

            const dropZone = document.createElement('div');
            dropZone.className = 'drop-zone';
            dropZone.dataset.id = type.id;
            dropZone.textContent = '?';
            dropZone.style.margin = '0 auto';

            // Add event listeners for drop zone
            this.addDropZoneListeners(dropZone);

            zoneWrapper.appendChild(img);
            zoneWrapper.appendChild(dropZone);
            dropZonesContainer.appendChild(zoneWrapper);
        });

        gameArea.appendChild(dropZonesContainer);

        // Create draggable labels
        const labelsContainer = document.createElement('div');
        labelsContainer.style.textAlign = 'center';
        labelsContainer.style.padding = '20px';
        labelsContainer.style.borderTop = '1px solid rgba(255,255,255,0.1)';
        labelsContainer.id = 'labels-container';

        // Shuffle labels
        const shuffledTypes = [...bacteriaTypes].sort(() => Math.random() - 0.5);

        shuffledTypes.forEach(type => {
            const label = document.createElement('div');
            label.className = 'draggable-label';
            label.draggable = true;
            label.textContent = type.name;
            label.dataset.id = type.id;

            // Add event listeners for draggable
            this.addDraggableListeners(label);

            labelsContainer.appendChild(label);
        });

        gameArea.appendChild(labelsContainer);
    },

    addDraggableListeners: function (element) {
        // Mouse events
        element.addEventListener('dragstart', (e) => {
            this.draggedItem = element;
            e.dataTransfer.setData('text/plain', element.dataset.id);
            e.dataTransfer.effectAllowed = 'move';
            element.classList.add('dragging');
        });

        element.addEventListener('dragend', (e) => {
            this.draggedItem = null;
            element.classList.remove('dragging');
        });

        // Touch events
        element.addEventListener('touchstart', (e) => {
            this.draggedItem = element;
            element.classList.add('dragging');
            // Prevent scrolling while dragging
            document.body.style.overflow = 'hidden';
        }, { passive: false });

        element.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Prevent scrolling
            const touch = e.touches[0];

            // Move the element visually (optional, but good for feedback)
            element.style.position = 'fixed';
            element.style.left = (touch.clientX - element.offsetWidth / 2) + 'px';
            element.style.top = (touch.clientY - element.offsetHeight / 2) + 'px';
            element.style.zIndex = '1000';
        }, { passive: false });

        element.addEventListener('touchend', (e) => {
            const touch = e.changedTouches[0];
            element.classList.remove('dragging');
            document.body.style.overflow = ''; // Restore scrolling

            // Reset styles
            element.style.position = '';
            element.style.left = '';
            element.style.top = '';
            element.style.zIndex = '';

            // Check drop target
            const target = document.elementFromPoint(touch.clientX, touch.clientY);
            const dropZone = target ? target.closest('.drop-zone') : null;

            if (dropZone) {
                this.handleDrop(element.dataset.id, dropZone);
            }
        });
    },

    addDropZoneListeners: function (element) {
        element.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            element.classList.add('highlight');
        });

        element.addEventListener('dragleave', (e) => {
            element.classList.remove('highlight');
        });

        element.addEventListener('drop', (e) => {
            e.preventDefault();
            element.classList.remove('highlight');
            const draggedId = e.dataTransfer.getData('text/plain');
            this.handleDrop(draggedId, element);
        });
    },

    handleDrop: function (draggedId, dropZone) {
        const targetId = dropZone.dataset.id;

        if (draggedId === targetId) {
            // Correct match
            dropZone.textContent = window.bacteriaData.types.find(t => t.id === draggedId).name;
            dropZone.style.borderColor = '#00ff88';
            dropZone.style.background = 'rgba(0, 255, 136, 0.2)';
            dropZone.classList.add('matched');

            // Remove the draggable label
            // Check if we have a reference to the dragged item, otherwise find it
            let label = this.draggedItem;
            if (!label) {
                label = document.querySelector(`.draggable-label[data-id="${draggedId}"]`);
            }

            if (label) {
                label.remove();
            }

            game.matchedItems++;
            if (game.matchedItems === game.totalItems) {
                setTimeout(() => alert('Congratulations! You matched all bacteria!'), 500);
            }
        } else {
            // Incorrect
            dropZone.style.borderColor = '#ff0055';
            dropZone.classList.add('shake'); // Add shake animation class if we had one
            setTimeout(() => {
                if (!dropZone.classList.contains('matched')) {
                    dropZone.style.borderColor = 'rgba(255,255,255,0.3)';
                }
                dropZone.classList.remove('shake');
            }, 1000);
        }

        this.draggedItem = null;
    }
};

window.game = game;
