import { initTabs } from '../tab/tab.js';
import { createToast } from '../toast/toast.js';

function formatPrice(value) {
  const hasFraction = Math.round(value * 100) % 100 !== 0;
  const formatted = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
  return formatted + ' ₽';
}

function setupCard(card) {
  const tabsRoot = card.querySelector('[data-tabs]');
  const form = card.querySelector('[data-card-form]');
  const skuEl = card.querySelector('[data-card-sku]');
  const oldPriceEl = card.querySelector('[data-card-price-old]');
  const currentPriceEl = card.querySelector('[data-card-price-current]');
  const discountEl = card.querySelector('[data-card-discount]');
  const titleEl = card.querySelector('[data-card-title]');

  const toastEl = document.querySelector('[data-toast]');
  const showToast = toastEl ? createToast(toastEl) : null;

  tabsRoot.addEventListener('tabs:change', (event) => {
    const { input } = event.detail;
    const price = parseFloat(input.dataset.price);
    const oldPrice = parseFloat(input.dataset.oldPrice);

    skuEl.textContent = input.value;
    currentPriceEl.textContent = formatPrice(price);

    if (oldPrice && oldPrice > price) {
      oldPriceEl.hidden = false;
      oldPriceEl.textContent = formatPrice(oldPrice);

      const discount = Math.round((1 - price / oldPrice) * 100);
      discountEl.hidden = false;
      discountEl.textContent = '−' + discount + '%';
    } else {
      oldPriceEl.hidden = true;
      discountEl.hidden = true;
    }
  });

  initTabs(tabsRoot);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!showToast) return;

    const selected = tabsRoot.querySelector('.tabs__input:checked');
    const weight = selected.nextElementSibling.textContent.trim();
    const title = titleEl ? titleEl.textContent.trim() : 'Товар';
    showToast('Добавлено в корзину: ' + title + ', ' + weight);
  });
}

export function initCard(root = document) {
  root.querySelectorAll('[data-card]').forEach(setupCard);
}
