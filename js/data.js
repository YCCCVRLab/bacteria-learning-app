const bacteriaData = {
    types: [
        {
            id: 'coccus',
            name: 'Coccus',
            shape: 'Spherical',
            description: 'Cocci are spherical or oval-shaped bacteria. They can exist singly, in pairs (diplococci), in chains (streptococci), or in clusters (staphylococci). Examples include Staphylococcus aureus and Streptococcus pyogenes.',
            image: 'images/coccus_bacteria.png'
        },
        {
            id: 'bacillus',
            name: 'Bacillus',
            shape: 'Rod-shaped',
            description: 'Bacilli are rod-shaped bacteria. They can be found in soil and water. Some are harmful, like Bacillus anthracis (anthrax), while others are beneficial. They often form chains.',
            image: 'images/bacillus_bacteria.png'
        },
        {
            id: 'spirillum',
            name: 'Spirillum',
            shape: 'Spiral',
            description: 'Spirilla are spiral-shaped bacteria with rigid bodies. They move using flagella at one or both ends. An example is Spirillum minus.',
            image: 'images/spirillum_bacteria.png'
        }
    ],
    quiz: [
        {
            question: "Which bacteria shape is spherical?",
            options: ["Bacillus", "Coccus", "Spirillum", "Vibrio"],
            correct: 1 // Index of correct answer
        },
        {
            question: "What shape is Bacillus bacteria?",
            options: ["Spiral", "Spherical", "Rod-shaped", "Comma-shaped"],
            correct: 2
        },
        {
            question: "Which of these is a spiral-shaped bacterium?",
            options: ["E. coli", "Staphylococcus", "Spirillum", "Salmonella"],
            correct: 2
        },
        {
            question: "Bacteria arranged in clusters are often called...",
            options: ["Streptococci", "Staphylococci", "Diplococci", "Sarcina"],
            correct: 1
        }
    ]
};

window.bacteriaData = bacteriaData;
