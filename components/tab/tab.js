export function initTabs(root) {
  if (!root) return;

  const inputs = root.querySelectorAll('.tabs__input');

  inputs.forEach((input) => {
    input.addEventListener('change', () => {
      root.dispatchEvent(new CustomEvent('tabs:change', {
        detail: { value: input.value, input },
        bubbles: true,
      }));
    });
  });

  const checked = root.querySelector('.tabs__input:checked');
  if (checked) {
    root.dispatchEvent(new CustomEvent('tabs:change', {
      detail: { value: checked.value, input: checked },
      bubbles: true,
    }));
  }
}
