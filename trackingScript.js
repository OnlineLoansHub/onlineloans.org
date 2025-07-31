const apiUrl = "https://api.onlineloans.org";
(function () {
  // --- Only send initial POST on full navigation ---
  const navEntry = performance.getEntriesByType("navigation")[0];
  if (navEntry && navEntry.type !== "navigate") return;

  const urlParams = new URLSearchParams(window.location.search);

  // Helper to get query params
  function getQueryParam(param) {
    return urlParams.get(param) || "";
  }

  // Reusable function to get sub1–sub20
  function getSubs() {
    const subs = {};
    for (let i = 1; i <= 20; i++) {
      subs[`sub${i}`] = getQueryParam(`sub${i}`);
    }
    return subs;
  }

  // 1. --- Send initial ad-click on page load ---
  const adClickPayload = {
    ...getSubs(),
    advertisedPageName: window.location.pathname
  };

  fetch(apiUrl + "/ad-click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(adClickPayload)
  })
    .then(res => console.log(`Ad click reported: ${res.status}`))
    .catch(err => console.error("Ad click report failed:", err));

  // 2. --- Send ap-click on element click ---
  function handleClick(event) {
    const el = event.target.closest("button, a, img");
    if (!el) return;

    const propertyType = el.tagName.toLowerCase(); // 'button', 'a', or 'img'
    const propertyId = el.id || "";
    let propertyName = "";

    if (propertyType === "img") {
      propertyName = el.alt || el.getAttribute("aria-label") || "";
    } else {
      propertyName = el.innerText.trim() || el.getAttribute("aria-label") || "";
    }

    const clickPayload = {
      ...getSubs(),
      advertisedPageName: window.location.pathname,
      registration: false,
      deposit: false,
      propertyType,
      propertyId,
      propertyName
    };

    fetch(apiUrl + "/ap-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clickPayload)
    })
      .then(res => console.log(`Click tracked: ${res.status}`))
      .catch(err => console.error("Click tracking failed:", err));
  }

  // Attach to all clicks on page
  document.addEventListener("click", handleClick);
})();
