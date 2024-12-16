// Configuración inicial de canciones
const songs = [
    { title: "Everybody Changing", artist: "Keane", image: "keane.jpg", isNew: true, icon: "⭐" },
    { title: "Burn It Down", artist: "Linkin Park", image: "linkin_park.jpg", isNew: false, icon: "↓" },
    { title: "Human", artist: "The Killers", image: "the_killers.jpg", isNew: false, icon: "↑" },
    { title: "So Far Away", artist: "Martin Garrix", image: "martin_garrix.jpg", isNew: true, icon: "⭐" },
    { title: "Junk of the Heart", artist: "The Kooks", image: "kooks.jpg", isNew: false, icon: "↓" }
];

let validar_cambio = false; // Controla si ya se mezcló el ranking
let lastPositions = [...songs]; // Posiciones previas

// Genera el HTML de los íconos según el estado de la lista
function getIconHTML(song, currentIndex) {
    // Antes de mezclar: usa los valores predefinidos (isNew o icon)
    if (!validar_cambio) {
        if (song.isNew) return '<span class="icon">⭐</span>'; // Nuevo ingreso
        return `<span class="icon">${song.icon}</span>`; // Flechas iniciales
    }

    // Después de mezclar: íconos según el cambio de posición
    const previousIndex = lastPositions.indexOf(song);
    if (currentIndex < previousIndex) return '<span class="icon">↑</span>'; // Subió
    if (currentIndex > previousIndex) return '<span class="icon">↓</span>'; // Bajó
    return '<span class="icon">-</span>'; // Sin cambios
}

// Renderiza la lista de canciones en el DOM
function renderSongs() {
    const songList = document.getElementById("songList");
    songList.innerHTML = ""; // Limpia la lista actual

    songs.forEach((song, currentIndex) => {
        const currentPosition = currentIndex + 1; // Posición actual
        const iconHTML = getIconHTML(song, currentIndex); // Ícono dinámico

        // Elemento de la lista
        const listItem = document.createElement("li");
        listItem.className = "song-item";
        listItem.innerHTML = `
            <div class="image" style="background-image: url(${song.image});"></div>
            <div class="container">
                <div class="circle">${currentPosition}</div>
                ${iconHTML}
            </div>
            <div class="content">
                <div class="title-trapezoid">${song.title}</div>
                <div class="artist-trapezoid">${song.artist}</div>
            </div>
        `;
        songList.appendChild(listItem);
    });
    console.log("Lista renderizada");
}

// Inicializa la lista al cargar el navegador
document.addEventListener("DOMContentLoaded", () => {
    renderSongs();
    console.log("Inicializar lista");
});


// Mezcla las posiciones de las canciones aleatoriamente
function cambio_aleatorio() {
    lastPositions = [...songs]; // Guarda las posiciones actuales
    songs.sort(() => Math.random() - 0.5); // Mezcla aleatoriamente
    validar_cambio = true; // Cambia el estado a "mezclado"
    renderSongs(); // Vuelve a renderizar con las nuevas posiciones
    console.log("Canciones mezcladas");
}

// Crear un PDF con la lista de canciones
function exportar_PDF() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF(); //Crea una instancia de la libreria
    doc.setFontSize(20); // tamaño de la letra
    doc.text("Reporte Ranking Top 5", 10, 20); //posicion horizontal y vertical titulo

    doc.setFontSize(12); //tamaño del texto de la lista
    let yPosition = 30;
    songs.forEach((song, index) => {
        doc.text(`${index + 1}. ${song.title} - ${song.artist}`, 10, yPosition); //escribe la lista recorriendo el array songs
        yPosition += 10;
    });

    doc.save("ranking_musica.pdf"); //Exporta pdf
    console.log("PDF generado");
}

