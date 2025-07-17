document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("upload-form");
  const resultsDiv = document.getElementById("results");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Clear previous results and show loading indicator
    resultsDiv.innerHTML = "<div style='color:#00ffe7;font-family:Orbitron,sans-serif;font-size:1.2em;'>⏳ Analyzing your data, please wait...</div>";

    const formData = new FormData(form);

    try {
      const res = await fetch("/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        resultsDiv.innerHTML = `<div style="color:#ff00cc;"><b>Error:</b> ${errorText}</div>`;
        return;
      }

      const data = await res.text();
      resultsDiv.innerHTML = data;
      // Optionally, scroll to results
      resultsDiv.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      resultsDiv.innerHTML = `<div style="color:#ff00cc;"><b>Network error:</b> ${err.message}</div>`;
    }
  });
});