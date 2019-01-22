var tl, tlRepeat, thisTime, disclaimerBtn, isOpen = false;


function init(){
	if (!EB.isInitialized()) {
		EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
	}
		startAd();
}

function startAd(){
		tl = new TimelineMax({repeat:1, repeatDelay: 3});
		tlRepeat = new TimelineMax();
		disclaimerBtn = document.getElementById('disclaimer');

		document.getElementById('innerwrapper').addEventListener('click', clickthrough, false);
		disclaimerBtn.addEventListener('click', disclaimer, false);
			
			tlRepeat.pause();
			//1st frame
			tl
			.set('#logo', {opacity:1})
			.to('#gradient-bg', 0.5, {opacity: 1, top:"0", ease: Quart.easeOut})
			.to('#lockup', 0.5, {top:'10px', ease:Quart.easeOut})
			.to('#car', 0.5 , {top:'0px', ease: Quart.easeOut}, "-=0.5")
			.to('#lockup_shadow', 0.5, {opacity:1, top:'0px', ease: Quart.easeOut})

			//2nd frame
			.to('#car', 0.5 , {left:'300px', ease: Quart.easeIn}, "+=2")
            .to('#lockup_shadow', 0.5, {opacity:1, left:'-864px', ease: Quart.easeOut})
			.to('#lockup', 0.5, {left:'-824px', ease:Quart.easeOut}, "-=0.5")

			.to('#headline', 0.5, {left:'-100%', ease:Quart.easeIn}, "-=0.5")
			//.to('#gradient-bg', 0.5, {top:'-=57px',ease:Quart.easeOut})
			.fromTo('#car', 0.5,{left:'-350px',top:'0px', immediateRender:false},{left:'0', ease: Quart.easeOut})
			.to('#usp', 0.5, {left: '18px', ease:Quart.easeOut}, "-=0.5")

			//3rd frame
			.to('#usp',0.5,{opacity:0, ease:Quart.easeIn }, "+=2")
			.to('#car', 0.5, {top:'100%', opacity:0, ease:Quart.easeIn})
			.to('#gradient-bg',0.5,{opacity: 0, top:'200%', ease:Quart.easeIn }, "-=0.5")

			//end frame
			.to('#car-profile', 0.25, {opacity: 1, right:'0', ease:Quart.easeOut})
			.staggerTo('.group', 0.25, {opacity:1, ease:Quart.easeIn}, 0.25)
			.to('#btn', 0.25, {opacity: 1, ease: Quart.easeIn})
			.to(disclaimerBtn, 0.5,{opacity:1, ease:Quart.easeIn})
			.to('.group', 0.5, {opacity:0, ease:Quart.easeOut}, "+=2")


			//dealer frame
			.staggerTo('.dealer', 0.25, {opacity:1, ease:Quart.easeIn}, 0.25)
			.call(repeatAnimation);
			var duration = tl.totalDuration();
			console.log(duration);
  	
}

function removeDisclaimer(){
	TweenMax.to(disclaimerBtn, 0.5, {opacity:0, ease:Quart.easeOut})
}
function disclaimer(){
		disclaimerBtn.classList.toggle('open');
		isOpen = isOpen ? false : true;

		if(isOpen == true){
			TweenMax.to('#disclaimer-text', 0.25, {height:'auto', opacity:1, ease:Quart.easeIn});
			//console.log('open');
			tl.pause();
			tlRepeat.pause();
			disclaimerBtn.innerHTML= '<sup>#^</sup>Close disclaimer';
		}
		else{
			TweenMax.to('#disclaimer-text', 0.25, {height:0, opacity:0, ease:Quart.easeIn});
			tl.resume();
			disclaimerBtn.innerHTML = '<sup>#^</sup>View disclaimer';
			if(thisTime < 16){
				tlRepeat.resume();
			}
			else{
				tlRepeat.pause();
			}
			
		}
		
}
function repeatAnimation(){
	thisTime = tl.totalTime();
	//console.log(thisTime);
	if(thisTime < 16){
		tlRepeat.play();
		tlRepeat.to('.dealer, #car-profile, #btn', 1, {opacity:0, ease:Quart.easeOut, onStart: removeDisclaimer}, "+=2");
	}
}

function clickthrough() {
            EB.clickthrough();
}
window.addEventListener('load', init, false);