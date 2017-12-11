var mesh = null;
var pass = '';
var changePass = 0;

Mesh = function(scene) {

	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {

		console.log( item, loaded, total );

	};
	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};

	var onError = function ( xhr ) {
	};

	var loader = new THREE.OBJLoader(manager );
        loader.load( pass, function( object ) {
		mesh = object.children[0];
		var obj_geometry = mesh.geometry;
		var boundingbox = new THREE.Box3().setFromObject(object);
	//	console.log(boundingbox.min.x + ' ' + boundingbox.min.y + ' ' + boundingbox.min.z);
	//	console.log(boundingbox.max.x + ' ' + boundingbox.max.y + ' ' + boundingbox.max.z);
		var box_diagonal = getDistance(boundingbox.min.x, boundingbox.min.y, boundingbox.min.z, boundingbox.max.x, boundingbox.max.y, boundingbox.max.z);
	//	console.log(box_diagonal);
		obj_geometry.normalsNeedUpdate = true;
		obj_geometry.computeFaceNormals();
		obj_geometry.computeVertexNormals();
		obj_geometry.scale(200/box_diagonal, 200/box_diagonal, 200/box_diagonal);
	//	var helper = new THREE.BoundingBoxHelper(object, 0xff0000);
    //  helper.update();
    //  scene.add(helper);
    //  console.log(helper.box.min);
    //  console.log(helper.box.max);
		mesh.position.set(0,0,0);
		mesh.rotation.set(0,0,0);
		mesh.castShadow = true;
		mesh.receiveShadow = true;
	//	console.log(mesh.position.x);
		scene.add(mesh);
        }, onProgress, onError);
		//console.log(mesh);
}

function diff(num1, num2){
	if(num1 > num2){
		return (num1 - num2);
	}else{
		return (num2 - num1);
	}
}

function getDistance(x1, y1, z1, x2, y2, z2) {
	var diff_x = diff(x1, x2);
	var diff_y = diff(y1, y2);
	var diff_z = diff(z1, z2);
	var dist = Math.sqrt(Math.pow(diff_x, 2) + Math.pow(diff_z, 2) + Math.pow(diff_z, 2));
    return dist;
}