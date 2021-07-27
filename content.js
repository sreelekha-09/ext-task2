chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message == "extClicked")
        {
           var selectedText = window.getSelection().toString();
           sendResponse(selectedText);
        }
    }
  );

