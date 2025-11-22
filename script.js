const maidsList = document.getElementById('maids-list');
let maids = JSON.parse(localStorage.getItem('maids')) || [];

function saveData() {
  localStorage.setItem('maids', JSON.stringify(maids));
}

function renderMaids() {
  maidsList.innerHTML = '';
  maids.forEach((maid, index) => {
    const section = document.createElement('div');
    section.className = 'maid-section';
    section.innerHTML = `
      <div class="maid-header">
        <h2>${maid.name}</h2>
        <button class="delete-btn" onclick="deleteMaid(${index})">Delete</button>
      </div>
      <div class="calendar" id="calendar-${index}"></div>
    `;
    maidsList.appendChild(section);
    renderCalendar(index);
  });
}

function renderCalendar(maidIndex) {
  const calendar = document.getElementById(calendar-${maidIndex});
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Headers
  const headers = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  headers.forEach(day => {
    const div = document.createElement('div');
    div.className = 'day-header';
    div.textContent = day;
    calendar.appendChild(div);
  });

  // Empty slots before month starts
  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement('div'));
  }

  // Days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = \( {year}- \){String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')};
    const status = maids[maidIndex].attendance[dateKey] || '';

    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    if (day === today.getDate()) dayDiv.classList.add('today');

    dayDiv.innerHTML = `
      <div class="day-number">${day}</div>
      <div>
        <button class="status-btn present" onclick="setAttendance(\( {maidIndex}, ' \){dateKey}', 'present')">Present</button>
        <button class="status-btn absent" onclick="setAttendance(\( {maidIndex}, ' \){dateKey}', 'absent')">Absent</button>
      </div>
      <div style="font-size:1.5rem;margin-top:0.5rem;">${status}</div>
    `;
    calendar.appendChild(dayDiv);
  }
}

function setAttendance(maidIndex, date, status) {
  if (!maids[maidIndex].attendance) maids[maidIndex].attendance = {};
  maids[maidIndex].attendance[date] = status === 'present' ? 'Present' : 'Absent';
  saveData();
  renderMaids();
}

function addMaid() {
  const name = prompt("Enter maid's name:");
  if (name && name.trim()) {
    maids.push({ name: name.trim(), attendance: {} });
    saveData();
    renderMaids();
  }
}

function deleteMaid(index) {
  if (confirm(Delete ${maids[index].name}'s record?)) {
    maids.splice(index, 1);
    saveData();
    renderMaids();
  }
}

// First load
renderMaids();