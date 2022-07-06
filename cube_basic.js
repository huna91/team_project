import * as THREE from './three.module_cube.js'; // three.module.js 파일을 모듈 버전으로 불러옴

class App {
    // constructor() {
    //     const divContainer = document.querySelector("#app_bg_cube");
    //     this._divContainer = divContainer;

    //     const renderer = new THREE.WebGLRenderer({ antialias: true });
    //     renderer.setPixelRatio(window.devicePixelRatio);
    //     divContainer.appendChild(renderer.domElement);
    //     this._renderer = renderer;

    //     const scene = new THREE.Scene();
    //     this._scene = scene;

    //     this._setupCamera();
    //     this._setupLight();
    //     this._setupModel();

    //     window.onresize = this.resize.bind(this);
    //     this.resize();

    //     requestAnimationFrame(this.render.bind(this));
    // }

    // _setupCamera() {
    //     const width = this._divContainer.clientWidth;
    //     const height = this._divContainer.clientHeight;
    //     const camera = new THREE.PerspectiveCamera(
    //         75,
    //         width / height,
    //         0.1,
    //         100
    //     );
    //     camera.position.z = 2;
    //     this._camera = camera;
    // }

    // _setupLight() {
    //     const color = 0xffffff;  //광원의 색상
    //     const intensity = 1;  //광원의 세기
    //     const light = new THREE.DirectionalLight(color, intensity);  //색상과 세기로 광원 생성
    //     light.position.set(-1, 2, 4); //광원의 위치
    //     this._scene.add(light);
    // }

    // _setupModel() {
    //     const geometry = new THREE.BoxGeometry(1, 1, 1);  //box크기 설정
    //     const material = new THREE.MeshPhongMaterial({color: 0x44a88});  //box 색상설정

    //     const cube = new THREE.Mesh(geometry, material);

    //     this._scene.add(cube);
    //     this._cube = cube;
    // }

    // resize() {
    //     const width = this._divContainer.clientWidth;
    //     const height = this._divContainer.clientHeight;

    //     this._camera.aspect = width / height;
    //     this._camera.updateProjectionMatrix();

    //     this._renderer.setSize(width, height);
    // }

    // render(time) {
    //     this._renderer.render(this._scene, this._camera);
    //     this.update(time);
    //     requestAnimationFrame(this.render.bind(this));
    // }

    // update(time) {
    //     time *= 0.001;
    //     this._cube.rotation.x = time;
    //     this._cube.rotation.y = time;
    // }


    constructor(){
        /*divContainer*/
        const divContainer = document.querySelector("#app_bg_cube");
        this._divContainer = divContainer;/*다른 method에서 참조할 수 있도록 필드로 정의*/ //밑줄로 시작:이 App 클래스 내부에서만 사용되는 private field, private method라는 의미(개발자들간의 약속-밑줄로 시작하는 것은 외부에서 호출해서는 안됨)
  
        /*rederer*/ //THREE = three.js WebGLRenderer = three.js의 클래스 중 하나
        const renderer = new THREE.WebGLRenderer({ antialias: true });//생성할 때 옵션 - 3차원 장면이 렌더링 될 때 오브젝트들의 경계선이 계단 현상 없이 부드럽게 표현
        renderer.setPixelRatio(window.devicePixelRatio);//픽셀의 ratio 값 정의(pixel ratio 값은 window의 devicePixelRatio 속성으로 쉽게 얻을 수 있음) 150%일때 1.5 등
        divContainer.appendChild(renderer.domElement);//생성된 renderer의 domElement를 webjl-container인 divContainer의 자식으로 추가 renderer.domElement : canvas 타입의 dom 객체
        this._renderer = renderer;//rederer가 다른 method에서 참조할 수 있도록 this._renderer로 정의
  
        /*scene*/
        const scene = new THREE.Scene();//Scene 객체 생성하는 코드 Scene 클래스 불러옴
        this._scene = scene;//scene객체 필드화
  
  
        /*하위 3개 코드 따로 정의해야하는 것임*/
        this._setupCamera();//camera 객체 구성
        this._setupLight();//light를 설정하는 메서드
        this._setupModel();//3차원 모델 설정하는 메서드
  
        window.onresize = this.resize.bind(this);//창 크기가 변경되면 발생하는 onresize 이벤트에 이 클래스의 resize method 지정 : renderer나 camera는 창 크기 변경될 때마다 그 크기에 맞게 속성 값 재설정해야하기 때문에 필요 //bind : resize method 안에서 this가 가르치는 객체가 아닌 이 App 클래스의 객체가 되도록 하기 위함
        this.resize();//창 크기에 맞게 설정
  
        requestAnimationFrame(this.render.bind(this));//적당한 시점에 또한 최대한 빠르게 renderer method를 호출
    }
    
    _setupCamera(){/*Camera 생성하는 코드*/
        /*three.js가 3차원 그래픽 출력할 영역에 대한 가로와 세로에 대한 크기 얻어옴 */
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        /*얻어온 크기를 이용해 카메라 객체 생성*/
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.4,
            1000
        );
        camera.position.z = 15;
        this._camera = camera;//또 다른 method에서 사용할 수 있도록 함
    }
  
    _setupLight(){/*Light(광원) 생성하는 코드*/
        const color = 0xffffff;//광원 색상
        const intensity = 1;//광원 세기 값
        const light = new THREE.DirectionalLight(color,intensity);//위 두가지 값으로 광원 생성
        light.position.set(-1,2,4);//광원 위치 설정
        this._scene.add(light); //생성한 광원을 scene 객체의 구성요소로 추가
    }
  
    _setupModel(){
        //Object3D 타입의 SolarSystem 객체 생성 후 scene에 추가
       const solarSystem = new THREE.Object3D();
       this._scene.add(solarSystem);
  
       //구 모양의 지오메트리 생성
       const radius = 1; //반지름 1
       const widthSegments = 12;
       const heightSegments = 12;
       const sphereGeometry = new THREE.SphereGeometry(radius,widthSegments,heightSegments);
  
       //태양의 재질 생성
       const sunMaterial = new THREE.MeshPhongMaterial({
        emissive : 0xff0000, flatShading: true});
        
       //지오메트리와 태양의 재질을 이용해 sunMesh 객체 생성, solarSystem에 추가
        const sunMesh = new THREE.Mesh(sphereGeometry,sunMaterial);
        sunMesh.scale.set(4,4,4);//원래 지오메트리가 갖는 크기보다 xyz축에 대해 3배의 크기로 표시하기 위함
        solarSystem.add(sunMesh);
  
        /*지구*/
        const earthOrbit = new THREE.Object3D();
        solarSystem.add(earthOrbit);
  
        const earthMaterial = new THREE.MeshPhongMaterial({
            color:0x0078f2, emissive:0x112244, flatShading:true
        });
  
        const earthMesh = new THREE.Mesh(sphereGeometry,earthMaterial);
        earthOrbit.position.x = 10;//태양에서 x축으로 거리 10만큼 떨어진 위치에 지구가 배치 되도록 하기 위함
        earthOrbit.add(earthMesh);
  
        /*달*/
        const moonOrbit = new THREE.Object3D();
        moonOrbit.position.x = 2;//지구로부터 2만큼 떨어지고 태양으로부터 12만큼 떨어짐
        earthOrbit.add(moonOrbit);
  
        const moonMaterial = new THREE.MeshPhongMaterial({
            color:0xf7e600, emissive:0x222222, flatShading:true });
        
            const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
            moonMesh.scale.set(0.5,0.5,0.5);
            moonOrbit.add(moonMesh);
  
            this._solarSystem = solarSystem;
            this._earthOrbit = earthOrbit;
            this._moonOrbit = moonOrbit;
        }
  
    resize(){
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
  
        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
  
        this._renderer.setSize(width, height);
    }
  
    render(time){//time:렌더링 시작 후 경과된 시간 값(밀리 초) - scene의 애니메이션에 이용할 수 있음. requestAnimationFrame 함수가 render 함수에 전달해주는 값.
        this._renderer.render(this._scene, this._camera);//renderer가 scene을 카메라 시점으로 렌더링 하는 코드
        this.update(time);//속성 값 변경 : 애니메이션 효과 
        requestAnimationFrame(this.render.bind(this)); //render method 반복해 호출 되도록 함(무조건은 아니고 적당한 시점에 최대한 빠르게)
    }
  
    update(time){
        time *= 0.001; // second unit:전달받은 time에 0.001을 곱해서 second 단위로 변환
        this._solarSystem.rotation.y = time / 2;
        this._earthOrbit.rotation.y = time * 2;
        this._moonOrbit.rotation.y = time *5;
    }
    
}//class
const curve = new THREE.CubicBezierCurve(
	new THREE.Vector2( -10, 0 ),
	new THREE.Vector2( -5, 15 ),
	new THREE.Vector2( 20, 15 ),
	new THREE.Vector2( 10, 0 )
);

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );

window.onload = function() {
    new App();
}