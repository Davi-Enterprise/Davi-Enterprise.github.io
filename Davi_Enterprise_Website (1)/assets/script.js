// Active nav link + year in footer
(function () {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Render Whatnot schedule (optional)
(async function () {
  const mount = document.getElementById("whatnotSchedule");
  if (!mount) return;

  try {
    const res = await fetch("assets/whatnot-schedule.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Could not load schedule");
    const data = await res.json();

    const items = Array.isArray(data.items) ? data.items : [];
    if (!items.length) {
      mount.innerHTML = '<p class="note">No live shows listed yet. Check back soon.</p>';
      return;
    }

    const rows = items.map(i => {
      const title = (i.title || "Live show").toString();
      const date = (i.date || "TBD").toString();
      const time = (i.time_central || "TBD").toString();
      const link = (i.link || "https://www.whatnot.com/user/davi_enterprise").toString();
      return `
        <div class="item">
          <div>
            <span class="tag">Live</span>
            <h2 style="margin-top:10px">${title}</h2>
            <p><b>Date:</b> ${date} • <b>Time (CT):</b> ${time}</p>
            <a class="btn small" href="${link}" target="_blank" rel="noopener">Open on Whatnot</a>
          </div>
        </div>
      `;
    }).join("");

    mount.innerHTML = `<div class="list">${rows}</div>
      <p class="note">Edit <b>assets/whatnot-schedule.json</b> to update the schedule.</p>`;
  } catch (e) {
    mount.innerHTML = '<p class="note">Schedule temporarily unavailable. Use the Shop button for Whatnot.</p>';
  }
})();
