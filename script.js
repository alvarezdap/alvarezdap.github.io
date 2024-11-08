document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los contenedores de los textos
    const englishTextContainer = document.getElementById('english-text');
    const spanishTextContainer = document.getElementById('spanish-text');

    // Variables para el estado actual
    let englishSentences = [];
    let spanishSentences = [];
    let currentSentenceIndex = 0;

    // Referencia al menú de capítulos
    const chapterSelect = document.getElementById('chapter-select');

    // Función para actualizar los textos según el capítulo seleccionado
    function updateTexts() {
        const selectedChapter = chapterSelect.value;

        // Definir las rutas de los archivos según el capítulo seleccionado
        const englishFilePath = `texts/${selectedChapter}_english.txt`;
        const spanishFilePath = `texts/${selectedChapter}_spanish.txt`;

        // Cargar y mostrar el texto sincronizado para el capítulo seleccionado
        loadAndDisplayText(englishFilePath, spanishFilePath);
    }

    // Cargar ambos archivos y mostrar el texto sincronizado
    async function loadAndDisplayText(englishFilePath, spanishFilePath) {
        try {
            // Cargar el contenido de los archivos de texto
            englishSentences = await loadText(englishFilePath);
            spanishSentences = await loadText(spanishFilePath);

            // Mostrar la primera oración
            currentSentenceIndex = 0;  // Reiniciar al primer índice
            showSentence(currentSentenceIndex);
        } catch (error) {
            console.error('Error al cargar los textos:', error);
        }
    }

    // Función para cargar el texto desde un archivo
    async function loadText(filePath) {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`No se pudo cargar el archivo: ${filePath}`);
        }
        const text = await response.text();
        return text.split('\n');  // Suponemos que cada oración está separada por un salto de línea
    }

    // Función para mostrar una oración en la página, aplicando gradiente
    function showSentence(index) {
        englishTextContainer.innerHTML = applyGradientToSentence(englishSentences[index] || '');
        spanishTextContainer.innerHTML = applyGradientToSentence(spanishSentences[index] || '');
    }

    // Función para aplicar gradiente a una oración
    function applyGradientToSentence(sentence) {
        if (!sentence) return '';
        
        // Dividir la oración en palabras y envolver cada una en un span con la clase `word`
        return sentence.split(' ').map(word => `<span class="word">${word}</span>`).join(' ');
      }
      

    // Funciones para la navegación entre oraciones
    function nextSentence() {
        if (currentSentenceIndex < englishSentences.length - 1) {
            currentSentenceIndex++;
            showSentence(currentSentenceIndex);
        }
    }

    function previousSentence() {
        if (currentSentenceIndex > 0) {
            currentSentenceIndex--;
            showSentence(currentSentenceIndex);
        }
    }

    // Escuchar clics en los botones de navegación
    document.getElementById('next-sentence').addEventListener('click', nextSentence);
    document.getElementById('prev-sentence').addEventListener('click', previousSentence);

    // Evento de teclado para navegar con las flechas del teclado
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            nextSentence();  // Flecha derecha para avanzar
        } else if (event.key === 'ArrowLeft') {
            previousSentence();  // Flecha izquierda para regresar
        }
    });

    // Escuchar cambios en el menú desplegable para cambiar entre capítulos
    chapterSelect.addEventListener('change', updateTexts);

    // Cargar y mostrar el texto del primer capítulo por defecto al cargar la página
    updateTexts();
});
