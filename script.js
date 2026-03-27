console.log("🚦 LiveJunction JS ACTIVE");

function updateDashboard(data) {
  console.log("📊 LIVE DATA:", data);
  
  // Update numbers (THIS FIXES -- -- --)
  document.getElementById('traffic').textContent = data.traffic;
  document.getElementById('time').textContent = data.green_time + 's';
  document.getElementById('lane').textContent = data.lane;
  
  // Signal lights (add classes)
  const redLight = document.getElementById('red-light');
  const greenLight = document.getElementById('green-light');
  redLight.classList.toggle('active', data.signal === 'RED');
  greenLight.classList.toggle('active', data.signal === 'GREEN');
  
  // Emergency alert
  const alertEl = document.getElementById('emergency');
  if (data.lane === 'EMERGENCY') {
    alertEl.textContent = '🚨 EMERGENCY MODE ACTIVATED';
    alertEl.style.display = 'block';
  } else {
    alertEl.style.display = 'none';
  }
}

// Fetch every 2 seconds
setInterval(() => {
  fetch('/status')
    .then(response => response.json())
    .then(updateDashboard)
    .catch(error => console.error('Fetch error:', error));
}, 2000);

// Initial load
fetch('/status').then(response => response.json()).then(updateDashboard);
fetch("http://127.0.0.1:5000/signal", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        lane_a: 20,
        lane_b: 60,
        lane_c: 15
    })
})
.then(res => res.json())
.then(data => {
    document.getElementById("lane").innerText = data.priority_lane;
    document.getElementById("time").innerText = data.green_time;
});


