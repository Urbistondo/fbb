const program = {
  days: [
    {
      title: 'Day 1 – Upper Push (Bench · Back · Traps)',
      focus: 'Bench-centric push day with heavy back pairing and trap finisher.',
      sections: [
        {
          title: 'Warm-Up & Primers',
          subtitle: 'Breathing reset, activation, and ramping sets',
          type: 'checklist',
          items: [
            {
              id: 'd1-warm-1',
              name: '5 min cyclical warm-up',
              detail: 'Rower or bike · Keep HR below 120 bpm',
            },
            {
              id: 'd1-warm-2',
              name: 'T-Spine Opener Complex',
              detail: '2×12 each · Wall slides + band pull-aparts',
            },
            {
              id: 'd1-warm-3',
              name: 'Bench Press Ramps',
              detail: '3 progressive sets · 8, 5, 3 reps to working load',
            },
          ],
        },
        {
          title: 'Main Lift Superset',
          subtitle: 'Push / pull density pairing',
          type: 'exercises',
          items: [
            {
              id: 'd1-main-1',
              name: 'Barbell Bench Press',
              scheme: '4×6 @ 190 lb · Tempo 21X1',
              notes: 'Pause first rep, keep feet anchored. Add drop set if RIR > 1.',
              tags: ['Strength', 'Primary'],
            },
            {
              id: 'd1-main-2',
              name: 'Chest-Supported Row',
              scheme: '4×8 @ RPE 8',
              notes: 'Control eccentric · 1 sec squeeze at top.',
              tags: ['Back', 'Superset'],
            },
          ],
        },
        {
          title: 'Accessory Giant Set',
          subtitle: 'Chasing volume with quality contractions',
          type: 'exercises',
          items: [
            {
              id: 'd1-acc-1',
              name: 'Seated DB Shoulder Press',
              scheme: '3×12 @ RIR 1',
              notes: 'Neutral grip · 2 sec eccentric.',
              tags: ['Shoulders'],
            },
            {
              id: 'd1-acc-2',
              name: 'Cable Face Pull',
              scheme: '3×15',
              notes: 'Rope high to forehead · Pull apart hard.',
              tags: ['Upper Back'],
            },
            {
              id: 'd1-acc-3',
              name: 'DB Shrug ISO Hold',
              scheme: '3×20s @ Heavy',
              notes: 'Slight forward lean to load traps.',
              tags: ['Traps'],
            },
          ],
        },
        {
          title: 'Finisher',
          subtitle: 'Conditioning + core',
          type: 'exercises',
          items: [
            {
              id: 'd1-finisher-1',
              name: 'Assault Bike EMOM',
              scheme: '10 min · 12/9 calories',
              notes: 'Stay smooth · Add +1 cal if HR < 165.',
              tags: ['Conditioning'],
            },
            {
              id: 'd1-finisher-2',
              name: 'Farmer Carry Ladder',
              scheme: '3 rounds · 80 ft',
              notes: 'Increase 10 lb when unbroken.',
              tags: ['Core'],
            },
          ],
        },
      ],
    },
    {
      title: 'Day 2 – Upper Pull (Fly Press Emphasis)',
      focus: 'Vertical pulling focus with chest-supported hypertrophy work.',
      sections: [
        {
          title: 'Warm-Up & Activation',
          subtitle: 'Scapular control before loading',
          type: 'checklist',
          items: [
            {
              id: 'd2-warm-1',
              name: 'Band Lat Prayer',
              detail: '2×12 · Slow exhale in stretched position',
            },
            {
              id: 'd2-warm-2',
              name: 'Single-Arm Row Prep',
              detail: '2×10 each side @ light weight',
            },
          ],
        },
        {
          title: 'Strength Wave',
          subtitle: 'Heavy hinge + vertical pull',
          type: 'exercises',
          items: [
            {
              id: 'd2-main-1',
              name: 'Weighted Pull-Up',
              scheme: '5×5 @ bodyweight + 25 lb',
              notes: 'Neutral grip · stay tight · full lockout.',
              tags: ['Strength'],
            },
            {
              id: 'd2-main-2',
              name: 'Trap Bar Deadlift (High Handle)',
              scheme: '5×3 @ 345 lb',
              notes: 'Explosive concentric · belt on last 3 sets.',
              tags: ['Power'],
            },
          ],
        },
        {
          title: 'Hypertrophy Circuit',
          subtitle: 'Lat stretch + chest pump pairing',
          type: 'exercises',
          items: [
            {
              id: 'd2-acc-1',
              name: 'Meadows Row',
              scheme: '3×12/side @ RPE 8',
              notes: 'Strap in · drive elbow low.',
              tags: ['Lats'],
            },
            {
              id: 'd2-acc-2',
              name: 'Low Cable Fly Press',
              scheme: '3×15',
              notes: 'Squeeze and hold 1 sec at top.',
              tags: ['Chest'],
            },
            {
              id: 'd2-acc-3',
              name: 'Incline DB Curl',
              scheme: '3×12',
              notes: 'Supinate aggressively · 2 sec eccentric.',
              tags: ['Arms'],
            },
          ],
        },
        {
          title: 'Core & Conditioning',
          subtitle: 'Keep intensity moderate · nasal breathing',
          type: 'exercises',
          items: [
            {
              id: 'd2-finisher-1',
              name: 'Incline Treadmill Walk',
              scheme: '15 min @ 9% · 3.2 mph',
              notes: 'Increase grade 1% when RPE < 7.',
              tags: ['Conditioning'],
            },
            {
              id: 'd2-finisher-2',
              name: 'Dead Bug Pallof Press',
              scheme: '3×12/side',
              notes: 'Keep low back glued down.',
              tags: ['Core'],
            },
          ],
        },
      ],
    },
    {
      title: 'Day 3 – Lower Squat (Single-Leg + Core)',
      focus: 'Lower-body volume wave with single-leg emphasis and trunk work.',
      sections: [
        {
          title: 'Prep & Mobility',
          subtitle: 'Open hips and ankles before squats',
          type: 'checklist',
          items: [
            {
              id: 'd3-warm-1',
              name: '90/90 Hip Opener',
              detail: '2×45s per position · Breathe slow',
            },
            {
              id: 'd3-warm-2',
              name: 'Cossack Squat Pulse',
              detail: '2×10/side · Bodyweight',
            },
            {
              id: 'd3-warm-3',
              name: 'Goblet Squat Ramps',
              detail: '3×8 building to working weight',
            },
          ],
        },
        {
          title: 'Strength Priority',
          subtitle: 'Squat wave + posterior chain pairing',
          type: 'exercises',
          items: [
            {
              id: 'd3-main-1',
              name: 'Safety Bar Squat',
              scheme: '5×5 @ 275 lb',
              notes: '2 sec pause on rep 1 · Drive up fast.',
              tags: ['Strength'],
            },
            {
              id: 'd3-main-2',
              name: 'Romanian Deadlift',
              scheme: '4×8 @ RPE 8',
              notes: 'Keep lats packed · stretch hamstrings.',
              tags: ['Hinge'],
            },
          ],
        },
        {
          title: 'Accessory Work',
          subtitle: 'Single-leg drive + glute med work',
          type: 'exercises',
          items: [
            {
              id: 'd3-acc-1',
              name: 'Rear-Foot Elevated Split Squat',
              scheme: '3×10/side',
              notes: 'Hold DBs · 3 sec eccentric.',
              tags: ['Single-Leg'],
            },
            {
              id: 'd3-acc-2',
              name: 'Glute-Ham Raise',
              scheme: '3×8',
              notes: 'Control descent · add band if needed.',
              tags: ['Posterior'],
            },
            {
              id: 'd3-acc-3',
              name: 'Lateral Sled Drag',
              scheme: '3×40 ft/side',
              notes: 'Drive knee over toe · stay tall.',
              tags: ['Conditioning'],
            },
          ],
        },
        {
          title: 'Core Finisher',
          subtitle: 'Anti-extension & anti-rotation',
          type: 'exercises',
          items: [
            {
              id: 'd3-finisher-1',
              name: 'Hanging Knee Raise',
              scheme: '3×12',
              notes: 'Posterior pelvic tilt · slow lower.',
              tags: ['Core'],
            },
            {
              id: 'd3-finisher-2',
              name: 'Half-Kneeling Cable Chop',
              scheme: '3×15/side',
              notes: 'Lock hips · rotate through thoracic spine.',
              tags: ['Core'],
            },
          ],
        },
      ],
    },
    {
      title: 'Day 4 – Lower Hinge (Athleticism Emphasis)',
      focus: 'Explosive hinge strength with speed and posterior chain finishers.',
      sections: [
        {
          title: 'Prep & Potentiation',
          subtitle: 'Dynamic warm-up into plyometric primer',
          type: 'checklist',
          items: [
            {
              id: 'd4-warm-1',
              name: 'Assault Bike Flush',
              detail: '4 min build · light sweat',
            },
            {
              id: 'd4-warm-2',
              name: 'Banded Hip Hinge',
              detail: '2×15 · Focus on glute lockout',
            },
            {
              id: 'd4-warm-3',
              name: 'Box Jump Primer',
              detail: '3×3 @ 30" · Stick the landing',
            },
          ],
        },
        {
          title: 'Power & Strength',
          subtitle: 'Rate-of-force meets heavy hinge',
          type: 'exercises',
          items: [
            {
              id: 'd4-main-1',
              name: 'Trap Bar Jump',
              scheme: '4×4 @ 135 lb',
              notes: 'Explode · reset each rep.',
              tags: ['Power'],
            },
            {
              id: 'd4-main-2',
              name: 'Trap Bar Deadlift',
              scheme: '5×3 @ 365 lb',
              notes: 'Hold 1 sec at top · Control eccentric.',
              tags: ['Strength'],
            },
          ],
        },
        {
          title: 'Posterior Chain Complex',
          subtitle: 'Glute + hamstring fatigue resistance',
          type: 'exercises',
          items: [
            {
              id: 'd4-acc-1',
              name: 'Hip Thrust (Barbell)',
              scheme: '4×10 @ RIR 1',
              notes: 'Pause at lockout · neutral ribs.',
              tags: ['Glutes'],
            },
            {
              id: 'd4-acc-2',
              name: 'Reverse Hyperextension',
              scheme: '3×15',
              notes: 'Control swing · squeeze at top.',
              tags: ['Posterior'],
            },
            {
              id: 'd4-acc-3',
              name: 'Hamstring Slider Curl',
              scheme: '3×12',
              notes: 'Slow concentric · stay hips-high.',
              tags: ['Hamstrings'],
            },
          ],
        },
        {
          title: 'Conditioning & Mobility',
          subtitle: 'Cool down and re-balance',
          type: 'exercises',
          items: [
            {
              id: 'd4-finisher-1',
              name: 'Erg Intervals',
              scheme: '6×40s on / 20s off @ RPE 8',
              notes: 'Alternate damper each interval.',
              tags: ['Conditioning'],
            },
            {
              id: 'd4-finisher-2',
              name: '90/90 Breathing Reset',
              scheme: '3×8 breaths',
              notes: 'Feet on wall · long exhales.',
              tags: ['Recovery'],
            },
          ],
        },
      ],
    },
  ],
};

const storageKey = 'pump-condition-checklist-v1';
const storedState = JSON.parse(localStorage.getItem(storageKey) || '{}');

const state = {
  activeDay: 0,
  completion: storedState.completion || {},
  weekly: storedState.weekly || {},
  logs: storedState.logs || {},
  expanded: storedState.expanded || {},
};

function getLog(id) {
  if (!state.logs[id]) {
    state.logs[id] = {
      weight: '',
      reps: '',
      rpe: '',
      notes: '',
    };
  }
  return state.logs[id];
}

function formatLogSummary(log) {
  const parts = [];
  if (log.weight) parts.push(`Weight ${log.weight}`);
  if (log.reps) parts.push(`${log.reps} reps`);
  if (log.rpe) parts.push(`RPE ${log.rpe}`);
  return parts.length ? `Logged – ${parts.join(' · ')}` : 'Add training log';
}

function formatLogPreview(log) {
  const parts = [];
  if (log.weight) parts.push(`${log.weight} lb`);
  if (log.reps) parts.push(`${log.reps} reps`);
  if (log.rpe) parts.push(`RPE ${log.rpe}`);

  let preview = parts.join(' · ');
  if (log.notes) {
    preview = preview ? `${preview} — ${log.notes}` : log.notes;
  }

  return preview;
}

const dayNavButtons = document.querySelectorAll('.day-nav__btn');
const dayTitle = document.querySelector('.js-day-title');
const dayFocus = document.querySelector('.js-day-focus');
const dayContent = document.querySelector('.js-day-content');
const dayProgressFill = document.querySelector('.js-day-progress');
const dayProgressValue = document.querySelector('.js-day-progress-value');
const sessionCount = document.querySelector('.js-session-count');

function persistState() {
  localStorage.setItem(
    storageKey,
    JSON.stringify({
      completion: state.completion,
      weekly: state.weekly,
      logs: state.logs,
      expanded: state.expanded,
    })
  );
}

function renderDay(index) {
  const day = program.days[index];
  dayTitle.textContent = day.title;
  dayFocus.textContent = day.focus;
  dayContent.innerHTML = '';

  let total = 0;
  let done = 0;

  day.sections.forEach((section) => {
    const sectionEl = document.createElement('article');
    sectionEl.className = 'day-section';

    const header = document.createElement('header');
    header.className = 'day-section__header';

    const heading = document.createElement('div');
    const title = document.createElement('h3');
    title.className = 'day-section__title';
    title.textContent = section.title;
    heading.appendChild(title);

    if (section.subtitle) {
      const subtitle = document.createElement('p');
      subtitle.className = 'day-section__subtitle';
      subtitle.textContent = section.subtitle;
      heading.appendChild(subtitle);
    }

    header.appendChild(heading);
    sectionEl.appendChild(header);

    const body = document.createElement('div');
    body.className = 'day-section__body';

    if (section.type === 'checklist') {
      const list = document.createElement('div');
      list.className = 'exercise-grid';
      section.items.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'exercise-card';

        const label = document.createElement('label');
        label.className = 'exercise-card__checkbox';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.dataset.id = item.id;
        checkbox.checked = Boolean(state.completion[item.id]);
        checkbox.addEventListener('change', () => {
          state.completion[item.id] = checkbox.checked;
          persistState();
          renderDay(state.activeDay);
          updateWeeklyProgress();
        });

        const info = document.createElement('div');
        info.innerHTML = `<strong>${item.name}</strong><br/><span>${item.detail}</span>`;

        label.append(checkbox, info);
        card.appendChild(label);
        list.appendChild(card);

        total += 1;
        if (checkbox.checked) done += 1;
      });
      body.appendChild(list);
    }

    if (section.type === 'exercises') {
      const grid = document.createElement('div');
      grid.className = 'exercise-grid';

      section.items.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'exercise-card';

        const header = document.createElement('div');
        header.className = 'exercise-card__header';

        const title = document.createElement('div');
        title.innerHTML = `<h4 class="exercise-card__title">${item.name}</h4>`;

        const meta = document.createElement('p');
        meta.className = 'exercise-card__meta';
        meta.textContent = item.scheme;

        header.append(title, meta);
        card.appendChild(header);

        if (item.tags?.length) {
          const tags = document.createElement('div');
          tags.className = 'exercise-card__tags';
          item.tags.forEach((tag) => {
            const chip = document.createElement('span');
            chip.className = 'tag';
            chip.textContent = tag;
            tags.appendChild(chip);
          });
          card.appendChild(tags);
        }

        if (item.notes) {
          const note = document.createElement('p');
          note.className = 'exercise-card__note';
          note.textContent = item.notes;
          card.appendChild(note);
        }

        const log = getLog(item.id);

        const logPreview = document.createElement('p');
        logPreview.className = 'exercise-card__log-preview';
        card.appendChild(logPreview);

        const logSection = document.createElement('details');
        logSection.className = 'exercise-log';
        if (state.expanded[item.id]) {
          logSection.open = true;
        }

        const summary = document.createElement('summary');
        summary.className = 'exercise-log__summary';
        logSection.appendChild(summary);

        const updateLogOutputs = () => {
          summary.textContent = formatLogSummary(log);
          const previewText = formatLogPreview(log);
          if (previewText) {
            logPreview.textContent = previewText;
            logPreview.hidden = false;
          } else {
            logPreview.textContent = '';
            logPreview.hidden = true;
          }
        };

        const form = document.createElement('div');
        form.className = 'exercise-log__form';

        const hint = document.createElement('p');
        hint.className = 'exercise-log__hint';
        hint.textContent = 'Track what you actually hit today.';
        form.appendChild(hint);

        const createField = (labelText, field, options = {}) => {
          const wrapper = document.createElement('label');
          wrapper.className = 'exercise-log__field';

          const span = document.createElement('span');
          span.textContent = labelText;

          let input;
          if (options.element === 'textarea') {
            input = document.createElement('textarea');
            input.rows = options.rows || 3;
          } else {
            input = document.createElement('input');
            input.type = options.type || 'text';
          }

          if (options.step) input.step = options.step;
          if (options.min) input.min = options.min;
          if (options.max) input.max = options.max;
          if (options.placeholder) input.placeholder = options.placeholder;

          input.value = log[field] || '';

          input.addEventListener('input', () => {
            log[field] = input.value;
            state.logs[item.id] = log;
            persistState();
            updateLogOutputs();
          });

          wrapper.append(span, input);
          return wrapper;
        };

        const weightField = createField('Weight (lb)', 'weight', {
          type: 'number',
          step: '0.5',
          min: '0',
          placeholder: 'e.g. 195',
        });

        const repsField = createField('Reps', 'reps', {
          type: 'number',
          step: '1',
          min: '0',
          placeholder: 'e.g. 6',
        });

        const rpeField = createField('RPE', 'rpe', {
          type: 'number',
          step: '0.5',
          min: '0',
          max: '10',
          placeholder: 'e.g. 8',
        });

        const notesField = createField('Notes', 'notes', {
          element: 'textarea',
          rows: 3,
          placeholder: 'Add cues, tempo changes, or how it felt',
        });

        const gridWrapper = document.createElement('div');
        gridWrapper.className = 'exercise-log__grid';
        gridWrapper.append(weightField, repsField, rpeField);

        form.append(gridWrapper, notesField);
        logSection.appendChild(form);

        logSection.addEventListener('toggle', () => {
          state.expanded[item.id] = logSection.open;
          persistState();
        });

        updateLogOutputs();
        card.appendChild(logSection);

        const actions = document.createElement('div');
        actions.className = 'exercise-card__actions';

        const checkboxLabel = document.createElement('label');
        checkboxLabel.className = 'exercise-card__checkbox';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.dataset.id = item.id;
        checkbox.checked = Boolean(state.completion[item.id]);
        checkbox.addEventListener('change', () => {
          state.completion[item.id] = checkbox.checked;
          persistState();
          renderDay(state.activeDay);
          updateWeeklyProgress();
        });

        const caption = document.createElement('span');
        caption.textContent = checkbox.checked ? 'Completed' : 'Mark complete';

        checkbox.addEventListener('change', () => {
          caption.textContent = checkbox.checked ? 'Completed' : 'Mark complete';
        });

        checkboxLabel.append(checkbox, caption);
        actions.appendChild(checkboxLabel);
        card.appendChild(actions);
        grid.appendChild(card);

        total += 1;
        if (checkbox.checked) done += 1;

        if (idx < section.items.length - 1) {
          const divider = document.createElement('div');
          divider.className = 'superset-divider';
          grid.appendChild(divider);
        }
      });

      body.appendChild(grid);
    }

    sectionEl.appendChild(body);
    dayContent.appendChild(sectionEl);
  });

  const percent = total ? Math.round((done / total) * 100) : 0;
  dayProgressFill.style.transform = `scaleX(${percent / 100})`;
  dayProgressValue.textContent = `${percent}%`;

  state.activeDay = index;
  updateSessionCount();
}

function updateSessionCount() {
  const dayCounts = program.days.map((day) =>
    day.sections.every((section) =>
      section.items.every((item) => Boolean(state.completion[item.id]))
    )
  );

  const completedDays = dayCounts.filter(Boolean).length;
  sessionCount.textContent = `${completedDays} / ${program.days.length}`;
}

function updateWeeklyProgress() {
  const weeklyCheckboxes = document.querySelectorAll('[data-tracker^="weekly"]');
  weeklyCheckboxes.forEach((checkbox) => {
    const id = checkbox.dataset.tracker;
    state.weekly[id] = checkbox.checked;
  });
  persistState();
}

document.querySelectorAll('[data-tracker^="weekly"]').forEach((checkbox) => {
  const id = checkbox.dataset.tracker;
  checkbox.checked = Boolean(state.weekly[id]);
  checkbox.addEventListener('change', updateWeeklyProgress);
});

renderDay(state.activeDay);

dayNavButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const index = Number(btn.dataset.day);
    dayNavButtons.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    renderDay(index);
  });
});
