const scrollSection = document.querySelector('.scroll__section');
const scrollContent = document.querySelector('.scroll__content');

const scrollHeight = scrollSection.clientHeight;
const contentWidth = scrollContent.clientWidth;

document.addEventListener('scroll', e => {
  const scrolled = window.pageYOffset;
  const sectionOffset = Math.abs(scrollSection.offsetTop - scrolled);
  const notReachedBottom = parseInt(Math.max(0, scrollSection.getBoundingClientRect().bottom - window.innerHeight));

  if (scrollSection.offsetTop <= scrolled && notReachedBottom) {

    gsap.to(scrollContent, {
      x: -sectionOffset });

  }
});

const testTween = background => {
  const e1 = gsap.timeline();

  e1.to(background, {
    height: '100%',
    ease: 'power3.easeOut' });
  return e1;
};

const controller = new ScrollMagic.Controller();
const testScene = new ScrollMagic.Scene({
  triggerElement: '.test',
  triggerHook: 0,
  duration: '40%' }).

setTween(testTween('.test__background')).
addIndicators({ name: "1" });
