var FizzyText = function() {

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