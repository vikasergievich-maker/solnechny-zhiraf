const ageCards = [...document.querySelectorAll('#directions .dir')];
const ageButtons = [...document.querySelectorAll('[data-age]')];
const ageStatus = document.querySelector('#age-results');
function ageMatches(label, filter) {
  if (filter === 'all') return true;
  if (label.includes('класс')) return filter === 'school';
  if (label === 'Старт') return false;
  if (filter === 'school') return false;
  const numbers = label.replaceAll(',', '.').match(/\d+(?:\.\d+)?/g)?.map(Number);
  if (!numbers) return false;
  const [low, high] = filter.split('-').map(Number);
  const minimum = numbers[0];
  const maximum = numbers[1] ?? Infinity;
  return minimum <= high && maximum >= low;
}
function filterAge(button) {
  ageButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let count = 0;
  ageCards.forEach(card => {
    const label = card.querySelector('.dir__tag').textContent.trim();
    const visible = ageMatches(label, button.dataset.age);
    card.hidden = !visible;
    if (visible) count++;
  });
  ageStatus.textContent = button.dataset.age === 'all' ? `Все направления: ${count}` : `Найдено направлений: ${count}. Точный возраст указан в карточках.`;
}
ageButtons.forEach(button => button.addEventListener('click', () => filterAge(button)));
filterAge(ageButtons[0]);
