(function () {
    // Only proceed on full page navigation (not reload, back-forward, etc.)
    const navEntry = performance.getEntriesByType("navigation")[0];
    if (navEntry && navEntry.type !== "navigate") return;

    // Helper to get query params
    function getQueryParam(param) {
        return new URLSearchParams(window.location.search).get(param) || "";
    }

    // Build POST body
    const payload = {};
    for (let i = 1; i <= 20; i++) {
        payload[`sub${i}`] = getQueryParam(`sub${i}`);
    }

    // Hardcoded page name – update as needed or dynamically infer if desired
    payload["advertisedPageName"] = payload["advertisedPageName"] = window.location.pathname;;

    // Send POST
    fetch("https://api.onlineloans.org/ad-click", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(res => console.log(`Ad click reported: ${res.status}`))
        .catch(err => console.error("Ad click report failed:", err));
})();
