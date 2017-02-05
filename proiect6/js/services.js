(function(){

	angular.module("myApp")
	.factory("fakeUser", ["$interval", function($interval){
		var promise;
		return {
			startSendingMessages: function(addMessageText){
				promise = $interval(addMessageText, 1000);
			},
			stopSendingMessages: function(){
				$interval.cancel(promise);	
			}
		};
	}])

	.factory("userService", function(){
		return {
			saveData: function(key, value){
				var jsonData = angular.toJson(value);
				localStorage.setItem(key, jsonData);
			},
			getSavedData: function(key){
				return localStorage.getItem(key);
			},
			removeSavedData: function(key){
				localStorage.removeItem(key);
			}

		};
	});

})();
