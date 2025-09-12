async function fetchWebsites() {
    const res = await fetch('/websites');
    const data = await res.json();
    const table = document.getElementById('websiteTable');
    table.innerHTML = '';
    data.forEach(site => {
      table.innerHTML += `
        <tr>
          <td>${site.id}</td>
          <td>${site.name}</td>
          <td>${site.url}</td>
          <td class="${site.active ? 'active' : 'inactive'}">${site.active ? 'Hoạt động' : 'Không hoạt động'}</td>
          <td>
            <button onclick="deleteWebsite(${site.id})">Xóa</button>
          </td>
        </tr>
      `;
    });
  }

  async function addWebsite() {
    const name = document.getElementById('name').value;
    const url = document.getElementById('url').value;
    if (!name || !url) return alert('Vui lòng nhập đủ thông tin');
    await fetch('/websites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, url })
    });
    document.getElementById('name').value = '';
    document.getElementById('url').value = '';
    fetchWebsites();
  }

  async function updateWebsite(id, name, url) {
    const body = {};
    if (name !== null) body.name = name;
    if (url !== null) body.url = url;
    await fetch('/websites/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    fetchWebsites();
  }

  async function deleteWebsite(id) {
    if (!confirm('Bạn có chắc muốn xóa website này?')) return;
    await fetch('/websites/' + id, { method: 'DELETE' });
    fetchWebsites();
  }

  fetchWebsites();