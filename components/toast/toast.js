export function createToast(toastEl) {
  let timer = null;

  return function showToast(message, duration = 2200) {
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    clearTimeout(timer);
    timer = setTimeout(() => {
      toastEl.classList.remove('is-visible');
    }, duration);
  };
}
