async function fetchTrends(country) {
  const res = await fetch(`http://localhost:8080/api/trends?country=${country}`);
  const data = await res.json();
  return data;
}

function renderTrends(country, containerSelector) {
  fetchTrends(country).then(trends => {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const ul = container.querySelector('ul');
    if (!ul) return;
    ul.innerHTML = '';
    trends.forEach(trend => {
      const li = document.createElement('li');
      li.className = 'top-trends__item';
      li.innerHTML = `<div>${trend.name}</div>`;
      ul.appendChild(li);
    });
  });
}

// Пример вызова для трёх стран:
document.addEventListener('DOMContentLoaded', () => {
  renderTrends('turkey', '.top-trends__list:nth-child(1)');
  renderTrends('azerbaijan', '.top-trends__list:nth-child(2)');
  renderTrends('lebanon', '.top-trends__list:nth-child(3)');
});