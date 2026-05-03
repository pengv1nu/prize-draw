const STORAGE_KEYS = {
    PARTICIPANTS: 'prizeDraw_participants',
    PRIZES: 'prizeDraw_prizes',
    HISTORY: 'prizeDraw_history'
};

function getData(key) {
    const data = localStorage.getItem(STORAGE_KEYS[key]);
    return data ? JSON.parse(data) : [];
}

function saveData(key, data) {
    localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data));
}

function clearAllData() {
    if (confirm('Удалить ВСЕ данные?')) {
        localStorage.clear();
        location.reload();
    }
}