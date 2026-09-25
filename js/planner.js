// Academic Planner — interactive task manager
// Demonstrates: arrays & functions, DOM manipulation, event handling,
// dynamic content updates, and simple persistence via localStorage.

(function () {
  var STORAGE_KEY = 'academicPlannerTasks';

  /** @type {Array<{id: string, text: string, due: string, done: boolean}>} */
  var tasks = loadTasks();

  var form = document.getElementById('task-form');
  var input = document.getElementById('task-input');
  var dueInput = document.getElementById('task-due');
  var list = document.getElementById('task-list');
  var statTotal = document.getElementById('stat-total');
  var statDone = document.getElementById('stat-done');
  var statPending = document.getElementById('stat-pending');
  var clearDoneBtn = document.getElementById('clear-completed');

  if (!form || !list) return; // not on the planner page

  function loadTasks() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      // storage unavailable (private browsing, quota, etc.) — fail silently
    }
  }

  function makeId() {
    return 't' + Date.now() + Math.floor(Math.random() * 1000);
  }

  function addTask(text, due) {
    tasks.push({ id: makeId(), text: text, due: due || '', done: false });
    saveTasks();
    render();
  }

  function toggleTask(id) {
    tasks = tasks.map(function (t) {
      return t.id === id ? Object.assign({}, t, { done: !t.done }) : t;
    });
    saveTasks();
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter(function (t) { return t.id !== id; });
    saveTasks();
    render();
  }

  function clearCompleted() {
    tasks = tasks.filter(function (t) { return !t.done; });
    saveTasks();
    render();
  }

  function formatDue(due) {
    if (!due) return '';
    var d = new Date(due + 'T00:00:00');
    if (isNaN(d.getTime())) return due;
    return 'Due ' + d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function render() {
    list.innerHTML = '';

    if (tasks.length === 0) {
      var empty = document.createElement('li');
      empty.className = 'task-empty';
      empty.textContent = 'No tasks yet — add your first assignment or reading above.';
      list.appendChild(empty);
    }

    tasks.forEach(function (task) {
      var item = document.createElement('li');
      item.className = 'task-item' + (task.done ? ' completed' : '');
      item.dataset.id = task.id;

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.done;
      checkbox.setAttribute('aria-label', 'Mark "' + task.text + '" as completed');
      checkbox.addEventListener('change', function () { toggleTask(task.id); });

      var textWrap = document.createElement('span');
      textWrap.className = 'task-text';
      textWrap.textContent = task.text;

      var meta = document.createElement('span');
      meta.className = 'task-due';
      meta.textContent = formatDue(task.due);

      var delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'btn small danger';
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', function () { deleteTask(task.id); });

      item.appendChild(checkbox);
      item.appendChild(textWrap);
      if (task.due) item.appendChild(meta);
      item.appendChild(delBtn);
      list.appendChild(item);
    });

    var done = tasks.filter(function (t) { return t.done; }).length;
    statTotal.textContent = tasks.length;
    statDone.textContent = done;
    statPending.textContent = tasks.length - done;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text) {
      input.focus();
      return;
    }
    addTask(text, dueInput.value);
    input.value = '';
    dueInput.value = '';
    input.focus();
  });

  if (clearDoneBtn) {
    clearDoneBtn.addEventListener('click', clearCompleted);
  }

  render();
})();
