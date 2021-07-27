var myapp=angular.module('myApp',[]);
let populatedCompose="";
// var port = chrome.runtime.connect({name: "knockknock"});
// port.postMessage({joke: "Knock knock"});

// chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
//     chrome.runtime.sendMessage({'message':'extClicked'},function(response){
//         if(chrome.runtime.lastError){
//             console.log('error');
//             chrome.runtime.sendMessage({'message':'extClicked'});
//         }
//     });
// });


// chrome.tabs.onUpdated.addListener(function(activeInfo, sender, sendResponse) {
//     // conditional check prevents sending multiple messages per refresh
//     console.log("its inside");
//     if(sender.status ===  "complete") {
//       // do stuff here
//       chrome.runtime.sendMessage({'message':'extClicked'},function(response){});
//     }
// });


// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         if(request.message==='textSelected')
//     {
//         console.log(request.data);
//     }
//     });

myapp.controller("emailSenderController", function ($scope, $http) {
  
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {'message':'extClicked'}, function(response){
       populatedCompose=response;
    });
});

    $scope.emptyMail = {
        to: '',
        compose: ''
    };
    $scope.emails=[];
    chrome.storage.sync.get({emails:[]}, function(result) {
        $scope.emails=result.emails;
        console.log('Value currently is ' + result.emails);
      });      
    $scope.new=1;
    $scope.showOld = function () {
        $scope.new=0;
    };
    $scope.showNew = function () {
        $scope.new=1;
    };
    $scope.email = angular.copy($scope.emptyMail);
    $scope.email.compose=populatedCompose;
    $scope.submitEmailForm = function () {

        console.log($scope.email.to,$scope.email.compose);
        $scope.emails.push({to:$scope.email.to,compose:$scope.email.compose,sentDate:Date.now().toString(),show:false});
        chrome.storage.sync.set({emails:$scope.emails}, function() {
            console.log('Value is set to ' + $scope.emails);
          });
          chrome.storage.sync.get({emails:[]}, function(result) {
            $scope.emails=result.emails;
            result.emails.forEach(item=>console.log(item));
            console.log('Value currently is ' + result.emails);
          });
       // console.log($scope.emails);
        $scope.resetForm();
    };

    $scope.resetForm = function () {
        $scope.email = angular.copy($scope.emptyMail);
    };
    $scope.showEmailCompose=function(email){
        email.show=!email.show
    };
});

console.log("helloooo");
// chrome.tabs.onUpdated.addListener(function(activeInfo, sender, sendResponse) {
//     // conditional check prevents sending multiple messages per refresh
//     console.log("its inside");
//     if(sender.status ===  "complete") {
//       // do stuff here
//       chrome.extension.sendRequest({'message':'extClicked'},function(response){});
//     }
//});
// chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
//     chrome.extension.sendRequest({'message':'extClicked'},function(response){});
//   });
// chrome.extension.onRequest.addListener(function(request, sender, sendResponse)
// {
//     if(request.message==='textSelected')
//     {
//         console.log(request.data);
//     }
// });