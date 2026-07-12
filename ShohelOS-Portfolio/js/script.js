/* ============================================================
   SHOHEL OS — APP LOGIC
   Window manager + boot sequence + content renderers + Edit Mode.
   Default content lives in js/data.js. Live edits are stored in
   the browser's localStorage and layered on top of those defaults.
   ============================================================ */

(function () {
  "use strict";

  const STORAGE_KEY = "shohelos_portfolio_state_v1";
  let S;            // current working data (defaults + saved edits)
  let editModeOn = false;
  let pendingPhotoTarget = null;

  /* ---------------------------------------------------------
     PATH HELPERS (dot-notation, supports array indices)
  --------------------------------------------------------- */
  function getPath(obj, path) {
    return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
  }
  function setPath(obj, path, value) {
    const keys = path.split(".");
    let o = obj;
    for (let i = 0; i < keys.length - 1; i++) o = o[keys[i]];
    o[keys[keys.length - 1]] = value;
  }

  /* ---------------------------------------------------------
     STATE PERSISTENCE
  --------------------------------------------------------- */
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      S = raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(PORTFOLIO_DATA));
    } catch (e) {
      S = JSON.parse(JSON.stringify(PORTFOLIO_DATA));
    }
  }
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(S));
    } catch (e) {
      alert("⚠️ ব্রাউজার স্টোরেজ ভরে গেছে। বড় ছবি বাদ দিয়ে আবার চেষ্টা করো, অথবা Export Backup নিয়ে রেখে কিছু ছবি মুছে ফেলো।");
    }
  }

  const TEMPLATES = {
    "experience.items": () => ({ role: "নতুন পদবী", org: "প্রতিষ্ঠানের নাম", period: "২০xx", description: "এখানে বিবরণ লিখো।" }),
    "experience.achievements": () => "নতুন achievement লিখো।",
    "education.items": () => ({ degree: "ডিগ্রির নাম", institute: "প্রতিষ্ঠানের নাম", period: "সাল", note: "" }),
    "projects.items": () => ({ title: "নতুন প্রজেক্ট", subtitle: "সংক্ষিপ্ত বিবরণ", description: "বিস্তারিত লিখো।", tags: ["Tag"], link: "" }),
    "pictures.items": () => ({ src: "", caption: "ক্লিক করে ছবি আপলোড করো" }),
    "files.items": () => ({ name: "New_File.pdf", description: "বিবরণ লিখো", href: "#" }),
    "contact.socials": () => ({ label: "Website", href: "https://" }),
    "about.paragraphs": () => "নতুন প্যারাগ্রাফ লিখো এখানে।",
    "skills.groups": () => ({ title: "নতুন গ্রুপ", items: ["Skill"] }),
  };

  function ownerWindowOf(path) {
    return path.split(".")[0];
  }

  /* ---------------------------------------------------------
     WINDOW CONFIG
  --------------------------------------------------------- */
  const WINDOWS = {
    about: { title: "About", icon: "about", render: renderAbout },
    files: { title: "Files", icon: "files", render: renderFiles },
    pictures: { title: "Pictures", icon: "pictures", render: renderPictures },
    experience: { title: "Experience", icon: "experience", render: renderExperience },
    projects: { title: "Projects", icon: "projects", render: renderProjects },
    contact: { title: "Contact", icon: "contact", render: renderContact },
    skills: { title: "Skills", icon: "skills", render: renderSkills },
    education: { title: "Education", icon: "education", render: renderEducation },
  };

  const openWindows = new Map(); // id -> { el, minimized }
  let zTop = 10;

  /* ---------------------------------------------------------
     BOOT SEQUENCE
  --------------------------------------------------------- */
  function runBoot() {
    const bootLines = document.getElementById("boot-lines");
    const bootFill = document.getElementById("boot-bar-fill");
    const bootScreen = document.getElementById("boot-screen");
    const desktop = document.getElementById("desktop");

    const steps = [
      "loading kernel modules",
      "mounting /home/shohel",
      "starting window manager",
      "initializing profile: " + S.identity.name,
      "ready",
    ];

    steps.forEach((s, i) => {
      const line = document.createElement("div");
      line.className = "line";
      line.style.animationDelay = (0.15 + i * 0.22) + "s";
      line.innerHTML = `<span class="ok">[ OK ]</span>${s}`;
      bootLines.appendChild(line);
    });

    requestAnimationFrame(() => { bootFill.style.width = "100%"; });

    const totalDelay = 0.15 + steps.length * 220 + 500;
    setTimeout(() => {
      bootScreen.classList.add("hidden");
      desktop.classList.add("ready");
      setTimeout(() => bootScreen.remove(), 700);
    }, totalDelay);
  }

  /* ---------------------------------------------------------
     WALLPAPER
  --------------------------------------------------------- */
  function setWallpaper() {
    if (S.wallpaper && S.wallpaper.trim() !== "") {
      const layer = document.getElementById("wallpaper-layer");
      layer.style.backgroundImage = `url("${S.wallpaper}")`;
      layer.classList.add("has-image");
    }
  }

  /* ---------------------------------------------------------
     CLOCK
  --------------------------------------------------------- */
  function tickClock() {
    const now = new Date();
    const timeEl = document.getElementById("clock-time");
    const dateEl = document.getElementById("clock-date");
    const opts = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Dhaka" };
    const dOpts = { weekday: "short", day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Dhaka" };
    timeEl.textContent = new Intl.DateTimeFormat("en-GB", opts).format(now);
    dateEl.textContent = new Intl.DateTimeFormat("en-GB", dOpts).format(now);
  }

  /* ---------------------------------------------------------
     NAME PLATE
  --------------------------------------------------------- */
  function renderNamePlate() {
    document.getElementById("name-plate-name").innerHTML =
      `<span data-editable="identity.name">${S.identity.name}</span>`;
    document.getElementById("name-plate-role").innerHTML =
      `<span data-editable="identity.role">${S.identity.role}</span>`;
    document.getElementById("name-plate-loc").innerHTML =
      `<span data-editable="identity.location">${S.identity.location}</span>`;
    applyEditableAttrs(document.getElementById("name-plate"));
  }

  /* ---------------------------------------------------------
     WINDOW MANAGER
  --------------------------------------------------------- */
  function openWindow(id, pos) {
    const config = WINDOWS[id];
    if (!config) return;

    if (openWindows.has(id)) {
      const win = openWindows.get(id);
      win.minimized = false;
      win.el.classList.remove("minimized");
      focusWindow(id);
      updateTaskbar();
      return;
    }

    const el = document.createElement("div");
    el.className = "os-window";
    el.dataset.win = id;

    const offsetIndex = openWindows.size;
    const baseLeft = pos ? pos.left : 90 + (offsetIndex % 5) * 30;
    const baseTop = pos ? pos.top : 60 + (offsetIndex % 5) * 26;
    el.style.left = baseLeft + "px";
    el.style.top = baseTop + "px";

    el.innerHTML = `
      <div class="window-titlebar">
        <div class="window-dots">
          <button class="window-dot close" data-action="close" aria-label="Close">${ICONS.close}</button>
          <button class="window-dot minimize" data-action="minimize" aria-label="Minimize">${ICONS.minimize}</button>
        </div>
        <div class="window-title">
          <span class="icon-glyph">${ICONS[config.icon]}</span>
          <span>${config.title}</span>
        </div>
      </div>
      <div class="window-body">${config.render()}</div>
    `;

    document.getElementById("window-layer").appendChild(el);
    openWindows.set(id, { el, minimized: false });

    el.querySelector('[data-action="close"]').addEventListener("click", (e) => {
      e.stopPropagation();
      closeWindow(id);
    });
    el.querySelector('[data-action="minimize"]').addEventListener("click", (e) => {
      e.stopPropagation();
      minimizeWindow(id);
    });
    el.addEventListener("mousedown", () => focusWindow(id));
    el.addEventListener("touchstart", () => focusWindow(id), { passive: true });

    makeDraggable(el, el.querySelector(".window-titlebar"));
    applyEditableAttrs(el);

    requestAnimationFrame(() => el.classList.add("open"));
    focusWindow(id);
    updateTaskbar();
  }

  function closeWindow(id) {
    const win = openWindows.get(id);
    if (!win) return;
    win.el.classList.add("closing");
    win.el.classList.remove("open");
    setTimeout(() => {
      win.el.remove();
      openWindows.delete(id);
      updateTaskbar();
    }, 200);
  }

  function minimizeWindow(id) {
    const win = openWindows.get(id);
    if (!win) return;
    win.minimized = true;
    win.el.classList.add("minimized");
    updateTaskbar();
  }

  function focusWindow(id) {
    const win = openWindows.get(id);
    if (!win) return;
    zTop += 1;
    win.el.style.zIndex = zTop;
    openWindows.forEach((w, k) => w.el.classList.toggle("focused", k === id));
    updateTaskbar(id);
  }

  function refreshWindow(id) {
    const win = openWindows.get(id);
    if (!win) return; // not open, nothing to refresh on screen
    const body = win.el.querySelector(".window-body");
    body.innerHTML = WINDOWS[id].render();
    applyEditableAttrs(body);
  }

  function updateTaskbar(activeId) {
    const container = document.getElementById("taskbar-running");
    container.innerHTML = "";
    openWindows.forEach((win, id) => {
      const btn = document.createElement("button");
      btn.className = "taskbar-app" + (activeId === id ? " active" : "");
      btn.innerHTML = `<span class="icon-glyph">${ICONS[WINDOWS[id].icon]}</span><span>${WINDOWS[id].title}</span>`;
      btn.addEventListener("click", () => openWindow(id));
      container.appendChild(btn);
    });
  }

  function makeDraggable(win, handle) {
    let sx = 0, sy = 0, ox = 0, oy = 0, dragging = false;

    function start(x, y) {
      dragging = true;
      sx = x; sy = y;
      const rect = win.getBoundingClientRect();
      ox = rect.left; oy = rect.top;
      win.style.transition = "none";
    }
    function move(x, y) {
      if (!dragging) return;
      const dx = x - sx, dy = y - sy;
      const maxLeft = window.innerWidth - 60;
      const maxTop = window.innerHeight - 60;
      let nl = Math.min(Math.max(ox + dx, -win.offsetWidth + 120), maxLeft);
      let nt = Math.min(Math.max(oy + dy, 0), maxTop);
      win.style.left = nl + "px";
      win.style.top = nt + "px";
    }
    function end() {
      dragging = false;
      win.style.transition = "";
    }

    handle.addEventListener("mousedown", (e) => {
      if (e.target.closest("[data-action]")) return;
      start(e.clientX, e.clientY); e.preventDefault();
    });
    window.addEventListener("mousemove", (e) => move(e.clientX, e.clientY));
    window.addEventListener("mouseup", end);

    handle.addEventListener("touchstart", (e) => {
      if (e.target.closest("[data-action]")) return;
      const t = e.touches[0]; start(t.clientX, t.clientY);
    }, { passive: true });
    window.addEventListener("touchmove", (e) => {
      const t = e.touches[0]; move(t.clientX, t.clientY);
    }, { passive: true });
    window.addEventListener("touchend", end);
  }

  /* ---------------------------------------------------------
     EDIT MODE — attribute painting
  --------------------------------------------------------- */
  function applyEditableAttrs(container) {
    container.querySelectorAll("[data-editable]").forEach((el) => {
      el.contentEditable = editModeOn ? "true" : "false";
      el.spellcheck = false;
    });
  }

  function setEditMode(on) {
    editModeOn = on;
    document.body.classList.toggle("edit-mode", on);
    document.getElementById("edit-toggle-btn").classList.toggle("active", on);
    document.querySelectorAll("[data-editable]").forEach((el) => {
      el.contentEditable = on ? "true" : "false";
      el.spellcheck = false;
    });
  }

  function photoBox(targetPath, src, size, label) {
    const inner = src
      ? `<img src="${src}" alt="">`
      : `<span>${label || "photo"}</span>`;
    const sizeStyle = size ? ` style="width:${size}px;height:${size}px;"` : "";
    return `<div class="photo-upload-target pic-cell" data-action="upload-photo" data-target="${targetPath}"${sizeStyle}>
      ${inner}
      <div class="photo-upload-overlay">${ICONS.camera}</div>
    </div>`;
  }

  /* ---------------------------------------------------------
     CONTENT RENDERERS
  --------------------------------------------------------- */
  function renderAbout() {
    const a = S.about, id = S.identity;
    return `
      <h2 class="win-heading"><span class="eyebrow">~/about</span><span data-editable="about.heading">${a.heading}</span></h2>
      <div class="profile-photo-wrap">${photoBox("identity.photo", id.photo, 84, id.avatarInitial)}</div>
      ${a.paragraphs.map((p, i) => `
        <p class="win-para repeat-item" data-editable="about.paragraphs.${i}">${p}
          <button class="edit-del-btn" data-action="delete-item" data-array="about.paragraphs" data-index="${i}">${ICONS.trash}</button>
        </p>`).join("")}
      <div class="edit-item-controls">
        <button class="edit-add-btn" data-action="add-item" data-section="about.paragraphs">${ICONS.plus} Add paragraph</button>
      </div>
      <div class="highlight-grid">
        ${a.highlights.map((h, i) => `
          <div class="highlight-card">
            <div class="h-label" data-editable="about.highlights.${i}.label">${h.label}</div>
            <div class="h-value" data-editable="about.highlights.${i}.value">${h.value}</div>
          </div>`).join("")}
      </div>
    `;
  }

  function renderSkills() {
    const s = S.skills;
    return `
      <h2 class="win-heading"><span class="eyebrow">~/skills</span><span data-editable="skills.heading">${s.heading}</span></h2>
      ${s.groups.map((g, gi) => `
        <div class="skill-group repeat-item">
          <h4 data-editable="skills.groups.${gi}.title">${g.title}</h4>
          <div class="chip-row">
            ${g.items.map((item, ii) => `<span class="chip" data-editable="skills.groups.${gi}.items.${ii}">${item}</span>`).join("")}
          </div>
          <div class="edit-item-controls">
            <button class="edit-add-btn" data-action="add-item" data-section="skills.groups.${gi}.items">${ICONS.plus} Add skill</button>
          </div>
          <button class="edit-del-btn" data-action="delete-item" data-array="skills.groups" data-index="${gi}">${ICONS.trash}</button>
        </div>`).join("")}
      <div class="edit-item-controls">
        <button class="edit-add-btn" data-action="add-item" data-section="skills.groups">${ICONS.plus} Add group</button>
      </div>
    `;
  }

  function renderExperience() {
    const e = S.experience;
    return `
      <h2 class="win-heading"><span class="eyebrow">~/experience</span><span data-editable="experience.heading">${e.heading}</span></h2>
      ${e.items.map((item, i) => `
        <div class="timeline-item repeat-item">
          <div class="timeline-role" data-editable="experience.items.${i}.role">${item.role}</div>
          <div class="timeline-meta"><span data-editable="experience.items.${i}.org">${item.org}</span><span class="dot">•</span><span data-editable="experience.items.${i}.period">${item.period}</span></div>
          <div class="timeline-desc" data-editable="experience.items.${i}.description">${item.description}</div>
          <button class="edit-del-btn" data-action="delete-item" data-array="experience.items" data-index="${i}">${ICONS.trash}</button>
        </div>`).join("")}
      <div class="edit-item-controls">
        <button class="edit-add-btn" data-action="add-item" data-section="experience.items">${ICONS.plus} Add role</button>
      </div>
      ${(e.achievements && e.achievements.length) ? `
        <div class="skill-group" style="margin-top:24px;">
          <h4>Key Achievements</h4>
          ${e.achievements.map((a, i) => `
            <div class="timeline-item repeat-item" style="padding-left:0;border-left:none;margin-left:0;">
              <div class="timeline-desc" data-editable="experience.achievements.${i}">${a}
                <button class="edit-del-btn" data-action="delete-item" data-array="experience.achievements" data-index="${i}">${ICONS.trash}</button>
              </div>
            </div>`).join("")}
          <div class="edit-item-controls">
            <button class="edit-add-btn" data-action="add-item" data-section="experience.achievements">${ICONS.plus} Add achievement</button>
          </div>
        </div>` : ""}
    `;
  }

  function renderEducation() {
    const e = S.education;
    return `
      <h2 class="win-heading"><span class="eyebrow">~/education</span><span data-editable="education.heading">${e.heading}</span></h2>
      ${e.items.map((item, i) => `
        <div class="timeline-item repeat-item">
          <div class="timeline-role" data-editable="education.items.${i}.degree">${item.degree}</div>
          <div class="timeline-meta"><span data-editable="education.items.${i}.institute">${item.institute}</span><span class="dot">•</span><span data-editable="education.items.${i}.period">${item.period}</span></div>
          ${item.note ? `<div class="timeline-desc" data-editable="education.items.${i}.note">${item.note}</div>` : `<div class="timeline-desc" data-editable="education.items.${i}.note"></div>`}
          <button class="edit-del-btn" data-action="delete-item" data-array="education.items" data-index="${i}">${ICONS.trash}</button>
        </div>`).join("")}
      <div class="edit-item-controls">
        <button class="edit-add-btn" data-action="add-item" data-section="education.items">${ICONS.plus} Add qualification</button>
      </div>
    `;
  }

  function renderProjects() {
    const p = S.projects;
    return `
      <h2 class="win-heading"><span class="eyebrow">~/projects</span><span data-editable="projects.heading">${p.heading}</span></h2>
      ${p.items.map((item, i) => `
        <div class="project-card repeat-item">
          <div class="project-top">
            <div class="project-title" data-editable="projects.items.${i}.title">${item.title}</div>
            ${item.link ? `<a class="project-link" href="${item.link}" target="_blank" rel="noopener">${ICONS.external}</a>` : ""}
          </div>
          <div class="project-subtitle" data-editable="projects.items.${i}.subtitle">${item.subtitle}</div>
          <div class="project-desc" data-editable="projects.items.${i}.description">${item.description}</div>
          <div class="tag-row">${item.tags.map((t, ti) => `<span class="tag" data-editable="projects.items.${i}.tags.${ti}">${t}</span>`).join("")}</div>
          <button class="edit-del-btn" data-action="delete-item" data-array="projects.items" data-index="${i}">${ICONS.trash}</button>
        </div>`).join("")}
      <div class="edit-item-controls">
        <button class="edit-add-btn" data-action="add-item" data-section="projects.items">${ICONS.plus} Add project</button>
      </div>
    `;
  }

  function renderPictures() {
    const p = S.pictures;
    return `
      <h2 class="win-heading"><span class="eyebrow">~/pictures</span><span data-editable="pictures.heading">${p.heading}</span></h2>
      <div class="pic-grid">
        ${p.items.map((item, i) => `
          <div class="repeat-item">
            ${photoBox("pictures.items." + i + ".src", item.src, null, item.caption)}
            <button class="edit-del-btn" data-action="delete-item" data-array="pictures.items" data-index="${i}">${ICONS.trash}</button>
          </div>`).join("")}
      </div>
      <div class="edit-item-controls">
        <button class="edit-add-btn" data-action="add-item" data-section="pictures.items">${ICONS.plus} Add picture</button>
      </div>
    `;
  }

  function renderFiles() {
    const f = S.files;
    return `
      <h2 class="win-heading"><span class="eyebrow">~/files</span><span data-editable="files.heading">${f.heading}</span></h2>
      ${f.items.map((item, i) => `
        <div class="file-row repeat-item">
          <span class="icon-glyph">${ICONS.files}</span>
          <div class="file-info">
            <div class="file-name" data-editable="files.items.${i}.name">${item.name}</div>
            <div class="file-desc" data-editable="files.items.${i}.description">${item.description}</div>
          </div>
          <a class="file-dl" href="${item.href}" download target="_blank" rel="noopener">${ICONS.download}</a>
          <button class="edit-del-btn" data-action="delete-item" data-array="files.items" data-index="${i}">${ICONS.trash}</button>
        </div>`).join("")}
      <div class="edit-item-controls">
        <button class="edit-add-btn" data-action="add-item" data-section="files.items">${ICONS.plus} Add file</button>
      </div>
    `;
  }

  function renderContact() {
    const c = S.contact;
    return `
      <h2 class="win-heading"><span class="eyebrow">~/contact</span><span data-editable="contact.heading">${c.heading}</span></h2>
      <div class="contact-row">
        <div class="contact-label">Email</div>
        <div class="contact-value" data-editable="contact.email">${c.email}</div>
      </div>
      <div class="contact-row">
        <div class="contact-label">Phone</div>
        <div class="contact-value" data-editable="contact.phone">${c.phone}</div>
      </div>
      <div class="contact-row">
        <div class="contact-label">Location</div>
        <div class="contact-value" data-editable="contact.location">${c.location}</div>
      </div>
      <div class="social-row">
        ${c.socials.map((s, i) => `
          <span class="social-btn repeat-item" style="position:relative;padding-right:26px;">
            <span data-editable="contact.socials.${i}.label">${s.label}</span>
            <button class="edit-del-btn" style="width:18px;height:18px;top:4px;right:4px;" data-action="delete-item" data-array="contact.socials" data-index="${i}">${ICONS.trash}</button>
          </span>`).join("")}
      </div>
      <div class="edit-item-controls">
        <button class="edit-add-btn" data-action="add-item" data-section="contact.socials">${ICONS.plus} Add link</button>
      </div>
    `;
  }

  /* ---------------------------------------------------------
     IMAGE RESIZE HELPER (keeps localStorage usage small)
  --------------------------------------------------------- */
  function resizeImageToDataURL(file, maxW, maxH, quality) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          const ratio = Math.min(1, maxW / width, maxH / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
          const canvas = document.createElement("canvas");
          canvas.width = width; canvas.height = height;
          canvas.getContext("2d").drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.onerror = reject;
        img.src = ev.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /* ---------------------------------------------------------
     GLOBAL EVENT DELEGATION (edit mode actions)
  --------------------------------------------------------- */
  function bindGlobalEditEvents() {
    document.addEventListener("focusout", (e) => {
      const el = e.target.closest && e.target.closest("[data-editable]");
      if (!el || !editModeOn) return;
      setPath(S, el.dataset.editable, el.textContent.trim());
      saveState();
    });

    document.addEventListener("click", (e) => {
      if (!editModeOn) return;

      const addBtn = e.target.closest('[data-action="add-item"]');
      if (addBtn) {
        const section = addBtn.dataset.section;
        const factory = TEMPLATES[section];
        const arr = getPath(S, section);
        if (Array.isArray(arr)) {
          arr.push(factory ? factory() : (typeof arr[0] === "string" ? "নতুন লেখা" : {}));
          saveState();
          refreshWindow(ownerWindowOf(section));
        }
        return;
      }

      const delBtn = e.target.closest('[data-action="delete-item"]');
      if (delBtn) {
        const arrPath = delBtn.dataset.array;
        const idx = parseInt(delBtn.dataset.index, 10);
        const arr = getPath(S, arrPath);
        if (Array.isArray(arr)) {
          arr.splice(idx, 1);
          saveState();
          refreshWindow(ownerWindowOf(arrPath));
        }
        return;
      }

      const photoTarget = e.target.closest('[data-action="upload-photo"]');
      if (photoTarget) {
        pendingPhotoTarget = photoTarget.dataset.target;
        document.getElementById("edit-photo-input").click();
        return;
      }
    });

    document.getElementById("edit-photo-input").addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file || !pendingPhotoTarget) return;
      try {
        const dataUrl = await resizeImageToDataURL(file, 900, 900, 0.85);
        setPath(S, pendingPhotoTarget, dataUrl);
        saveState();
        refreshWindow(ownerWindowOf(pendingPhotoTarget));
      } catch (err) {
        alert("⚠️ ছবি লোড করা যায়নি, আবার চেষ্টা করো।");
      }
      e.target.value = "";
      pendingPhotoTarget = null;
    });

    document.getElementById("edit-toggle-btn").addEventListener("click", () => {
      setEditMode(!editModeOn);
    });

    document.getElementById("edit-export").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(S, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "shohelos-portfolio-backup.json";
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    });

    document.getElementById("edit-import").addEventListener("click", () => {
      document.getElementById("edit-import-input").click();
    });

    document.getElementById("edit-import-input").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          S = JSON.parse(ev.target.result);
          saveState();
          location.reload();
        } catch (err) {
          alert("⚠️ এই ফাইলটা ঠিক backup ফরম্যাটে নেই।");
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    });

    document.getElementById("edit-reset").addEventListener("click", () => {
      if (!confirm("সব এডিট মুছে ডিফল্ট তথ্যে ফিরে যাবে। নিশ্চিত?")) return;
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    });
  }

  /* ---------------------------------------------------------
     INIT
  --------------------------------------------------------- */
  function init() {
    loadState();

    document.querySelectorAll(".icon-glyph[data-icon]").forEach((el) => {
      el.innerHTML = ICONS[el.dataset.icon] || "";
    });
    document.getElementById("start-avatar").textContent = S.identity.avatarInitial;
    document.getElementById("start-name").textContent = S.identity.osName;
    document.getElementById("boot-logo-text").textContent = S.identity.osName;

    renderNamePlate();
    setWallpaper();
    runBoot();
    bindGlobalEditEvents();

    tickClock();
    setInterval(tickClock, 15000);

    document.querySelectorAll(".desktop-icon").forEach((btn) => {
      btn.addEventListener("click", () => openWindow(btn.dataset.window));
    });

    document.getElementById("start-btn").addEventListener("click", () => {
      openWindow("about");
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
