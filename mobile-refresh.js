const heroVisual = document.querySelector('.hero__visual');
const heroVisualHome = heroVisual.parentElement;
const heroContent = document.querySelector('.hero__content');
const mobileLayout = window.matchMedia('(max-width:600px)');
const arrangeHero = () => {
  if (mobileLayout.matches) heroContent.insertBefore(heroVisual, document.querySelector('.hero__cta'));
  else heroVisualHome.append(heroVisual);
};
mobileLayout.addEventListener('change', arrangeHero);
arrangeHero();
const teacherBlock = document.querySelector('.teachers');
if (teacherBlock && !document.getElementById('teachers')) teacherBlock.id = 'teachers';
const stickyBooking = document.querySelector('.floating-cta');
const heroBooking = document.querySelector('.hero__cta');
const registration = document.querySelector('#register');
let heroPassed = false;
let registrationVisible = false;
const syncBooking = () => {
  const show = heroPassed && !registrationVisible;
  stickyBooking.classList.toggle('is-visible', show);
  stickyBooking.inert = !show;
};
new IntersectionObserver(([entry]) => {
  heroPassed = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
  syncBooking();
}).observe(heroBooking);
new IntersectionObserver(([entry]) => {
  registrationVisible = entry.isIntersecting;
  syncBooking();
}).observe(registration);
syncBooking();
