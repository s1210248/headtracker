var FizzyText = function() {
  this.object = 0;
  this.transformation = false;
  this.rotation = false;
  this.inverseRotation = false;
  this.color0 = 0xffffff; // CSS string
  this.color1 = 0x101010;// RGB array
  this.color2 = 0x2f2f2f;
  this.color3 = 0xffffff;
  // Hue, saturation, value

  // Define render logic ...
  ambientLight = new THREE.AmbientLight(this.color2);
};

window.onload = function() {
  text = new FizzyText();
  var gui = new dat.GUI();
  gui.add(text, 'object', { bunny: 0, suzanne: 1}).onChange(changePassFunc);
  gui.add(text, 'transformation').onChange(setTransVal);
  gui.add(text, 'rotation').onChange(setRotateVal);
  gui.add(text, 'inverseRotation').onChange(setInverseRotation);
  var f1 = gui.addFolder('HemisphereLight');
  f1.addColor(text, 'color0').onChange(setHemisphereVal);
  f1.addColor(text, 'color1').onChange(setHemisphereVal);
  
  var f2 = gui.addFolder('AmbientLight');
  f2.addColor(text, 'color2').onChange(setAmbientVal);
  
  var f3 = gui.addFolder('sunLight');
  f3.addColor(text, 'color3').onChange(setSunVal);
};

function setHemisphereVal() {
    g_scene.remove(hemisphereLight);
    hemisphereLight = new THREE.HemisphereLight(text.color0,text.color1 , 0.9);
    g_scene.add(hemisphereLight);
}

function setAmbientVal() {
    g_scene.remove(ambientLight);
    ambientLight = new THREE.AmbientLight(text.color2);
    g_scene.add(ambientLight);
}

function setSunVal(){
    g_scene.remove(sunLight);
    sunLight = new THREE.DirectionalLight(text.color3, 0.30);
    g_scene.add(sunLight);
}

function setTransVal(checked){
        if(checked) transFlag = true;
        else transFlag = false;
}

function setRotateVal(checked){
        if(checked) rotateFlag = true;
        else rotateFlag = false;
}

function setInverseRotation(checked){
    if(checked){
        inverseFlag = true;
    }else{
        inverseFlag = false;
    }
}

function changePassFunc(checked){
    changePass = checked;
    g_scene.remove( mesh );
    createMesh();
}