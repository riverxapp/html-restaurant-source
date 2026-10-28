const photo = (id) => `assets/${id}.jpg`;
const dishes = {
  favorites: [
    { name: 'Tomato & basil fusilli', price: '$18', description: 'Twists of pasta, sun-ripened tomatoes, fresh basil & parmesan.', image: 'photo-1608897013039-887f21d8c804', alt: 'Tomato fusilli with basil, parmesan, and crusty bread', tag: 'A little indulgence' },
    { name: 'The green goddess salad', price: '$18', description: 'Seasonal greens, avocado, pomegranate, seeds & lemon dressing.', image: 'photo-1511690743698-d9d85f2fbf38', alt: 'A vibrant bowl of greens and fresh seasonal vegetables', tag: 'Plant-powered' },
    { name: 'Basil pesto pasta', price: '$24', description: 'Fresh basil pesto, cherry tomatoes, parmesan & a little olive oil.', image: 'photo-1473093295043-cdd812d0e601', alt: 'Fresh herb pasta with parmesan and tomatoes', tag: 'Comfort on a plate' }
  ],
  breakfast: [
    { name: 'Avocado on sourdough', price: '$14', description: 'Smashed avocado, a sunny-side egg, chili & toasted sourdough.', image: 'photo-1525351484163-7529414344d8', alt: 'Breakfast toast topped with eggs and fresh greens', tag: 'Slow morning favorite' },
    { name: 'Something sweet pancakes', price: '$15', description: 'Fluffy pancakes, seasonal berries & pure maple syrup.', image: 'photo-1528207776546-365bb710ee93', alt: 'A stack of pancakes topped with fresh berries', tag: 'Worth waking up for' },
    { name: 'The butter croissant', price: '$6', description: 'Golden, flaky layers. Baked fresh and served warm.', image: 'photo-1555507036-ab1f4038808a', alt: 'Golden freshly baked croissants', tag: 'From the oven' }
  ],
  mains: [
    { name: 'Basil pesto pasta', price: '$24', description: 'Fresh basil pesto, cherry tomatoes, parmesan & a little olive oil.', image: 'photo-1473093295043-cdd812d0e601', alt: 'Fresh herb pasta with parmesan', tag: 'Comfort on a plate' },
    { name: 'The green goddess salad', price: '$18', description: 'Seasonal greens, avocado, pomegranate, seeds & lemon dressing.', image: 'photo-1511690743698-d9d85f2fbf38', alt: 'Colorful seasonal vegetable bowl', tag: 'Plant-powered' },
    { name: 'Garden on a plate', price: '$19', description: 'Roasted seasonal vegetables, tender grains & lemon dressing.', image: 'photo-1512621776951-a57141f2eefd', alt: 'A fresh plate of seasonal vegetables', tag: 'Seasonal & soulful' }
  ],
  coffee: [
    { name: 'Your everyday flat white', price: '$5', description: 'Rich espresso meets velvety milk. Oat milk? Of course.', image: 'photo-1442512595331-e89e73853f31', alt: 'A cup of freshly made coffee surrounded by roasted beans', tag: 'A daily ritual' },
    { name: 'The butter croissant', price: '$6', description: 'Golden, flaky layers. Baked fresh and served warm.', image: 'photo-1555507036-ab1f4038808a', alt: 'Fresh butter croissants', tag: 'Better with coffee' },
    { name: 'Berry lovely pancakes', price: '$15', description: 'A little stack of happiness, with berries & maple syrup.', image: 'photo-1528207776546-365bb710ee93', alt: 'Pancakes with fresh berries', tag: 'Share something sweet' }
  ]
};
const menu = document.querySelector('#menu-items');
function renderMenu(category) {
  menu.innerHTML = dishes[category].map(dish => `<article class="dish"><div class="dish-image"><img src="${photo(dish.image)}" alt="${dish.alt}" loading="lazy"><span class="dish-tag">${dish.tag}</span></div><div class="dish-title"><h3>${dish.name}</h3><span class="dish-price">${dish.price}</span></div><p>${dish.description}</p></article>`).join('');
  menu.setAttribute('aria-labelledby', `tab-${category}`);
}
renderMenu('favorites');
const tabs = [...document.querySelectorAll('[role=tab]')];
function selectTab(tab) {
  tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
  renderMenu(tab.dataset.category);
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    let target;
    if (event.key === 'ArrowRight') target = tabs[(index + 1) % tabs.length];
    if (event.key === 'ArrowLeft') target = tabs[(index - 1 + tabs.length) % tabs.length];
    if (event.key === 'Home') target = tabs[0];
    if (event.key === 'End') target = tabs[tabs.length - 1];
    if (target) { event.preventDefault(); selectTab(target); target.focus(); }
  });
});
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#navigation');
function closeNav() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeNav(); toggle.focus(); } });
const lightbox = document.querySelector('#lightbox');
function openDialog(dialog) { dialog.showModal(); document.body.classList.add('modal-open'); }
document.querySelectorAll('.gallery-image').forEach(button => button.addEventListener('click', () => { const img = button.querySelector('img'); lightbox.querySelector('img').src = img.src.replace('w=700', 'w=1400').replace('w=900', 'w=1400'); lightbox.querySelector('img').alt = img.alt; lightbox.querySelector('p').textContent = button.dataset.caption; openDialog(lightbox); }));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  dialog.addEventListener('click', event => { const bounds = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close(); });
});
const bookingDialog = document.querySelector('#reservation-dialog');
const bookingDate = document.querySelector('#booking-date');
const bookingTime = document.querySelector('#booking-time');
const bookingForm = document.querySelector('#reservation-form');
const result = document.querySelector('#booking-result');
function localDate(date) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
function updateTimes() {
  const now = new Date();
  const date = new Date(`${bookingDate.value}T12:00:00`);
  const day = date.getDay();
  const opening = day === 0 || day === 6 ? 9 : 8;
  const closing = day === 0 ? 17 : day === 6 ? 22 : 21;
  const previous = bookingTime.value;
  const options = [];
  for (let hour = opening; hour < closing; hour++) for (const minute of [0,30]) {
    if (bookingDate.value === localDate(now) && hour * 60 + minute <= now.getHours() * 60 + now.getMinutes()) continue;
    const value = `${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}`;
    options.push(`<option value="${value}">${hour % 12 || 12}:${String(minute).padStart(2,'0')} ${hour >= 12 ? 'pm' : 'am'}</option>`);
  }
  bookingTime.innerHTML = options.length ? options.join('') : '<option value="">No times left — choose another date</option>';
  if ([...bookingTime.options].some(option => option.value === previous)) bookingTime.value = previous;
}
bookingDate.addEventListener('change', updateTimes);
document.querySelector('#open-reservation').addEventListener('click', () => {
  const today = localDate(new Date()); bookingDate.min = today; if (!bookingDate.value || bookingDate.value < today) bookingDate.value = today;
  updateTimes(); bookingForm.hidden = false; bookingForm.style.display = ''; result.hidden = true; openDialog(bookingDialog);
});
bookingForm.addEventListener('submit', event => {
  event.preventDefault(); if (!bookingForm.reportValidity()) return;
  const data = new FormData(bookingForm);
  const formattedDate = new Date(`${data.get('date')}T12:00:00`).toLocaleDateString(undefined, { weekday:'long',month:'long',day:'numeric' });
  const time = bookingTime.selectedOptions[0].textContent;
  bookingForm.hidden = true; bookingForm.style.display = 'none'; result.hidden = false;
  result.replaceChildren();
  const message = document.createElement('p'); message.textContent = `${data.get('name')}, here’s your plan: ${data.get('guests')} on ${formattedDate} at ${time}.`;
  const note = document.createElement('p'); note.textContent = 'This is a demo preview, not a confirmed reservation. No information has been sent or saved.';
  const again = document.createElement('button'); again.className = 'button'; again.textContent = 'Edit my plan ↗'; again.addEventListener('click', () => { result.hidden = true; bookingForm.hidden = false; bookingForm.style.display = ''; });
  result.append(message,note,again);
});
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold:.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
document.querySelector('#year').textContent = new Date().getFullYear();
