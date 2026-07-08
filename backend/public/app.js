const state = {
  token: localStorage.getItem("token") || "",
  user: JSON.parse(localStorage.getItem("user") || "null"),
  jobs: [],
  applications: [],
  adminJobs: [],
  adminUsers: [],
  adminApplications: [],
  analytics: null,
};

const API_BASE = window.location.protocol === "file:" ? "http://localhost:8000" : "";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const api = async (path, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (state.token) {
    headers.Authorization = `Bearer ${state.token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || "Request failed");
  }

  return payload.data;
};

const toast = (message) => {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("show");
  window.setTimeout(() => node.classList.remove("show"), 2600);
};

const formatDate = (value) => {
  if (!value) return "No deadline";
  return new Intl.DateTimeFormat("en", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
};

const formatCurrency = (value) => {
  if (!value) return "Stipend not listed";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
};

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const splitSkills = (value) => value
  .split(",")
  .map((skill) => skill.trim())
  .filter(Boolean);

const isAdmin = () => state.user?.role === "admin";

const setSession = (data) => {
  state.token = data.token;
  state.user = data.user;
  localStorage.setItem("token", state.token);
  localStorage.setItem("user", JSON.stringify(state.user));
  updateSessionUi();
};

const clearSession = () => {
  state.token = "";
  state.user = null;
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  updateSessionUi();
};

const updateSessionUi = () => {
  const loggedIn = Boolean(state.token);
  $$("[data-open-auth]").forEach((button) => button.classList.toggle("hidden", loggedIn));
  $("#logoutButton").classList.toggle("hidden", !loggedIn);
  $("#adminLocked").classList.toggle("hidden", isAdmin());
  $("#adminContent").classList.toggle("hidden", !isAdmin());

  if (isAdmin()) {
    loadAdmin();
  }
};

const renderJobs = () => {
  const search = $("#jobSearch").value.trim().toLowerCase();
  const jobs = state.jobs.filter((job) => {
    const haystack = [job.title, job.company, job.location, ...(job.skills || [])].join(" ").toLowerCase();
    return haystack.includes(search);
  });

  $("#heroJobCount").textContent = state.jobs.length;
  $("#jobsGrid").innerHTML = jobs.length ? jobs.map((job) => `
    <article class="job-card">
      <div>
        <h3>${escapeHtml(job.title)}</h3>
        <p>${escapeHtml(job.company || "Company not listed")} · ${escapeHtml(job.location || "Remote / flexible")}</p>
      </div>
      <div class="job-meta">
        ${(job.skills || []).slice(0, 4).map((skill) => `<span class="pill">${escapeHtml(skill)}</span>`).join("")}
      </div>
      <p>${formatCurrency(job.stipend)} · ${escapeHtml(job.duration || "Duration open")} · ${formatDate(job.deadline)}</p>
      <button class="button dark" data-apply-job="${job._id}">Apply now</button>
    </article>
  `).join("") : `<div class="empty-state">No jobs are available from the backend yet.</div>`;

  $("#pipelinePreview").innerHTML = state.jobs.slice(0, 4).map((job) => `
    <article class="pipeline-card">
      <strong>${escapeHtml(job.title)}</strong>
      <span>${escapeHtml(job.company || "Company")} · ${escapeHtml(job.location || "Location flexible")}</span>
    </article>
  `).join("") || `<article class="pipeline-card"><strong>No open roles</strong><span>Create jobs from the admin panel.</span></article>`;
};

const loadJobs = async () => {
  try {
    state.jobs = await api("/api/jobs");
    renderJobs();
  } catch (error) {
    $("#jobsGrid").innerHTML = `<div class="empty-state">${error.message}</div>`;
  }
};

const applyToJob = async (jobId) => {
  if (!state.token) {
    openAuth("login");
    toast("Please log in before applying.");
    return;
  }

  try {
    await api("/api/applications", {
      method: "POST",
      body: JSON.stringify({ jobId }),
    });
    toast("Application submitted.");
    if (isAdmin()) loadAdmin();
  } catch (error) {
    toast(error.message);
  }
};

const renderMetrics = () => {
  const analytics = state.analytics || {};
  $("#heroApplicationCount").textContent = analytics.totalApplications || 0;
  $("#heroUserCount").textContent = analytics.totalUsers || 0;
  $("#adminMetrics").innerHTML = [
    ["Users", analytics.totalUsers || 0],
    ["Jobs", analytics.totalJobs || 0],
    ["Applications", analytics.totalApplications || 0],
  ].map(([label, value]) => `<article><strong>${value}</strong><span>${label}</span></article>`).join("");
};

const renderAdminJobs = () => {
  $("#adminJobsList").innerHTML = state.adminJobs.length ? state.adminJobs.map((job) => `
    <article class="admin-row">
      <div>
        <h3>${escapeHtml(job.title)}</h3>
        <p>${escapeHtml(job.company || "Company")} · ${escapeHtml(job.location || "Location flexible")} · ${formatDate(job.deadline)}</p>
      </div>
      <div class="row-actions">
        <button class="button soft" data-edit-job="${job._id}">Edit</button>
        <button class="button dark" data-delete-job="${job._id}">Delete</button>
      </div>
    </article>
  `).join("") : `<div class="empty-state">No jobs have been created yet.</div>`;
};

const renderAdminApplications = () => {
  $("#adminApplicationsList").innerHTML = state.adminApplications.length ? state.adminApplications.map((application) => `
    <article class="admin-row">
      <div>
        <h3>${escapeHtml(application.userId?.name || "Candidate")} for ${escapeHtml(application.jobId?.title || "Deleted job")}</h3>
        <p>${escapeHtml(application.userId?.email || "No email")} · ${escapeHtml(application.jobId?.company || "Company")} · ${formatDate(application.createdAt)}</p>
      </div>
      <div class="row-actions">
        <select data-status-application="${application._id}" aria-label="Application status">
          ${["Saved", "Applied", "Interview", "Offer", "Rejected"].map((status) => `<option value="${status}" ${application.status === status ? "selected" : ""}>${status}</option>`).join("")}
        </select>
      </div>
    </article>
  `).join("") : `<div class="empty-state">No candidate applications yet.</div>`;
};

const renderAdminUsers = () => {
  $("#adminUsersList").innerHTML = state.adminUsers.length ? state.adminUsers.map((user) => `
    <article class="admin-row">
      <div>
        <h3>${escapeHtml(user.name)}</h3>
        <p>${escapeHtml(user.email)} · ${escapeHtml(user.role)}</p>
      </div>
      <div class="row-actions">
        <select data-user-role="${user._id}" aria-label="User role">
          <option value="user" ${user.role === "user" ? "selected" : ""}>user</option>
          <option value="admin" ${user.role === "admin" ? "selected" : ""}>admin</option>
        </select>
      </div>
    </article>
  `).join("") : `<div class="empty-state">No users found.</div>`;
};

const loadAdmin = async () => {
  if (!isAdmin()) return;

  try {
    const [analytics, jobsPayload, applications, users] = await Promise.all([
      api("/api/admin/analytics"),
      api("/api/admin/jobs"),
      api("/api/admin/applications"),
      api("/api/admin/users"),
    ]);

    state.analytics = analytics;
    state.adminJobs = jobsPayload.jobs || [];
    state.adminApplications = applications;
    state.adminUsers = users;

    renderMetrics();
    renderAdminJobs();
    renderAdminApplications();
    renderAdminUsers();
  } catch (error) {
    toast(error.message);
  }
};

const saveJob = async (event) => {
  event.preventDefault();

  const jobId = $("#jobId").value;
  const payload = {
    title: $("#jobTitle").value.trim(),
    company: $("#jobCompany").value.trim(),
    location: $("#jobLocation").value.trim(),
    skills: splitSkills($("#jobSkills").value),
    stipend: Number($("#jobStipend").value) || undefined,
    deadline: $("#jobDeadline").value || undefined,
    duration: $("#jobDuration").value.trim(),
    jobUrl: $("#jobUrl").value.trim(),
  };

  try {
    await api(jobId ? `/api/admin/jobs/${jobId}` : "/api/admin/jobs", {
      method: jobId ? "PUT" : "POST",
      body: JSON.stringify(payload),
    });
    resetJobForm();
    await Promise.all([loadJobs(), loadAdmin()]);
    toast("Job saved.");
  } catch (error) {
    toast(error.message);
  }
};

const resetJobForm = () => {
  $("#jobForm").reset();
  $("#jobId").value = "";
};

const editJob = (jobId) => {
  const job = state.adminJobs.find((item) => item._id === jobId);
  if (!job) return;
  $("#jobId").value = job._id;
  $("#jobTitle").value = job.title || "";
  $("#jobCompany").value = job.company || "";
  $("#jobLocation").value = job.location || "";
  $("#jobSkills").value = (job.skills || []).join(", ");
  $("#jobStipend").value = job.stipend || "";
  $("#jobDeadline").value = job.deadline ? job.deadline.slice(0, 10) : "";
  $("#jobDuration").value = job.duration || "";
  $("#jobUrl").value = job.jobUrl || "";
  $("#jobForm").scrollIntoView({ behavior: "smooth", block: "center" });
};

const deleteJob = async (jobId) => {
  if (!window.confirm("Delete this job?")) return;
  try {
    await api(`/api/admin/jobs/${jobId}`, { method: "DELETE" });
    await Promise.all([loadJobs(), loadAdmin()]);
    toast("Job deleted.");
  } catch (error) {
    toast(error.message);
  }
};

const changeApplicationStatus = async (applicationId, status) => {
  try {
    await api(`/api/admin/applications/${applicationId}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    await loadAdmin();
    toast("Application updated.");
  } catch (error) {
    toast(error.message);
  }
};

const changeUserRole = async (userId, role) => {
  try {
    await api(`/api/admin/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ role }),
    });
    await loadAdmin();
    toast("User role updated.");
  } catch (error) {
    toast(error.message);
  }
};

const openAuth = (mode) => {
  $("#authDialog").showModal();
  setAuthTab(mode);
};

const setAuthTab = (mode) => {
  $$("[data-auth-tab]").forEach((button) => button.classList.toggle("active", button.dataset.authTab === mode));
  $("#loginForm").classList.toggle("hidden", mode !== "login");
  $("#registerForm").classList.toggle("hidden", mode !== "register");
  $("#authMessage").textContent = "";
};

const login = async (event) => {
  event.preventDefault();
  try {
    const data = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: $("#loginEmail").value,
        password: $("#loginPassword").value,
      }),
    });
    setSession(data);
    $("#authDialog").close();
    toast(`Welcome, ${data.user.name}.`);
  } catch (error) {
    $("#authMessage").textContent = error.message;
  }
};

const register = async (event) => {
  event.preventDefault();
  try {
    await api("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: $("#registerName").value,
        email: $("#registerEmail").value,
        password: $("#registerPassword").value,
      }),
    });
    setAuthTab("login");
    $("#loginEmail").value = $("#registerEmail").value;
    $("#authMessage").textContent = "Account created. Log in to continue.";
  } catch (error) {
    $("#authMessage").textContent = error.message;
  }
};

document.addEventListener("click", (event) => {
  const authButton = event.target.closest("[data-open-auth]");
  if (authButton) openAuth(authButton.dataset.openAuth);

  const applyButton = event.target.closest("[data-apply-job]");
  if (applyButton) applyToJob(applyButton.dataset.applyJob);

  const editButton = event.target.closest("[data-edit-job]");
  if (editButton) editJob(editButton.dataset.editJob);

  const deleteButton = event.target.closest("[data-delete-job]");
  if (deleteButton) deleteJob(deleteButton.dataset.deleteJob);
});

document.addEventListener("change", (event) => {
  const applicationId = event.target.dataset.statusApplication;
  if (applicationId) changeApplicationStatus(applicationId, event.target.value);

  const userId = event.target.dataset.userRole;
  if (userId) changeUserRole(userId, event.target.value);
});

$$("[data-auth-tab]").forEach((button) => button.addEventListener("click", () => setAuthTab(button.dataset.authTab)));
$$("[data-admin-tab]").forEach((button) => button.addEventListener("click", () => {
  $$("[data-admin-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
  $$(".admin-tab-panel").forEach((panel) => panel.classList.toggle("hidden", panel.id !== button.dataset.adminTab));
}));

$("#logoutButton").addEventListener("click", () => {
  clearSession();
  toast("Logged out.");
});
$("#loginForm").addEventListener("submit", login);
$("#registerForm").addEventListener("submit", register);
$("#jobForm").addEventListener("submit", saveJob);
$("#resetJobForm").addEventListener("click", resetJobForm);
$("#jobSearch").addEventListener("input", renderJobs);
$("#refreshJobs").addEventListener("click", loadJobs);

updateSessionUi();
loadJobs();
