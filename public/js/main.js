// Dark mode toggle
document.getElementById("dark-mode-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    // local veritabanına darkmode durumunu kaydediyor burası bu sayede server tarafında dark mode bilgisini tutmuyoruz
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  });
  
  // eğer dark mode sınıfı var ise sayfa tekrar yüklenince light mode başlamıyor
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }


  
  // Yeni görev ekleme
  document.getElementById("addTask").addEventListener("click", async function() {
    // veri al kullanıcıdan
    const taskText = document.getElementById("todoItem").value;
    // metin boş ise bir işlem yapmıyoruz
    if (!taskText) return;
    // veritabanına eklemek için routerdaki ekle koduna istek atıyoruz
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: taskText }) // metinide body içerisinde gönderiyoruz
    });

    const newTask = await response.json(); // cevabı alıyoruz
    addTaskToList(newTask); // Listeye ekliyoruz
    document.getElementById("todoItem").value = ''; // Görev kutusunu temizle
  });
  
  // Verileri silme onayı
  function confirmClearData() {
    const userConfirmed = confirm("Tüm verileri silmek istediğinizden emin misiniz?");
    if (userConfirmed) {
      clearAllData(); // Verileri temizleyen fonksiyon
    }
  }
  
  // Tüm verileri silme
  // yine router üzerinden istek atıyoruz ve tüm verileri silmek istiyoruz kullanıcı onayladıktan sonra
  async function clearAllData() {
    try {
      const response = await fetch('/api/tasks/clearAll', {
        method: 'POST',
      });
      const message = await response.text();
      alert(message);
      document.getElementById('taskList').innerHTML = ''; // Görev listesini temizle
    } catch (err) {
      alert("Veri temizleme işlemi başarısız");
    }
  }
  
  // Görev satırını listeye ekleme
  function addTaskToList(task) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.setAttribute('data-id', task._id); // Her göreve ID atıyoruz
  
    li.innerHTML = `
      <div class="col-dot">
        <div class="task-dot" style="background-color: ${task.status === 'done' ? 'green' : 'red'}"></div>
      </div>
      <div class="col-task">${task.task}</div>
      <div class="col-date">${new Date(task.createdAt).toLocaleDateString()}</div>
      <div class="col-status">${task.status === 'done' ? 'Yapıldı' : 'Yapılmadı'}</div>
      <div class="col-actions">
        <input type="checkbox" ${task.status === 'done' ? 'checked' : ''} onclick="toggleDone('${task._id}')">
        <button onclick="deleteTask('${task._id}')">Sil</button>
        <button onclick="editTask('${task._id}')">Güncelle</button>
      </div>
    `;
    taskList.appendChild(li); // Görevi listeye ekliyoruz
  }
  
  // Silme fonksiyonu
  async function deleteTask(id) {
    // Id'si verilen görebvi silme
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    document.querySelector(`[data-id='${id}']`).remove(); // Listeden elemanı sil
  }
  
  // Güncelleme fonksiyonu
  async function editTask(id) {
    // Kullanıcıdan yeni metni alıyoruz
    const newText = prompt("Yeni görev adını girin:");
    if (newText) {
      // belirli ID ye yazıyoruz yeni halini
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: newText })
      });
      const updatedTask = await response.json(); // Güncellenmiş görevi alıyoruz
      const li = document.querySelector(`[data-id='${id}']`);
      li.querySelector('.col-task').textContent = updatedTask.task;
    }
  }
  
  // Durum değiştirme (checkbox) fonksiyonu
  async function toggleDone(id) {
    const li = document.querySelector(`[data-id='${id}']`);
    const checkbox = li.querySelector('input[type="checkbox"]');
    const newStatus = checkbox.checked ? 'done' : 'not-done';
    
    await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });

    // yapılıp yapılmamasına bağlı olarak noktanın rengini değiştirme ve yazıyı güncelleme
    li.querySelector('.task-dot').style.backgroundColor = newStatus === 'done' ? 'green' : 'red';
    li.querySelector('.col-status').textContent = newStatus === 'done' ? 'Yapıldı' : 'Yapılmadı';
  }
  
  // Görevleri yükleme
  async function loadTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    tasks.forEach(task => addTaskToList(task));
  }
  
  loadTasks(); // Sayfa yüklendiğinde görevleri yükle
  