var wma = [0,0];
var mesh_rot_y = 0;
var mesh_rot_x = 0;
var xt;
var yt;
function FaceDetector(video_name) {
    var MAX_SIZE = 300;

    var canvas;
    var ctx;
    var jsfeat_buffer;

    var video = document.getElementById(video_name);
    video.addEventListener('loadeddata', function() {
	init(video.width, video.height);
	window.requestAnimationFrame(process);
    });

    var constraints = {video: true};
    window.navigator.mediaDevices.getUserMedia(constraints)
	.then(function(media_stream) {
	    video.srcObject = media_stream;
	    video.play();
	})
	.catch(function(err) { console.log(err.name + ": " + err.message); });


    function init(width, height) {
	var s = Math.min(MAX_SIZE/width, MAX_SIZE/height);
	var w = width * s;
	var h = height * s;
	
	jsfeat_buffer = new jsfeat.matrix_t(w, h, jsfeat.U8_t | jsfeat.C1_t);
	canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
	canvas.width = w;
	canvas.height = h;
	canvas.id = "can";
	console.log(canvas.id);
	ctx = canvas.getContext('2d');
	
	jsfeat.bbf.prepare_cascade(jsfeat.bbf.face_cascade);
    }


    function process() {
	window.requestAnimationFrame(process);
	
	if (video.readyState !== video.HAVE_ENOUGH_DATA) return;
	
	ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
	var img_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
	
	jsfeat.imgproc.grayscale(img_data.data, canvas.width, canvas.height, jsfeat_buffer);
	var pyramid = jsfeat.bbf.build_pyramid(jsfeat_buffer, 24*1, 24*1, 1);
	var face_rects = jsfeat.bbf.detect(pyramid, jsfeat.bbf.face_cascade);
	face_rects = jsfeat.bbf.group_rectangles(face_rects, 1);
	
	jsfeat.math.qsort(face_rects, 0, face_rects.length-1, function(a,b) { 
	    return (b.confidence < a.confidence);
	});
	
	xt = (Math.PI/2)/(canvas.width/8);
	yt = (Math.PI/2)/(canvas.height/8);
	if (face_rects.length > 0) {
	    var r = face_rects[face_rects.length-1];
	    var s = canvas.width / jsfeat_buffer.cols;
        ctx.strokeStyle = "#00ff00";
	    ctx.strokeRect(r.x*s, r.y*s, r.width*s, r.height*s);
	    //centroid of face
	    var center = [(r.x*s + r.x*s + r.width*s)/2, (r.y*s + r.y*s + r.height*s)/2];
	    wma = smoother(center, 50);
	    wma[0] -= (canvas.width/2);
	    wma[1] -= (canvas.height/2);
	    mesh_rot_y = (wma[0] * xt);
	    mesh_rot_x = (wma[1] * yt);
	    console.log(mesh_rot_y);
	    wma[0] *= (window.innerWidth / (canvas.width/2));
	    wma[1] *= (window.innerHeight / (canvas.height/2));
      }
    }   
}
