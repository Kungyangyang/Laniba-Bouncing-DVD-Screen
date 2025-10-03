const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-400, 400, 400, -400, 0.1, 1000);
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);

let dvdSize = 300; 
const geometry = new THREE.PlaneGeometry(dvdSize, dvdSize / 2);
let material = new THREE.MeshBasicMaterial({ color: getRandomColor() });
const dvdLogo = new THREE.Mesh(geometry, material);
scene.add(dvdLogo);

dvdLogo.position.set(0, 0, 0);
let velocityX = 2;
let velocityY = 2;

function getRandomColor() {
	return new THREE.Color(Math.random(), Math.random(), Math.random());
}

function animate() {
	requestAnimationFrame(animate);

	dvdLogo.position.x += velocityX;
	dvdLogo.position.y += velocityY;
	const halfWidth = dvdSize / 2;
	const halfHeight = dvdSize / 4;
  
  	//Left/Right sides
	if (dvdLogo.position.x + halfWidth > 400 || dvdLogo.position.x - halfWidth < -400) {
    	velocityX *= -1;
    	onBounce();
  	}

  	//Top/Bottom sides
  	if (dvdLogo.position.y + halfHeight > 400 || dvdLogo.position.y - halfHeight < -400) {
    	velocityY *= -1;
    	onBounce();
  	}

  	renderer.render(scene, camera);
}

function onBounce() {
  	dvdLogo.material.color = getRandomColor();
  	dvdSize /= 2.5; 
  	dvdLogo.scale.set(dvdSize / 200, dvdSize / 200, 1);
}

animate();