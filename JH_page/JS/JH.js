
// 클릭하면 스크롤스냅 //

function cu_goPrecious() {
  document.querySelector('.curated_slider').scrollBy({ 
    left: -300,
    behavior: 'smooth' 
  });
}
function cu_goNext() {
  document.querySelector('.curated_slider').scrollBy({ 
    left: 300,
    behavior: 'smooth' 
  });
}

function ve_goPrecious() {
  document.querySelector('.verified_slider').scrollBy({ 
    left: -300,
    behavior: 'smooth' 
  });
}
function ve_goNext() {
  document.querySelector('.verified_slider').scrollBy({ 
    left: 300,
    behavior: 'smooth' 
  });
}
// 참고링크
// https://junjangsee.tistory.com/entry/CSS-scroll-snap-%EC%86%8D%EC%84%B1%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
// https://stackoverflow.com/questions/57518428/css-scroll-snap-points-with-navigation-next-previous-buttons


