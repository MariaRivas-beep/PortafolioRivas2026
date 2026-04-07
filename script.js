/* === LÓGICA DEL NAVBAR === */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  // Solo aplicamos el cambio de transparente a sólido si NO estamos en una página de "folder"
  // Pero para simplificar y que sea igual a las otras:
  if (window.scrollY > 10) {
    navbar.classList.add('solid');
  } 
});

/* El código del carrusel se queda exactamente como estaba porque ya funcionaba bien */

// Inicialmente transparente
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('navbar').classList.add('transparent');
});
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.decorations img');
  images.forEach((img, index) => {
    setTimeout(() => {
      img.classList.add('visible');
    }, 400 * index); // efecto escalonado
  });
});

// Detecta cuando la sección entra en pantalla
document.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.querySelector('.about');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutSection.classList.add('visible');
      }
    });
  }, { threshold: 0.2 }); // Se activa cuando el 20% de la sección es visible

  observer.observe(aboutSection);
});
document.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById('typing-title');
  const text = title.textContent;
  title.textContent = ""; // limpiar texto inicial

  let i = 0;
  function typeEffect() {
    if (i < text.length) {
      title.textContent += text.charAt(i);
      i++;
      setTimeout(typeEffect, 120); // velocidad de escritura
    } else {
      // parpadeo del cursor
      setInterval(() => {
        if (title.style.borderRight) {
          title.style.borderRight = "";
        } else {
          title.style.borderRight = "3px solid #1e1e1e";
        }
      }, 500);
    }
  }

  typeEffect();
});

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.program-card img, .mini-card img');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => {
    item.style.animationPlayState = 'paused'; // pausa inicial
    observer.observe(item);
  });
});
// Añade esto a tu script.js
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.stack-card');
  
  const stackObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // Si la tarjeta está saliendo por arriba, podemos reducir su escala
      if (entry.boundingClientRect.top < 0) {
        entry.target.style.transform = `scale(${1 + entry.intersectionRatio * 0.05})`;
      }
    });
  }, { threshold: [0, 1] });

  cards.forEach(card => stackObserver.observe(card));
});
document.addEventListener('mousemove', (e) => {
  const blobs = document.querySelectorAll('.blob');
  const x = e.clientX;
  const y = e.clientY;

  blobs.forEach((blob, index) => {
    // Cada burbuja se mueve a una velocidad/distancia diferente
    const speed = (index + 1) * 0.05; 
    const moveX = (x - window.innerWidth / 2) * speed;
    const moveY = (y - window.innerHeight / 2) * speed;
    
    blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const titleElement = document.getElementById("typing-title");
  const text = titleElement.innerText;
  titleElement.innerText = ""; // Limpiamos el texto inicial
  
  let index = 0;
  let hasStarted = false;

  const typeWriter = () => {
    if (index < text.length) {
      titleElement.innerText += text.charAt(index);
      index++;
      setTimeout(typeWriter, 100); // Velocidad de escritura (100ms)
    } else {
      // Opcional: Quitar el cursor después de terminar
      setTimeout(() => {
        titleElement.style.borderRight = "none";
      }, 2000);
    }
  };

  // Configuramos el observador para detectar el scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasStarted) {
        hasStarted = true; // Para que solo ocurra una vez
        titleElement.classList.add("typing-active");
        typeWriter();
      }
    });
  }, { threshold: 0.8 }); // Se activa cuando el 80% del título es visible

  observer.observe(titleElement);
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector('.slider-track');
  const dots = document.querySelectorAll('.dot');
  
  if (track && dots.length > 0) {
    let counter = 0;
    const totalSlides = dots.length;

    const moveSlider = () => {
      counter = (counter + 1) % totalSlides; // Ciclo infinito: 0, 1, 2, 0...
      
      // Movemos el track basado en el número de slides
      const movePercentage = (counter * 100) / totalSlides;
      track.style.transform = `translateX(-${movePercentage}%)`;
      
      // Actualizamos los puntos (dots)
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === counter);
      });
    };

    // Iniciar movimiento automático cada 4 segundos
    setInterval(moveSlider, 4000);
  }
});

// Mantener el resto de tus funciones (Navbar, etc.) debajo...