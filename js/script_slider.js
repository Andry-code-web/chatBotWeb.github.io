document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  let currentIndex = 0;

  function showSlide(index) {
    const slideWidth = slider.clientWidth;
    slider.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slider.children.length;
    showSlide(currentIndex);
  }

  function autoSlide() {
    nextSlide();
  }

  // Configura intervalo para el slider automático
  const intervalId = setInterval(autoSlide, 4000);

  // Detiene el slider automático al hacer clic en el slider
  slider.addEventListener("click", function () {
    clearInterval(intervalId);
    nextSlide();
    // Reanuda el slider automático después de un breve retraso
    setTimeout(function () {
      intervalId = setInterval(autoSlide, 4000);
    }, 4000);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const chatbotContainer = document.querySelector('.chatbot-container');
  const chatbotBtn = document.querySelector('.chatbot-btn');

  chatbotBtn.addEventListener('click', function () {
    chatbotContainer.classList.toggle('expanded');
  });
});



document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.querySelector('.menu-btn');
  const navigation = document.querySelector('.navigation');

  menuBtn.addEventListener('click', function () {
    navigation.classList.toggle('activate');
  });
});





