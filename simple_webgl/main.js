var g_scene;
var g_controls;
var g_camera, g_scene, g_renderer;
var g_mesh;
var floor
var transFlag = false;
var rotateFlag = false;
var inverseFlag = false;
var countTrans = 0;
var countRotate = 0;
var hemisphereLight;
var ambientLight;
var sunLight;

function init() {
    g_scene = new THREE.Scene();
    var container = document.getElementById('drawingArea');

    var height = window.innerHeight;
    var width = window.innerWidth;
    g_camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    g_scene.add(g_camera);

    g_renderer = new THREE.WebGLRenderer({
	alpha : true,
	antialias : true
    });
    g_renderer.shadowMap.enabled = true;
    g_renderer.setClearColor(0xbbd7e9, 1);
    container.appendChild(g_renderer.domElement);

    g_controls = new THREE.OrbitControls(g_camera, g_renderer.domElement);
    g_controls.enableDamping = true;
    g_controls.dampingFactor = 0.25;
    g_controls.enableZoom = true;
    g_camera.position.set(g_camera.position.x, g_camera.position.y + 100, g_camera.position.z + 600);

    var resizeCallback = function() {
	var panelWidth = window.innerWidth;
	var panelHeight = window.innerHeight;

	var devicePixelRatio = window.devicePixelRatio || 1;
	g_renderer.setSize(panelWidth * devicePixelRatio, panelHeight * devicePixelRatio);
	g_renderer.domElement.style.width = panelWidth + 'px';
	g_renderer.domElement.style.height = panelHeight + 'px';
	g_camera.aspect = panelWidth / panelHeight;
	g_camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', resizeCallback, false);
    resizeCallback();

    createLights();
    createFloor();
    createMesh();
}


function createLights() {
    hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x101010, 0.9)
    g_scene.add(hemisphereLight);

    ambientLight = new THREE.AmbientLight(0x2f2f2f)
    g_scene.add(ambientLight);

    sunLight = new THREE.DirectionalLight(0xffffff, 0.30);
    sunLight.position.set(300, 600, 500);
    sunLight.castShadow = true;
    sunLight.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera());
    g_scene.add(sunLight);
}


function createFloor() {
    var groundMaterial = new THREE.MeshPhongMaterial({
	shininess : 80,
	color : 0xd3d3d3,
	specular : 0xd3d3d3
    });

    floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(6000, 3000), groundMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -45;
    floor.receiveShadow = true;
    g_scene.add(floor);

}


function createMesh() {
  if(changePass == '0'){
    pass = 'simple_webgl/data/bunny.obj';
  }
  if(changePass == '1'){
    pass = 'simple_webgl/data/suzanne.obj';
  }
  g_mesh = new Mesh(g_scene);
}


// rescale the value v from the interval [v1min, v1max]
// to the interval [v2min, v2max]
function rescale(v, v1min, v1max, v2min, v2max) {
        var val = Math.max(Math.min(v, v1max), v1min);
        var dv1 = v1max - v1min;
        var t = (val - v1min) / dv1;
        var dv2 = v2max - v2min;
        return v2min + t*dv2;
}


function animate() {
    g_controls.update();
    // Render scene
   if(mesh){
       if(transFlag == true){
           //console.log(wma[0]);
	       var mesh_trans_x = rescale(wma[0], 100, 250, -300, 300);
           var mesh_trans_y = rescale(-wma[1], -220, -75, -300, 300);

           mesh.position.x += (mesh_trans_x - mesh.position.x);
           mesh.position.y += (mesh_trans_y - mesh.position.y);
       }
       if(rotateFlag == true && inverseFlag == false){
           var mesh_rot_y = rescale(wma[0], 100, 250, -Math.PI/2, Math.PI/2);
           var mesh_rot_x = rescale(wma[1], 50, 150, -Math.PI/2, Math.PI/2);

	   mesh.rotation.y += (mesh_rot_y - mesh.rotation.y);
	   mesh.rotation.x += (mesh_rot_x - mesh.rotation.x);
       }
       if(rotateFlag == true && inverseFlag == true){
           var mesh_rot_y = rescale(-wma[0], -250, -100, -Math.PI/2, Math.PI/2);
           var mesh_rot_x = rescale(wma[1], 50, 150, -Math.PI/2, Math.PI/2);

	   mesh.rotation.y += (mesh_rot_y - mesh.rotation.y);
	   mesh.rotation.x += (mesh_rot_x - mesh.rotation.x);
       }
       //  console.log(mesh.rotation.y);
    }
    requestAnimationFrame(animate);//usagi
    g_renderer.render(g_scene, g_camera);
}

function changeTransValue(){
    if(document.getElementById("ct").checked){
    transFlag = true;
    rotateFlag = false;
    }
}

function changeRotateValue(){
    if(document.getElementById("cr").checked){
    rotateFlag = true;
    transFlag = false;
    }
}
function changePassFunc(){
    var pullSellect = document.getElementById('so').selectedIndex;
    changePass = document.getElementById('so').options[pullSellect].value;
    g_scene.remove( mesh );
    createMesh();
}

function inverseRotation(){
    if(document.getElementById("op").checked){
        inverseFlag = true;
    }else{
        inverseFlag = false;
    }
}