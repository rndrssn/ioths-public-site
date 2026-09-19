document.querySelectorAll('[data-specimen]').forEach((specimen) => {
  const controls = specimen.querySelector('.specimen-controls');
  const buttons = [...controls.querySelectorAll('[data-stage]')];
  const panels = [...specimen.querySelectorAll('[data-panel]')];
  const select = (stage) => {
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.stage === stage)));
    panels.forEach((panel) => { panel.hidden = panel.dataset.panel !== stage; });
  };
  select('capture');
  controls.hidden = false;
  buttons.forEach((button) => button.addEventListener('click', () => select(button.dataset.stage)));
});
