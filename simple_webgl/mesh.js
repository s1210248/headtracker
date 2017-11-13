var mesh = null;

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

	loader.load( 'simple_webgl/data/bunny.obj', function( object ) {
		mesh = object.children[0];
		var obj_geometry = mesh.geometry;
		obj_geometry.normalsNeedUpdate = true;
		obj_geometry.computeFaceNormals();
		obj_geometry.computeVertexNormals();
		obj_geometry.scale(700,700,700);
		mesh.position.set(0,0,0);
		mesh.rotation.set(0,0,0);
		mesh.castShadow = true;
		mesh.receiveShadow = true;
	//	console.log(mesh.position.x);
		scene.add(mesh);
        }, onProgress, onError);
		//console.log(mesh);
}


