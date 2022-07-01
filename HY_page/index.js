const count = 36;
let imgArr = [];
let w = window.innerWidth;
let h = window.innerHeight;

let angle = 0;

const radian = (angle) => (angle * Math.PI) / 180;

const BASE_X = w /0.3;
const BASE_Y = h /2.3;

const SIZE_RADIUS = 400;
let title = new Array();
let image = new Array();
let content = new Array();
let price = new Array();

//json 데이터
function loadJson(){
  return fetch("nft_data.json")
  .then((res)=>res.json())
  .then((json)=>json.nft)
  .catch((rej)=>{
      console.log('정보 활성화 실패')
  });
}
loadJson().then((nft)=>{
  for (const key in nft) {
    if (Object.hasOwnProperty.call(nft, key)) {
      title.push(nft[key].title);
      image.push(nft[key].imge);
      content.push(nft[key].content);
      price.push(nft[key].price); 
    }
  }
})
console.log(title);
console.log(title[3]);
console.log(title[3]);
//돌아가는 div 만드는 함수
let num=0;
const create = (angle) => {
  let _el = document.createElement("div");
  _el.classList.add(`pos${num}`);
  num++;
  let _img = document.createElement("img");
  _el.appendChild(_img);
  const x = Math.cos(radian(angle)) * SIZE_RADIUS + BASE_X;
  const y = Math.sin(radian(angle)) * SIZE_RADIUS + BASE_Y;

  _el.style.transform = `translate(${x}px, ${y}px)`;
  box.appendChild(_el);
  imgArr.push(_el);
};
//생성
for (let i = 0; i < count; i++) {
  create(angle + (360 / count) * i);
}
//정방향
const move = () => {
  for (let i = 0; i < count; i++) {
    const x =
      Math.cos(radian(angle + (360 / count) * i)) * SIZE_RADIUS + BASE_X;
    const y =
      Math.sin(radian(angle + (360 / count) * i)) * SIZE_RADIUS + BASE_Y;
    imgArr[i].style.transform = `translate(${x}px, ${y}px)`;
  }
  angle+=360/imgArr.length;
};
//반대방향 돌리기
const remove = () => {
  for (let i = 0; i < count; i++) {
    const x =
      Math.cos(radian(angle + (360 / count) * i)) * SIZE_RADIUS + BASE_X;
    const y =
      Math.sin(radian(angle + (360 / count) * i)) * SIZE_RADIUS + BASE_Y;
    imgArr[i].style.transform = `translate(${x}px, ${y}px)`;
  }
  angle-=360/imgArr.length;
};
//휠 반응에 따라 동작 입력
let roll = 0; //휠 틱 컨트롤
let index=0;
let index_check=0;
let buy_btn=document.querySelector('.buy_button');
let ck_pg=document.querySelector('.cookie_page');


window.onwheel = function (e) {
  let go = document.querySelector('.ball');
  if(e.wheelDelta<0){
    move();
    roll++;
    if(roll%7==0){
      index_check++;
    }
  }else if(e.wheelDelta>0){
    remove()
    roll--;
    if(roll%7==0){
      index_check--;
    }
  }
  //빠꾸로도 돌아가기 데이터 개수제한
  index=Math.abs(index_check%30);
  console.log(title[index]);
  console.log(title[3]);
  
  //휠에 따른 반응 컨트롤
  let ballUp=Math.abs(roll)
  if((ballUp%=7) ==0){
    go.style.transform = 'translate(0,-500px) scale(0.2,0.2)';
    view_img.src=image[index];
    nft_buy.style.boxShadow="rgba(240, 46, 170, 0.3) 0 0 2px 2px, rgba(240, 46, 170, 0.2) 0 0 4px 4px, rgba(240, 46, 170, 0.1) 0 0 6px 6px";
    view_title.innerHTML=title[index];
    view_title.style.borderBottom='2px solid';
    view_title.style.borderImage='linear-gradient(90deg,blue,blanchedalmond)5';
    view_content.innerHTML=content[index];
    view_price.innerHTML=price[index];
    price_logo.src='/images/ETH_logo.png';
    buy_btn.style.display='block';
  }else if((ballUp%7)==3){
    ck_pg.style.display='none';
    go.style.transform='translate(0,0)';
    view_img.src='';
    nft_buy.style.boxShadow='';
    view_title.innerHTML='';
    view_title.style.borderBottom='';
    view_content.innerHTML='';
    view_price.innerHTML='';
    price_logo.src='';
    buy_btn.style.display='';
  }
  console.log(roll);
  console.log("ee"+roll%5);
  console.log(Math.abs(roll));
};

//구매 활성화 페이지 작동 컨트롤
let by_pg_tt=document.querySelector('.buy_page_title>h1');
let by_pg_pr_val=document.querySelector('.buy_page_price_value');
let by_pg_btn=document.querySelector('.buy_page_btn');
let by_pg_hid=document.querySelector('.buy_page_hidden');
let buy_pg=document.querySelector('.buy_page');
let buy_pg_cls_btn=document.querySelector('.buy_page_close_btn>button');
//페이지 열기
buy_btn.addEventListener('click',()=>{
  by_pg_hid.className+=' buy_page_active';
  by_pg_tt.innerHTML=title[index];
  by_pg_pr_val.innerHTML=price[index];
});
view_img.addEventListener('click',()=>{
  by_pg_hid.className+=' buy_page_active';
  by_pg_tt.innerHTML=title[index];
  by_pg_pr_val.innerHTML=price[index];
})
//페이지 닫기
let by_pg_wrap=document.querySelector('.buy_page_wrap');
let pg_check=0;
by_pg_wrap.addEventListener('mouseenter',()=>{
  pg_check=1;
})
by_pg_wrap.addEventListener('mouseleave',()=>{
  pg_check=0;
})
buy_pg_cls_btn.addEventListener('click',()=>{
  by_pg_hid.classList.remove('buy_page_active');
})
buy_pg.addEventListener('click',()=>{
  if(pg_check==0){
    by_pg_hid.classList.remove('buy_page_active');
  }
})
//최종 구매
by_pg_btn.addEventListener('click',()=>{
  alert("천만원 :)")
})



//마우스 커서 컨트롤
// const cursor = document.querySelector('.cursor');
// window.addEventListener('mousemove',(e) => {
//   cursor.style.left = `${e.clientX}px`;
//   cursor.style.top = `${e.clientY}px`;
// });

//헤더 메뉴 활성화
let mLeft=document.querySelector('.header_menu_left');
let mMiddle=document.querySelector('.header_menu_middle');
let mRight=document.querySelector('.header_menu_right');
let mWrap=document.querySelector('.header_menu_wrap');
let menu_check=1;
let menu_icon_check=0;
function menuClose(){
  if(menu_check==0&&menu_icon_check==0){
  mLeft.classList.remove('active_menu');
  mMiddle.classList.remove('active_menu');
  mRight.classList.remove('active_menu');
  mWrap.classList.remove('active_menu');
  header_menu.classList.remove('active_menu');  
  mLeft.style.transform='translate(0,0)';
  mMiddle.style.transform='translate(0,0)';
  mRight.style.transform='translate(0,0)';
  }
  menu_check=1;
}
header_home.addEventListener('mouseenter',function(){
  menu_icon_check=1;
  mWrap.className+=' active_menu';
  mLeft.className+=' active_menu';
  mMiddle.className+=' active_menu';
  mRight.className+=' active_menu';
  header_menu.className+=' active_menu';
  setTimeout(function(){
    mLeft.style.transform='translate(0,-125px)';
    mMiddle.style.transform='translate(0,-65px)';
    mRight.style.transform='translate(0,-95px)';
  },50);
})
header_out_check.addEventListener('mouseleave',function(){
  menu_icon_check=0;
  menuClose();
})
mWrap.addEventListener('mouseleave',function(){
  menu_check=0;
  menuClose();
})
mWrap.addEventListener('mouseenter',function(){
  menu_check=1;
})

//NFT구매 활성화
nft_buy.addEventListener('mouseenter',function(){
  view_img.style.transform='scale(1.1,1.1)';
})
nft_buy.addEventListener('mouseleave',function(){
  view_img.style.transform='scale(1,1)';
})


//cookie 컨트롤
let ck_check=0;
let ck_pg_img=document.querySelector('.cookie_page>img');
ck_pg.addEventListener('mouseenter',()=>{
  ck_check++;
  if(ck_check==1){
    ck_pg_img.src='images/cuki_2.png';
  }
  else if(ck_check==2){
    ck_pg_img.src='images/cuki_3.png';
  }
  else if(ck_check==3){
    ck_pg_img.src='images/cuki_4.png';
  }
  else if(ck_check==4){
    ck_pg_img.src='';
  }
});

//ㅋㅋㅋㅋ
let kkk= document.querySelector('.hhhhh');
let header_home_g=document.querySelector('.header_home_go');
let count_kkk=0;

header_home_g.addEventListener('mouseenter',()=>{
  if(count_kkk==1){return;}
  else{kkk.className+=' active_menu';}
  
  count_kkk=1;
});
kkk.addEventListener('click',()=>{
  kkk.classList.remove('active_menu');
});
//메인페이지 돌아가기
// header_home_g.addEventListener('click',()=>{
//   main_go.hre
// })



