
// 버튼 클릭으로 스크롤스냅 //

function cu_goPrecious() {
  document.querySelector('.curated_slider').scrollBy({ 
    left: -400,
    behavior: 'smooth' 
  });
}
function cu_goNext() {
  document.querySelector('.curated_slider').scrollBy({ 
    left: 400,
    behavior: 'smooth' 
  });
}

function ve_goPrecious() {
  document.querySelector('.verified_slider').scrollBy({ 
    left: -400,
    behavior: 'smooth' 
  });
}
function ve_goNext() {
  document.querySelector('.verified_slider').scrollBy({ 
    left: 400,
    behavior: 'smooth' 
  });
}
// 참고링크
// https://junjangsee.tistory.com/entry/CSS-scroll-snap-%EC%86%8D%EC%84%B1%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
// https://stackoverflow.com/questions/57518428/css-scroll-snap-points-with-navigation-next-previous-buttons




// 스크롤 하면 이미지 고정되고 효과걸리게 //

let stop_bg = document.querySelector(".stop_img");
let marq = document.querySelector(".marq");
let _top = stop_bg.getBoundingClientRect().top - window.pageYOffset;

/*
window.onscroll = function(){
  if (window.scrollY > _top) {
    if (!stop_bg.classList.contains('stop_')) {
      stop_bg.classList.add("stop_");

    }
  }
  else {
    stop_bg.classList.remove("stop_")
  }

}*/

  /* 확인용 콘솔
  console.log("_top = "+ _top)
  console.log("window.pageYOffset = "+ window.pageYOffset);
  console.log("window.scrollY = "+ window.scrollY);
  console.log(stop_bg.getBoundingClientRect().top);
  console.log(stop_bg.classList);
  */


window.addEventListener("scroll", function(){
  if (window.scrollY > _top) {
    if (!stop_bg.classList.contains("stop_")) {
      stop_bg.classList.add("stop_");
      marq.classList.add("stop_marq");
    }
  }
  else {
    stop_bg.classList.remove("stop_");
    marq.classList.remove("stop_marq");
  }

})



//메뉴판

class StickyNavigation {
	
	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.ContainH = 70;
		let self = this;
		$('.menu-tab').click(function() { 
			self.onTabClick(event, $(this)); 
		});
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}
	
	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.ContainH + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	onScroll() {
		this.checkP();
    this.findCurrentTabSelector();
	}
	
	onResize() {
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	checkP() {
		let offset = $('.menu-tabs').offset().top + $('.menu-tabs').height() - this.ContainH;
		if($(window).scrollTop() > offset) {
			$('.menu-tabs-container').addClass('menu-tabs-container--top');
		} 
		else {
			$('.menu-tabs-container').removeClass('menu-tabs-container--top');
		}
	}
	
	findCurrentTabSelector() {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.menu-tab').each(function() {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.ContainH;
			let offsetBottom = $(id).offset().top + $(id).height() - self.ContainH;
			if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
		if(this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}
	
	setSliderCss() {
		let width = 0;
		let left = 0;
		if(this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.menu-tab-slider').css('width', width);
		$('.menu-tab-slider').css('left', left);
	}
	
}

new StickyNavigation();