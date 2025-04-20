const API_KEY = "67561afebbb37adbd70041af6c107496991622bdbb2479ed00b09a3c126d4fa6";

async function scanUrl() {
  const url = document.getElementById("urlInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!url) {
    resultDiv.innerHTML = "❗ Please enter a valid URL.";
    return;
  }

  resultDiv.innerHTML = "🔄 Scanning URL...";

  try {
    // Step 1: Submit the URL
    const submitRes = await axios.post(
      "https://www.virustotal.com/api/v3/urls",
      new URLSearchParams({ url }),
      {
        headers: { "x-apikey": API_KEY }
      }
    );

    const scanId = submitRes.data.data.id;

    // Step 2: Retrieve results
    const resultRes = await axios.get(
      `https://www.virustotal.com/api/v3/urls/${scanId}`,
      {
        headers: { "x-apikey": API_KEY }
      }
    );

    const stats = resultRes.data.data.attributes.last_analysis_stats;
    resultDiv.innerHTML = renderResult("URL", stats);
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = "❌ Error scanning URL.";
  }
}

async function scanFile() {
  const file = document.getElementById("fileInput").files[0];
  const resultDiv = document.getElementById("result");

  if (!file) {
    resultDiv.innerHTML = "❗ Please select a file to scan.";
    return;
  }

  resultDiv.innerHTML = "🔄 Scanning File...";

  try {
    const formData = new FormData();
    formData.append("file", file);

    // Step 1: Upload file
    const uploadRes = await axios.post(
      "https://www.virustotal.com/api/v3/files",
      formData,
      {
        headers: {
          "x-apikey": API_KEY,
          // 'Content-Type' is automatically set by Axios for FormData
        }
      }
    );

    const fileId = uploadRes.data.data.id;

    // Step 2: Retrieve results
    const resultRes = await axios.get(
      `https://www.virustotal.com/api/v3/files/${fileId}`,
      {
        headers: { "x-apikey": API_KEY }
      }
    );

    const stats = resultRes.data.data.attributes.last_analysis_stats;
    resultDiv.innerHTML = renderResult("File", stats);
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = "❌ Error scanning file.";
  }
}

function renderResult(type, stats) {
  return `
    <h4>${type} Scan Results</h4>
    <p>✅ Harmless: ${stats.harmless}</p>
    <p>🚨 Malicious: ${stats.malicious}</p>
    <p>⚠️ Suspicious: ${stats.suspicious}</p>
    <p>🕵️‍♂️ Undetected: ${stats.undetected}</p>
  `;
}
