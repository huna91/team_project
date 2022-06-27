
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