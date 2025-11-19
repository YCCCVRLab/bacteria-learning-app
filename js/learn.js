const learn = {
    init: function () {
        this.renderGallery();
    },

    renderGallery: function () {
        const gallery = document.getElementById('bacteria-gallery');
        if (!gallery || !window.bacteriaData) return;

        gallery.innerHTML = window.bacteriaData.types.map(bacteria => `
            <div class="bacteria-card" onclick="learn.showDetails('${bacteria.id}')">
                <img src="${bacteria.image}" alt="${bacteria.name}" class="card-image">
                <div class="card-content">
                    <h3>${bacteria.name}</h3>
                    <p>${bacteria.description}</p>
                </div>
            </div>
        `).join('');
    },

    showDetails: function (id) {
        // For now, the card itself shows enough info, but we could expand this 
        // to show a modal or navigate to a detail view if needed.
        // Currently just logging or maybe adding a highlight effect.
        console.log(`Clicked on ${id}`);
    }
};

window.learn = learn;
