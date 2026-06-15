const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('active'));
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.12 });

reveals.forEach(item => observer.observe(item));

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.background = window.scrollY > 80 ? 'rgba(5,5,5,.94)' : 'rgba(5,5,5,.72)';
});
