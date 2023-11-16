document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menu-btn');
    const navigation = document.querySelector('.navigation');
    const toggleBtn = document.querySelector('.toggle-btn');
    const eventos = document.querySelector('.eventos');
  
    menuBtn.addEventListener('click', function () {
      navigation.classList.toggle('active');
    });
  
    toggleBtn.addEventListener('click', function () {
      eventos.classList.toggle('active');
    });
  });