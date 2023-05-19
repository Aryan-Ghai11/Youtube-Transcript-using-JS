/*// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'summarize') {
    const videoTitleElement = document.querySelector('h1.title');
    const videoTitle = videoTitleElement ? videoTitleElement.innerText.trim() : '';
    const transcriptElement = document.querySelector('.transcript-renderer');
    const transcript = transcriptElement ? transcriptElement.innerText.trim() : '';

    try {
      const summary = getSummary(videoTitle, transcript); // Implement your summarization logic here
      sendResponse({ summary: summary });
    } catch (error) {
      sendResponse({ error: 'Error occurred while summarizing.' });
    }
    return true; // Return true to indicate that the sendResponse function will be called asynchronously
  }
});*/


// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'summarize') {
    const apiUrl = 'http://127.0.0.1:5000/summary?url=' + encodeURIComponent(message.url);

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        sendResponse({ summary: data.summary });
      })
      .catch(error => {
        console.error('Error:', error);
        sendResponse({ error: error.message });
      });

    // Return true to keep the message channel open for sendResponse
    return true;
  }
});
