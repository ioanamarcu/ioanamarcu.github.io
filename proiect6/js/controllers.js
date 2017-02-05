(function(){

	angular.module("myApp")
		.controller("MainController", ["$scope", "fakeUser", "userService", function($scope, fakeUser, userService){
			$scope.searchName = "";
			$scope.recentMessages = [
				{
					name: "John Doe",
					message: "",
					time: new Date(),
					userId: "1"
				},
				{
					name: "Origenes Emil",
					message: "Mauris ornare nibh vel dui malesuada imperdiet.",
					time: new Date(),
					userId: "2"
				},
				{
					name: "Farrell Wine",
					message: "Phasellus posuere massa eget tortor convallis iaculis.",
					time: new Date(),
					userId: "3"
				},
				{
					name: "Melchor Mel",
					message: "Nam sed mauris bibendum, dapibus risus id, suscipit lacus.",
					time: new Date(),
					userId: "4"
				},
				{
					name: "Nojus Agni",
					message: "Phasellus rutrum risus vitae lacus tempor, sed vestibulum dolor consectetur.",
					time: new Date(),
					userId: "5"
				}
			];

			$scope.messageList = [];

			$scope.userDetails = [
				{
					img: "hugh-jackman.png",
					name: "John Doe",
					activity: "Actor and senior producer",
					online: "online",
					phone: "0729564477",
					email: "john.smith@email.com",
					userId: "1"
				},
				{
					img: "hugh-jackman.png",
					name: "Origenes Emil",
					activity: "Web developer",
					online: "online",
					phone: "0729564477",
					email: "john.smith@email.com",
					userId: "2"
				},
				{
					img: "hugh-jackman.png",
					name: "Farrell Wine",
					activity: "Financial analyst",
					online: "online",
					phone: "0729564477",
					email: "john.smith@email.com",
					userId: "3"
				},
				{
					img: "hugh-jackman.png",
					name: "Melchor Mel",
					activity: "Production planner",
					online: "online",
					phone: "0729564477",
					email: "john.smith@email.com",
					userId: "4"
				},
				{
					img: "hugh-jackman.png",
					name: "Nojus Agni",
					activity: "Event manager",
					online: "online",
					phone: "0729564477",
					email: "john.smith@email.com",
					userId: "5"
				}
			];

			$scope.selectedUser = {};
			console.log($scope.selectedUser);
			console.log($scope.userDetails);
			console.log($scope.userDetails.length);

			$scope.addMessageText = function(user){
				console.log(user);
				var messageTime = new Date();
				if(typeof user === "string"){
					if (!$scope.newMessage) {
						return;
					}
					$scope.messageList.push(
						{
							name: $scope.selectedUser.name,
							timeStamp: messageTime,
							textMessage: $scope.newMessage,
							userId: $scope.selectedUser.userId,
							messageId: "message-"+((new Date()).getTime())
						}
					);

					$scope.updateRecentMessage($scope.selectedUser.userId, $scope.newMessage, messageTime);

					$scope.newMessage = "";
					
				} else {
					$scope.messageList.push(
						{
							name: "Hugh Jackman",
							timeStamp: new Date(),
							textMessage: "Lorem ipsum.",
							userId: $scope.selectedUser.userId,
							messageId: "message-"+((new Date()).getTime())
						}
					);

					$scope.updateRecentMessage($scope.selectedUser.userId, "Lorem ipsum.", messageTime);
					$scope.newMessage = "";
				}

				userService.saveData('messages', $scope.messageList);
			};

			$scope.updateRecentMessage = function(userId, message, timeStamp){
				var i;
				for(i=0; i < $scope.recentMessages.length; i++){
					if ($scope.recentMessages[i].userId === $scope.selectedUser.userId) {
						$scope.recentMessages[i].message = message.substr(0,50);
						$scope.recentMessages[i].time = timeStamp;
					}
				}
			};

			$scope.setActiveUser = function(userId){
				var i;
				for(i=0; i < $scope.userDetails.length; i++) {
					if (userId === $scope.userDetails[i].userId) {
						$scope.selectedUser = $scope.userDetails[i];
						console.log($scope.userDetails[i]);
						console.log($scope.userDetails[i].userId);
						console.log($scope.selectedUser);
						console.log($scope.selectedUser.userId);
						console.log($scope.messageList); 
					}
				}
			};

			$scope.selectedUser = $scope.userDetails[0];

			$scope.startSendingMessages = function(){
				fakeUser.startSendingMessages($scope.addMessageText);
			};

			$scope.stopSendingMessages = function(){
				fakeUser.stopSendingMessages($scope.addMessageText);	
			};

			if(userService.getSavedData('messages')){
				$scope.messageList = angular.fromJson(userService.getSavedData('messages'));
			}

			$scope.removeAllMessages = function(){
				confirm("Are you sure you want to remove all messages?");
				var filteredMessages = $scope.messageList.filter(function(currentObj){
					if( currentObj.userId !== $scope.selectedUser.userId ){
						return true;
					} else {
						return false;
					}
				});

				$scope.messageList = filteredMessages;
				userService.saveData('messages', $scope.messageList);
			};

			$scope.removeMessage = function(messageId){
				confirm("Delete this message? Once you delete your copy of this message, it cannot be undone.");
				
				var i;
				for (i=0; i < $scope.messageList.length; i++){
					if (messageId === $scope.messageList[i].messageId){
						$scope.messageList.splice(i, 1);
						break;
					}
				}
				userService.saveData('messages', $scope.messageList); 
				console.log('Acum ar fi trebuit sa sterg un mesaj!!!');				
			};

			$scope.isMenuShown = true;

			$scope.toggleMenu = function(){
				if ($scope.isMenuShown === true) {
					$scope.isMenuShown = false;
				} else {
					$scope.isMenuShown = true;
				}			
			};
		}])
			
		.directive("scrollBottom", function(){
			return {
				scope: {
					scrollBottom: "="
				},
				link: function(scope, element){
					scope.$watchCollection("scrollBottom", function(newValue) {
						if (newValue) {	
							$(element).scrollTop($(element)[0].scrollHeight);
						}
					});
				}
			};
		});
})();
