var myapp = angular.module('myApp', ['ngMaterial', 'ngMessages']);

myapp.controller("emailSenderController", function ($scope, $http) {

    $scope.email = {
        to: '',
        compose: ''
    };
    $scope.emails = [];
    chrome.storage.sync.get({ emails: [] }, function (result) {
        $scope.emails = result.emails;
        console.log('Value currently is ' + result.emails);
    });
    $scope.new = 1;
    $scope.showOld = function () {
        $scope.new = 0;
    };
    $scope.showNew = function () {
        $scope.new = 1;
    };

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { 'message': 'extClicked' }, function (response) {
            $scope.email.compose = response;
            console.log("receiving" + $scope.email.compose);
            $scope.$digest();
        });
    });
    
    $scope.submitEmailForm = function () {
        $scope.emails.push({ to: $scope.email.to, compose: $scope.email.compose, sentDate: Date.now().toString(), show: false });
        chrome.storage.sync.set({ emails: $scope.emails }, function () {
            console.log('Value is set to ' + $scope.emails);
        });
        chrome.storage.sync.get({ emails: [] }, function (result) {
            $scope.emails = result.emails;
            result.emails.forEach(item => console.log(item));
            console.log('Value currently is ' + result.emails);
        });
        $scope.resetForm();
    };

    $scope.resetForm = function () {
        $scope.email = {
            to: '',
            compose: ''
        }; 
        $scope.emailForm.$setPristine();
        //$scope.emailForm.$setValidity();
        $scope.emailForm.$setUntouched();
    };
    $scope.showEmailCompose = function (email) {
        email.show = !email.show
    };
});

console.log("helloooo");
