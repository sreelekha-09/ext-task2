chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == "knockknock");
    port.onMessage.addListener(function(msg) {
      if (msg.joke == "Knock knock"){
          console.log(msg.joke);
      }
    });
  });

// document.addEventListener('mouseup',function(event)
// {
//     var selectedText = window.getSelection().toString();

//     if(selectedText.length)
//         chrome.extension.sendRequest({'message':'textSelected','data': selectedText},function(response){})
// })


// chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    // if (request.message === "extClicked")
    //  {
    //     var selectedText = window.getSelection().toString();
    //     console.log(selectedText);
    //     if(selectedText.length)
    //     {
    //         chrome.extension.sendRequest({'message':'textSelected','data': selectedText},function(response){});
    //     }
    //  }
// });

console.log("content");
// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         if (request.message == "extClicked")
//         {
//            var selectedText = window.getSelection().toString();
//            console.log(selectedText);
//            if(selectedText.length)
//            {
//                 chrome.runtime.sendMessage({'message':'textSelected','data': selectedText},function(response){});
//            }
//         }
//     }
//   );

