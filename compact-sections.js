document.querySelectorAll('[data-expand]').forEach(button => {
  const collection = document.getElementById(button.dataset.expand);
  if (!collection) return;
  collection.classList.add('collection-collapsed');
  button.addEventListener('click', () => {
    const collapsed = collection.classList.toggle('collection-collapsed');
    button.setAttribute('aria-expanded', String(!collapsed));
    button.textContent = collapsed ? button.dataset.more : 'Свернуть';
    if (collapsed) collection.closest('section').scrollIntoView({block:'start'});
  });
});
