let participants = [];

function initParticipants() {
    participants = getData('PARTICIPANTS');
    renderParticipants();
    
    document.getElementById('add-participant-btn').addEventListener('click', showAddParticipantForm);
    document.getElementById('search').addEventListener('input', filterParticipants);
}

function renderParticipants(filteredParticipants = participants) {
    const tbody = document.querySelector('#participants-table tbody');
    tbody.innerHTML = '';

    filteredParticipants.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.fullName}</td>
            <td>${p.email}</td>
            <td>${p.phone || '-'}</td>
            <td>${p.group || '-'}</td>
            <td class="actions">
                <button onclick="editParticipant('${p.id}')">✏️</button>
                <button onclick="deleteParticipant('${p.id}')">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function showAddParticipantForm() {
    const name = prompt('ФИО участника:');
    if (!name) return;
    
    const email = prompt('Email:');
    const phone = prompt('Телефон (необязательно):');
    const group = prompt('Группа (например: Студенты, Преподаватели):') || 'Общая';

    const participant = {
        id: generateId(),
        fullName: name.trim(),
        email: email ? email.trim() : '',
        phone: phone ? phone.trim() : '',
        group: group,
        registrationDate: new Date().toISOString()
    };

    participants.push(participant);
    saveData('PARTICIPANTS', participants);
    renderParticipants();
    showNotification('Участник добавлен!', 'success');
}

function deleteParticipant(id) {
    if (!confirm('Удалить участника?')) return;
    
    participants = participants.filter(p => p.id !== id);
    saveData('PARTICIPANTS', participants);
    renderParticipants();
}

function editParticipant(id) {
    const participant = participants.find(p => p.id === id);
    if (!participant) return;
    
    const newName = prompt('Новое ФИО:', participant.fullName);
    if (newName === null) return;
    
    participant.fullName = newName.trim();
    saveData('PARTICIPANTS', participants);
    renderParticipants();
}

function filterParticipants() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filtered = participants.filter(p => 
        p.fullName.toLowerCase().includes(searchTerm)
    );
    renderParticipants(filtered);
}