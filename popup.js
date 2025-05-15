document.getElementById("getSession").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const session = {
        localStorage: JSON.stringify(localStorage),
        cookies: document.cookie
      };
      return session;
    }
  }, (injectionResults) => {
    const result = injectionResults[0].result;
    document.getElementById("sessionData").value = JSON.stringify(result, null, 2);
  });
});
