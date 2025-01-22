window.addEventListener('load', function() {
    var audio = document.getElementById('miCancion');
    audio.play();
});

const countdown = () => {
    const eventDate = new Date("2025-02-22T07:30:00").getTime();
    const now = new Date().getTime();
    const diff = eventDate - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    }
};

setInterval(countdown, 1000);

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Configuración de Firebase

const firebaseConfig = {

  apiKey: "AIzaSyCw_zQW12NCOgyvUZuuixImwusIjVd14dY",

  authDomain: "asistencia-2981b.firebaseapp.com",

  projectId: "asistencia-2981b",

  storageBucket: "asistencia-2981b.appspot.com",

  messagingSenderId: "969215658827",

  appId: "1:969215658827:web:f624877e077815ae9836ce",

};

// Inicializar Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

let selectedResponse = "";

// Abrir el modal

function openModal() {

  document.getElementById("confirmation-modal").style.display = "block";

}

// Cerrar el modal

function closeModal() {

  document.getElementById("confirmation-modal").style.display = "none";

}

function openModal2() {

  document.getElementById("arrive-modal").style.display = "block";

}

// Cerrar el modal

function closeModal2() {

  document.getElementById("arrive-modal").style.display = "none";

}

function openModal3() {

  document.getElementById("dress-modal").style.display = "block";

}

// Cerrar el modal

function closeModal3() {

  document.getElementById("dress-modal").style.display = "none";

}

// Guardar la opción seleccionada

function selectButton(response) {

  selectedResponse = response;

  document.querySelectorAll(".response-button").forEach(button => {

    button.classList.remove("selected");

  });

  document.getElementById(response === "Si confirmo" ? "confirmButton" : "declineButton").classList.add("selected");

}

// Enviar la información a Firestore

async function submitResponse() {

  const name = document.getElementById("name").value;

  if (!name || !selectedResponse) {

    alert("Por favor, ingresa tu nombre y selecciona una opción.");

    return;

  }

  try {

    await addDoc(collection(db, "asistencias"), {

      nombre: name,

      asistencia: selectedResponse,

      fecha: new Date().toISOString(),

    });

    alert("Respuesta enviada correctamente. ¡Gracias!");

    closeModal();

  } catch (error) {

    console.error("Error al enviar la respuesta: ", error);

    alert("Hubo un error al enviar la respuesta. Intenta nuevamente.");

  }

}

function map() {
    const address = "Av. 33 #80c 30 - Laureles, Antioquia";
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, "_blank");
}

const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function updateCarousel() {
  // Desplaza el carrusel para mostrar el grupo de imágenes adecuado
  const offset = currentIndex * (100 / 3); // Cada grupo ocupa 33.333%
  carousel.style.transform = `translateX(-${offset}%)`;

  // Actualiza la clase "active" en las imágenes
  items.forEach((item, index) => {
    if (index === currentIndex + 13) {
      item.classList.add('active'); // Solo el central tiene marco blanco
    } else {
      item.classList.remove('active');
    }
  });

  // Actualiza los puntos activos
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function autoSlide() {
  currentIndex = (currentIndex + 1) % (items.length-13); // Ajustado para manejar 3 imágenes visibles
  updateCarousel();
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});

setInterval(autoSlide, 4000); // Cambia cada 3 segundos


//Exponer funciones al ámbito global
window.openModal = openModal;
window.closeModal = closeModal;
window.openModal2 = openModal2;
window.closeModal2 = closeModal2;
window.openModal3 = openModal3;
window.closeModal3 = closeModal3;
window.selectButton = selectButton;
window.submitResponse = submitResponse;
window.map = map;