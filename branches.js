const branchRail = document.querySelector('.branches');
const branchCards = [...branchRail.querySelectorAll('.branch')];
const branchButtons = [...document.querySelectorAll('[data-branch]')];
const branchMobile = matchMedia('(max-width:760px)');
const reducedMotion = matchMedia('(prefers-reduced-motion:reduce)');
function selectBranch(id, navigate = false) {
  const card = document.getElementById(id);
  branchButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.branch === id)));
  if (navigate && branchMobile.matches) {
    branchRail.scrollTo({left:card.offsetLeft - branchCards[0].offsetLeft, behavior:reducedMotion.matches?'instant':'smooth'});
  }
}
branchButtons.forEach(button => button.addEventListener('click', () => selectBranch(button.dataset.branch, true)));
branchCards.forEach(card => {
  let start;
  card.addEventListener('pointerdown', event => {
    start = {x:event.clientX, y:event.clientY};
  }, {passive:true});
  card.addEventListener('click', event => {
    if (!branchMobile.matches || event.target.closest('a,button,summary,input,select,textarea')) return;
    if (start && (Math.abs(event.clientX-start.x)>10 || Math.abs(event.clientY-start.y)>10)) return;
    selectBranch(card.id, true);
  });
});
let scrollFrame;
branchRail.addEventListener('scroll', () => {
  cancelAnimationFrame(scrollFrame);
  scrollFrame = requestAnimationFrame(() => {
    const left = branchRail.getBoundingClientRect().left;
    const nearest = branchCards.reduce((a,b) => Math.abs(a.getBoundingClientRect().left-left)<Math.abs(b.getBoundingClientRect().left-left)?a:b);
    selectBranch(nearest.id);
  });
}, {passive:true});
document.querySelectorAll('.hero__addresses a').forEach(link => {
  link.addEventListener('click', event => {
    if (!branchMobile.matches) return;
    event.preventDefault();
    selectBranch(link.hash.slice(1), true);
    document.querySelector('#branches').scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth', block:'start'});
  });
});
function updateBranchLayout() {
  branchCards.forEach(card => card.querySelector('details').open = !branchMobile.matches);
}
branchMobile.addEventListener('change', updateBranchLayout);
updateBranchLayout();
