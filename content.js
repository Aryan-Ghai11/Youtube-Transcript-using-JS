chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'summarize') {
    const videoTitleElement = document.querySelector('h1.title');
    const videoTitle = videoTitleElement ? videoTitleElement.innerText.trim() : '';
    const transcriptElement = document.querySelector('.transcript-renderer');
    const transcript = transcriptElement ? transcriptElement.innerText.trim() : '';

    const summaryPromise = getSummary(videoTitle, transcript); // Implement your summarization logic here

    summaryPromise
      .then(summary => {
        sendResponse({ summary: summary });
      })
      .catch(error => {
        sendResponse({ error: 'Error occurred while summarizing.' });
      });

    return true; // Return true to indicate that the sendResponse function will be called asynchronously
  }
});

function getSummary(videoTitle, transcript) {
  return new Promise((resolve, reject) => {
    // Implement your summarization logic here
    // Example using a library like 'node-bert-summarizer'
    const summarizer = new BERTSummarizer();
    const summary = summarizer.summarize(transcript);

    resolve(summary); // Resolve the promise with the summary
    // If an error occurs during summarization, you can reject the promise
    // and handle it in the catch block of the calling code.
    // reject(new Error('Error occurred during summarization.'));
  });
}


/*chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'summarize') {
    const videoTitleElement = document.querySelector('h1.title');
    const videoTitle = videoTitleElement ? videoTitleElement.innerText.trim() : '';
    const transcriptElement = document.querySelector('.transcript-renderer');
    const transcript = transcriptElement ? transcriptElement.innerText.trim() : '';

    // Replace the following code with your summarization logic
    const summary = 'This is the summarized transcript of "' + videoTitle + '".';

    sendResponse({ summary: summary });
  }
});*/
