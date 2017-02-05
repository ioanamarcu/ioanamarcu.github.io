(function($){

	$(document).ready(function() {

		var slideCount = $("#slider").children().length; 
		var currentSlider = 0; 

		function updateActiveSlide(){

			$("#slider").find('.slide').removeClass('visible');  
			$("#slider").find(".slide").eq(currentSlider).addClass('visible'); 
			$("#slider-nav").find("li").removeClass("active");					
			$("#slider-nav").find("li").eq(currentSlider).addClass("active");
		}

		$(".arrow-left").on("click", function(){				

			if (currentSlider > 0) {   
				currentSlider--;	   
			} else {					
				currentSlider = slideCount-1;
			}
			
			console.log('currentSlider = ', currentSlider);
			updateActiveSlide();
			stopAnimationInterval();
			startAnimationInterval();
		});

		function slideSwitchNext(){
			if (currentSlider < slideCount-1){   
					currentSlider++;			
				} else 	{						
					currentSlider = 0;
				}
				
			console.log('currentSlider = ', currentSlider);

			updateActiveSlide();
			stopAnimationInterval();
			startAnimationInterval();
		}

		$(".arrow-right").on("click", slideSwitchNext);

		var animationIntervalId;

		function startAnimationInterval(){
			animationIntervalId = setInterval(slideSwitchNext, 3000);
		}

		function stopAnimationInterval(){
			clearInterval(animationIntervalId);
		}

		$("#slider-nav").on("click", "li", function(){

			console.log($(this));
			console.log('s-a dat click pe ', $(this).index());

			currentSlider = $(this).index();
			updateActiveSlide();
			stopAnimationInterval();
			startAnimationInterval();
		});

		function init(){
			currentSlider = 0;
			updateActiveSlide();  
			startAnimationInterval();
		}

		init();
	});

})(jQuery);