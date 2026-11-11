(function () {
  "use strict";

  var data = window.PORTFOLIO;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function setAll(selector, value) {
    document.querySelectorAll(selector).forEach(function (node) { node.textContent = value; });
  }

  function pad(n) { return String(n).padStart(2, "0"); }

  /* ---------- Render content ---------- */

  document.title = data.name + " | " + data.title;
  setAll("[data-name]", data.name);
  setAll("[data-title]", data.title);
  setAll("[data-intro]", data.intro);
  setAll("[data-location]", data.location);
  $("year").textContent = new Date().getFullYear();

  var heroName = $("hero-name");
  heroName.setAttribute("aria-label", data.name);
  data.name.split(/\s+/).forEach(function (word, i) {
    var wrap = el("span", "word");
    wrap.setAttribute("aria-hidden", "true");
    var inner = el("span", "", word);
    inner.style.setProperty("--i", i);
    wrap.appendChild(inner);
    heroName.appendChild(wrap);
  });

  var latest = (data.education || [])[0];
  var facts = [
    ["Currently at", data.current && data.current.organisation],
    ["Studying", latest && latest.degree, latest && latest.campus],
    ["Lives in", data.location]
  ];
  facts.forEach(function (fact) {
    if (!fact[1]) return;
    var box = el("div");
    box.appendChild(el("dt", "", fact[0]));
    var dd = el("dd", "", fact[1]);
    if (fact[2]) dd.appendChild(el("span", "hero-fact-note", fact[2]));
    box.appendChild(dd);
    $("hero-facts").appendChild(box);
  });

  if (data.current) {
    var now = $("now-body");
    var role = el("p", "now-role reveal", data.current.role + " at ");
    role.appendChild(el("em", "", data.current.organisation));
    now.appendChild(role);
    if (data.current.since) now.appendChild(el("span", "now-since reveal", "Since " + data.current.since));
    if (data.current.summary) now.appendChild(el("p", "now-summary reveal", data.current.summary));
  } else {
    $("now").remove();
  }

  (data.education || []).forEach(function (item) {
    var li = el("li", "edu reveal");
    if (item.period) li.appendChild(el("span", "edu-period", item.period));
    li.appendChild(el("h3", "", item.degree));
    if (item.school) li.appendChild(el("p", "edu-school", item.school));
    if (item.details) li.appendChild(el("p", "edu-details", item.details));
    $("timeline").appendChild(li);
  });
  if (!(data.education || []).length) $("education").remove();

  (data.experience || []).forEach(function (job) {
    var li = el("li", "edu reveal");
    if (job.period) li.appendChild(el("span", "edu-period", job.period));
    li.appendChild(el("h3", "", job.role));
    if (job.organisation) li.appendChild(el("p", "edu-school", job.organisation));
    if (job.summary) li.appendChild(el("p", "edu-details", job.summary));
    $("work-timeline").appendChild(li);
  });
  if (!(data.experience || []).length) $("experience").remove();

  function renderCert(cert, list) {
    var li = el("li", "cert reveal");
    li.appendChild(el("span", "cert-date", cert.date || ""));
    var text = el("div");
    text.appendChild(el("h3", "", cert.title));
    if (cert.issuer) text.appendChild(el("p", "cert-issuer", cert.issuer));
    if (cert.link) {
      var verify = el("a", "cert-link", "Verify certificate ↗");
      verify.href = cert.link;
      verify.target = "_blank";
      verify.rel = "noopener";
      verify.setAttribute("aria-label", "Verify " + cert.title + " certificate (opens in new tab)");
      text.appendChild(verify);
    }
    li.appendChild(text);
    if (cert.type) li.appendChild(el("span", "tag cert-type", cert.type));
    list.appendChild(li);
  }

  var certGroups = (data.certifications || []).filter(function (group) {
    return group.items && group.items.length;
  });
  certGroups.forEach(function (group) {
    var block = el("div", "cert-group");
    block.appendChild(el("h3", "group-heading reveal", group.group));
    var list = el("ul", "certs");
    group.items.forEach(function (cert) { renderCert(cert, list); });
    block.appendChild(list);

    // Long groups start collapsed, with a button to show the rest.
    var limit = data.certificatesShown || 5;
    var extra = Array.prototype.slice.call(list.children, limit);
    if (extra.length) {
      extra.forEach(function (li) { li.classList.add("cert-extra"); });
      list.id = "certs-" + pad($("cert-groups").children.length + 1);
      var toggle = el("button", "btn-ghost cert-toggle");
      toggle.type = "button";
      toggle.setAttribute("aria-controls", list.id);
      var setLabel = function (open) {
        toggle.textContent = open ? "Show fewer" : "Show all " + group.items.length;
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      };
      setLabel(false);
      toggle.addEventListener("click", function () {
        var open = !block.classList.contains("open");
        block.classList.toggle("open", open);
        setLabel(open);
        if (open) {
          extra[0].querySelector("h3").setAttribute("tabindex", "-1");
          extra[0].querySelector("h3").focus({ preventScroll: true });
        } else {
          block.scrollIntoView({ block: "nearest" });
        }
      });
      block.appendChild(toggle);
    }

    $("cert-groups").appendChild(block);
  });
  if (!certGroups.length) $("certifications").remove();

  (data.projects || []).forEach(function (project, i) {
    var li = el("li", "project reveal");
    var inner = el(project.link ? "a" : "div", "project-inner");
    if (project.link) {
      inner.href = project.link;
      inner.target = "_blank";
      inner.rel = "noopener";
    }
    inner.appendChild(el("span", "project-num", pad(i + 1)));
    var text = el("div");
    text.appendChild(el("h3", "", project.title));
    text.appendChild(el("p", "project-summary", project.summary));
    if (project.tags && project.tags.length) {
      var tags = el("div", "tags");
      project.tags.forEach(function (tag) { tags.appendChild(el("span", "tag", tag)); });
      text.appendChild(tags);
    }
    if (project.images && project.images.length) {
      var gallery = el("ul", "gallery");
      gallery.setAttribute("aria-label", project.title + " screenshots");
      project.images.forEach(function (image) {
        var item = el("li");
        var button = el("button", "gallery-thumb");
        button.type = "button";
        button.setAttribute("aria-label", "Enlarge: " + image.caption);
        var img = el("img");
        img.src = image.src;
        img.alt = image.caption;
        img.loading = "lazy";
        button.appendChild(img);
        button.addEventListener("click", function () { openLightbox(image); });
        item.appendChild(button);
        item.appendChild(el("span", "gallery-caption", image.caption));
        gallery.appendChild(item);
      });
      text.appendChild(gallery);
    }
    inner.appendChild(text);
    if (project.link) {
      var arrow = el("span", "project-arrow", "↗");
      arrow.setAttribute("aria-hidden", "true");
      inner.appendChild(arrow);
    }
    li.appendChild(inner);
    $("project-list").appendChild(li);
  });
  if (!(data.projects || []).length) $("projects").remove();

  function openLightbox(image) {
    var box = $("lightbox");
    var img = $("lightbox-img");
    img.src = image.src;
    img.alt = image.caption;
    $("lightbox-caption").textContent = image.caption;
    box.showModal();
  }

  $("lightbox").addEventListener("click", function () { $("lightbox").close(); });

  function skillItems(list) {
    var items = el("p", "skill-items");
    list.forEach(function (item) { items.appendChild(el("span", "", item)); });
    return items;
  }

  function skillBlock(heading) {
    var block = el("div", "skill-block");
    block.appendChild(el("h3", "skill-heading reveal", heading));
    $("skill-list").appendChild(block);
    return block;
  }

  var technical = data.skills || [];
  var personal = data.personalSkills || [];

  if (technical.length) {
    var techBlock = skillBlock("Technical skills");
    technical.forEach(function (group) {
      var box = el("div", "skill-group reveal");
      box.appendChild(el("h4", "", group.group));
      box.appendChild(skillItems(group.items));
      techBlock.appendChild(box);
    });
  }

  if (personal.length) {
    var personalBlock = skillBlock("Personal skills");
    var personalBox = el("div", "skill-group reveal");
    personalBox.appendChild(skillItems(personal));
    personalBlock.appendChild(personalBox);
  }

  if (!technical.length && !personal.length) $("skills").remove();

  // Section numbers stay in order when an empty section is removed.
  document.querySelectorAll(".section .index").forEach(function (node, i) { node.textContent = pad(i + 1); });

  /* ---------- Contact ---------- */

  var contact = data.contact || {};
  var mail = $("contact-mail");
  mail.textContent = contact.email;
  mail.href = "mailto:" + contact.email;

  function toast(message) {
    var box = $("toast");
    box.textContent = message;
    box.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(function () { box.classList.remove("show"); }, 2200);
  }

  function copyEmail() {
    if (!navigator.clipboard) { toast(contact.email); return; }
    navigator.clipboard.writeText(contact.email).then(
      function () { toast("Email copied"); },
      function () { toast(contact.email); }
    );
  }

  function actionButton(label, handler) {
    var button = el("button", "btn-ghost", label);
    button.type = "button";
    button.addEventListener("click", handler);
    $("contact-actions").appendChild(button);
  }

  function actionLink(label, href) {
    if (!href) return;
    var link = el("a", "btn-ghost", label);
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener";
    $("contact-actions").appendChild(link);
  }

  actionButton("Copy email", copyEmail);
  function directLink(label, href) {
    var link = el("a", "btn-ghost", label);
    link.href = href;
    $("contact-actions").appendChild(link);
  }

  if (contact.phone) directLink("+230 " + contact.phone, "tel:+230" + contact.phone.replace(/\s+/g, ""));
  if (contact.studentEmail) directLink(contact.studentEmail,"mailto:" + contact.studentEmail);
  actionLink("LinkedIn", contact.linkedin);
  actionLink("GitHub", contact.github);
  actionLink("TryHackMe", contact.tryhackme);

  /* ---------- Navigation ---------- */

  var sections = Array.prototype.slice.call(document.querySelectorAll("[data-label]"));
  var navLinks = {};
  sections.forEach(function (section) {
    var link = el("a", "", section.dataset.label);
    link.href = "#" + section.id;
    navLinks[section.id] = link;
    $("bar-links").appendChild(link);
  });

  var sectionWatcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      Object.keys(navLinks).forEach(function (id) {
        navLinks[id].classList.toggle("active", id === entry.target.id);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(function (section) { sectionWatcher.observe(section); });

  var revealWatcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      revealWatcher.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach(function (node) { revealWatcher.observe(node); });

  var hero = $("top");
  var contactSection = $("contact");
  var timelines = Array.prototype.slice.call(document.querySelectorAll(".timeline"));
  var scrollQueued = false;

  function onScroll() {
    scrollQueued = false;
    var barHeight = 60;
    var heroBottom = hero.getBoundingClientRect().bottom;
    var contactBox = contactSection.getBoundingClientRect();
    var overBlue = heroBottom > barHeight || (contactBox.top <= barHeight && contactBox.bottom > barHeight);
    $("bar").classList.toggle("solid", !overBlue);

    var marker = window.innerHeight * 0.7;
    timelines.forEach(function (timeline) {
      var rail = timeline.querySelector(".timeline-rail span");
      if (!rail) return;
      var box = timeline.getBoundingClientRect();
      var progress = box.height ? (marker - box.top) / box.height : 0;
      rail.style.setProperty("--p", Math.max(0, Math.min(1, progress)));
    });
  }

  window.addEventListener("scroll", function () {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(onScroll);
  }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- Theme ---------- */

  function toggleTheme() {
    var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("site-theme", next); } catch (e) {}
  }
  $("theme").addEventListener("click", toggleTheme);

  /* ---------- Command menu ---------- */

  var palette = $("palette");
  var input = $("palette-input");
  var list = $("palette-list");
  var selected = 0;
  var visible = [];

  function goTo(id) {
    return function () { document.getElementById(id).scrollIntoView(); };
  }

  var commands = [{ label: "Top of page", hint: "Go", run: goTo("top") }]
    .concat(sections.map(function (section) {
      return { label: section.dataset.label, hint: "Go", run: goTo(section.id) };
    }))
    .concat([
      { label: "Copy email address", hint: "Action", run: copyEmail },
      { label: "Switch colour theme", hint: "Action", run: toggleTheme }
    ]);

  function runCommand(command) {
    palette.close();
    command.run();
  }

  function renderPalette() {
    var query = input.value.trim().toLowerCase();
    visible = commands.filter(function (command) {
      return command.label.toLowerCase().indexOf(query) !== -1;
    });
    selected = Math.min(selected, Math.max(visible.length - 1, 0));
    list.textContent = "";
    if (!visible.length) {
      list.appendChild(el("li", "empty", "No matches"));
      return;
    }
    visible.forEach(function (command, i) {
      var li = el("li");
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", i === selected ? "true" : "false");
      li.appendChild(el("span", "", command.label));
      li.appendChild(el("small", "", command.hint));
      li.addEventListener("click", function () { runCommand(command); });
      li.addEventListener("mousemove", function () {
        if (selected === i) return;
        selected = i;
        renderPalette();
      });
      list.appendChild(li);
    });
    var active = list.children[selected];
    if (active) active.scrollIntoView({ block: "nearest" });
  }

  function openPalette() {
    if (palette.open) return;
    input.value = "";
    selected = 0;
    renderPalette();
    palette.showModal();
    input.focus();
  }

  $("open-menu").addEventListener("click", openPalette);
  input.addEventListener("input", function () { selected = 0; renderPalette(); });
  palette.addEventListener("click", function (event) {
    if (event.target === palette) palette.close();
  });

  input.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!visible.length) return;
      var step = event.key === "ArrowDown" ? 1 : -1;
      selected = (selected + step + visible.length) % visible.length;
      renderPalette();
    } else if (event.key === "Enter" && visible[selected]) {
      event.preventDefault();
      runCommand(visible[selected]);
    }
  });

  document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (palette.open) palette.close(); else openPalette();
    }
  });

  /* ---------- Hero dot field ---------- */

  var canvas = $("field");
  var ctx = canvas.getContext("2d");
  var dots = [];
  var width = 0;
  var height = 0;
  var pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
  var heroVisible = true;
  var frameRequested = false;
  var SPACING = 30;
  var RADIUS = 190;

  function sizeField() {
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = hero.clientWidth;
    height = hero.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    dots = [];
    for (var y = SPACING / 2; y < height; y += SPACING) {
      for (var x = SPACING / 2; x < width; x += SPACING) dots.push(x, y);
    }
  }

  function drawField(time) {
    pointer.x += (pointer.tx - pointer.x) * 0.12;
    pointer.y += (pointer.ty - pointer.y) * 0.12;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#fff";
    var t = time * 0.0005;
    for (var i = 0; i < dots.length; i += 2) {
      var x = dots[i];
      var y = dots[i + 1];
      var wave = Math.sin(x * 0.009 + t) + Math.cos(y * 0.012 - t * 0.8);
      var dx = x - pointer.x;
      var dy = y - pointer.y;
      var distance = Math.sqrt(dx * dx + dy * dy) || 1;
      var pull = Math.max(0, 1 - distance / RADIUS);
      var push = pull * pull * 34;
      var size = 1.1 + wave * 0.3 + pull * 2.2;
      ctx.globalAlpha = Math.min(0.9, 0.16 + wave * 0.05 + pull * 0.7);
      ctx.fillRect(x + (dx / distance) * push - size / 2, y + (dy / distance) * push - size / 2, size, size);
    }
    ctx.globalAlpha = 1;
  }

  function animate(time) {
    frameRequested = false;
    if (!heroVisible) return;
    drawField(time);
    requestFrame();
  }

  function requestFrame() {
    if (frameRequested || reducedMotion) return;
    frameRequested = true;
    requestAnimationFrame(animate);
  }

  sizeField();
  drawField(0);

  new IntersectionObserver(function (entries) {
    heroVisible = entries[0].isIntersecting;
    if (heroVisible) requestFrame();
  }).observe(hero);

  hero.addEventListener("pointermove", function (event) {
    var box = hero.getBoundingClientRect();
    pointer.tx = event.clientX - box.left;
    pointer.ty = event.clientY - box.top;
  });
  hero.addEventListener("pointerleave", function () {
    pointer.tx = -9999;
    pointer.ty = -9999;
  });

  window.addEventListener("resize", function () {
    sizeField();
    drawField(performance.now());
  });

  requestFrame();
})();
