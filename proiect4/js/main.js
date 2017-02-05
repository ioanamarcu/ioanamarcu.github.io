(function($){

	$(document).ready(function() {

		var addItem = function() {   

			var toAdd = $("#message").val();
			var TaskTemplate = '<div class="task">'+
						'<div class="task-checkbox">'+
							'<div class="custom-checkbox">'+
								'<input type="checkbox"/>'+
							'</div>'+
						'</div>'+
						'<div class="task-description">'+  
							'<p>'+toAdd+'</p>'+
						'</div>'+
						'<div class="task-time">'+
							'<span class="current-hour"></span>'+       
						'</div>'+
					'</div>';
			if ($("input").val() !== '') {			
				$(".list").append(TaskTemplate);
				$(".no-task-message").addClass("invisible");
		    }

			$("input").val('');

			updateTasksCounter();		
			$(".task:last-child > .task-time > .current-hour").html(calcul());
		};

		$(".button").on("click", addItem);           

		$("#message").on( "keydown", function(event) {
			if (event.which === 13) {				
				addItem();							
			}
		});

		$(".add-task").on({         
			"click": function() { 
				$(".new-task").slideToggle(); 
			}
		});

		$("input").focus(function(){
			$(this).css('outline-color', 'orange');   
		}); 

		$('.app-content').on("click", ".custom-checkbox", function(){
			$(this).toggleClass("checked"); 								
			$(this).parent().parent().toggleClass("active");
		
			if ($(".checked").length !== 0) {    
				$(".remove-task").show();
			} else {
				$(".remove-task").hide();   
			}

		});

		$(".remove-task").on("click", function(){
			$(".task.active").remove();
			$(".remove-task").hide();  		
			updateTasksCounter();

		});

		updateTasksCounter();   

		$("#month-name").html(displayMonthName());  
		$("#day-name").html(displayDay());
		
		setInterval("calcul()", 1000 * 60 * 1);			
	});   

	function displayMonthName() {
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		
	    var today = new Date();
	    var monthNumber = today.getMonth();
	    var currentMonthName = months[monthNumber]; 
	 	return currentMonthName;
	}

	function displayDay(){
		var weekDays=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var today = new Date();
		var dayNumberOfTheWeek = today.getDay();
		var currentDayName = weekDays[dayNumberOfTheWeek];

		var dayNumber = today.getDate();
		return currentDayName + ", " + getDaySuffix(dayNumber);

		function getDaySuffix(num){
		    var array = "" + ("" + num).split("").reverse(); 
		    if (array[1] != "1") { 
		        switch (array[0]) {
		            case "1": return num + "st";
		            case "2": return num + "nd";
		            case "3": return num + "rd";
	       		}
	    	}

	   		return num + "th";
		}
	}

	function displayCounter(){

		var count = $('.task').length;

		if (count === 0) {					
		
		$(".no-task-message").removeClass("invisible");  
		}

		return count;
	}

	function updateTasksCounter() {
		$("#task-counter").find("b").html(displayCounter()); 
	}

	function calcul() {

		var today = new Date();   
		var currentHour = today.getHours(); 
		var currentMinutes = today.getMinutes();
		var currentSeconds = today.getSeconds();

		var x = today.getHours();

		if(currentMinutes<10) {
	    	currentMinutes = '0'+ currentMinutes;
		}

		if(currentSeconds<10) {
	    	currentSeconds = '0'+ currentSeconds;
		}

		if ( (x>0) && (x<12) ){
			return x + ":" + currentMinutes + " AM";
		} else if ((x > 12) && (x<=23)) {
			return (x-12) + ":" + currentMinutes + " PM";
		} else if (x === 0) {
			return 12 + ":" + currentMinutes + " AM";
		} else if (x === 12) {
			return 12 + ":" + currentMinutes + " PM";
		}
	}

})(jQuery);
