(() => {
  const canvas = document.getElementById('journal-life-field');
  const context = canvas.getContext('2d');
  if (!context) return;

  const toggle = document.getElementById('journal-life-toggle');
  const stepButton = document.getElementById('journal-life-step');
  const reset = document.getElementById('journal-life-reset');
  const status = document.getElementById('journal-life-status');
  const style = getComputedStyle(canvas);
  const colors = {
    paper: style.getPropertyValue('--paper').trim(),
    grid: style.getPropertyValue('--paper-deep').trim(),
    cell: style.getPropertyValue('--viz-sage').trim(),
  };
  const columns = 60;
  const rows = 48;
  const cellSize = 12;
  const generationInterval = 140;
  let grid = new Uint8Array(columns * rows);
  let nextGrid = new Uint8Array(columns * rows);
  let generation = 0;
  let population = 0;
  let animation = null;
  let lastTick = 0;
  const indexFor = (x, y) => y * columns + x;

  const seed = () => {
    grid.fill(0);
    [[0, 1], [1, 0], [1, 1], [1, 2], [2, 0]].forEach(([x, y]) => {
      grid[indexFor(x + 29, y + 22)] = 1;
    });
    generation = 0;
  };

  const describe = () => {
    const state = animation === null ? 'Paused' : 'Running';
    status.textContent = `${state} · Generation ${generation} · ${population} living cells`;
    canvas.setAttribute('aria-label', `${state} Game of Life field: generation ${generation}, ${population} living cells`);
  };

  const draw = () => {
    context.fillStyle = colors.paper;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = colors.grid;
    for (let x = 0; x <= columns; x += 1) context.fillRect(x * cellSize, 0, 1, canvas.height);
    for (let y = 0; y <= rows; y += 1) context.fillRect(0, y * cellSize, canvas.width, 1);
    context.fillStyle = colors.cell;
    population = 0;
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        if (!grid[indexFor(x, y)]) continue;
        context.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
        population += 1;
      }
    }
    describe();
  };

  const step = () => {
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        let neighbours = 0;
        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            if (dx === 0 && dy === 0) continue;
            neighbours += grid[indexFor((x + dx + columns) % columns, (y + dy + rows) % rows)];
          }
        }
        nextGrid[indexFor(x, y)] = neighbours === 3 || (grid[indexFor(x, y)] === 1 && neighbours === 2) ? 1 : 0;
      }
    }
    [grid, nextGrid] = [nextGrid, grid];
    generation += 1;
  };

  const stop = () => {
    if (animation !== null) cancelAnimationFrame(animation);
    animation = null;
    toggle.textContent = 'Start';
    toggle.setAttribute('aria-pressed', 'false');
    status.setAttribute('aria-live', 'polite');
  };

  const play = (timestamp) => {
    if (animation === null) return;
    if (timestamp - lastTick >= generationInterval) {
      step();
      draw();
      lastTick = timestamp;
    }
    animation = requestAnimationFrame(play);
  };

  toggle.addEventListener('click', () => {
    if (animation !== null) {
      stop();
    } else {
      toggle.textContent = 'Pause';
      toggle.setAttribute('aria-pressed', 'true');
      // Continuous generations must not overwhelm a screen reader's live queue.
      status.setAttribute('aria-live', 'off');
      lastTick = performance.now();
      animation = requestAnimationFrame(play);
    }
    describe();
  });
  stepButton.addEventListener('click', () => {
    stop();
    step();
    draw();
  });
  reset.addEventListener('click', () => {
    stop();
    seed();
    draw();
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) return;
    stop();
    describe();
  });
  window.addEventListener('pagehide', () => {
    stop();
    describe();
  });

  // Begin paused for every visitor, including those who prefer reduced motion.
  seed();
  draw();
  canvas.hidden = false;
  status.hidden = false;
  document.getElementById('journal-life-controls').hidden = false;
  document.getElementById('journal-life-fallback').hidden = true;
})();
