const text = "Well, let's talk about me";
const typingSpeed = 100;
let charIndex = 0;

function typeEffect() {
  const target = document.getElementById("typing-text");
  if (!target) return;

  if (charIndex < text.length) {
    target.textContent += text.charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, typingSpeed);
  } else {
    // Añade el cursor parpadeante al final
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.innerHTML = "|"; 
    target.appendChild(cursor);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // --- OBSERVADOR PARA TYPING ---
  const typingTarget = document.getElementById("knowme");
  if (typingTarget) {
    const typingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Bajamos el threshold a 0.1 para que se active casi al instante
        if (entry.isIntersecting && charIndex === 0) {
          typeEffect();
          typingObserver.unobserve(entry.target); // Solo se ejecuta una vez
        }
      });
    }, { threshold: 0.1 });

    typingObserver.observe(typingTarget);
  }

  // --- OBSERVADOR PARA OBJETOS QUE CAEN (STICKERS) ---
  const observerOptions = {
    threshold: 0.01,
    rootMargin: "0px 0px -50px 0px"
  };

  const caerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("caer");
        caerObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".objeto-caida").forEach(obj => {
    caerObserver.observe(obj);
  });
});