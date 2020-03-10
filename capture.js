(function() {

    var width = 720; // We will scale the photo width to this
    var height = 0; // This will be computed based on the input stream


    var streaming = false;


    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;
    var download = null;
    var controller = null;
    var backbutton = null;
    var sedan_overlay = null;
    var van_overlay = null;
    var car_front_overlay = null;
    var sedanButton = null;
    var vanButton = null;
    var carFrontButton = null;

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');
        backbutton = document.getElementById('backbutton');
        sedan_overlay = document.getElementById('sedan_overlay');
        van_overlay = document.getElementById('van_overlay');
        car_front_overlay = document.getElementById('car_front_overlay');
        // download = document.getElementById('picDown');

        controller = document.getElementById('controller');
        sedanButton = document.getElementById('sedanButton');
        vanButton = document.getElementById('vanButton');
        carFrontButton = document.getElementById('sedanFrontButton');

        // visibility

        controller.style.display = 'grid';

        van_overlay.style.display = 'none';
        sedan_overlay.style.display = 'none';
        car_front_overlay.style.display = 'none';
        video.style.display = 'none';
        startbutton.style.display = 'none';

        photo.style.display = 'none';
        backbutton.style.display = 'none';



        video.addEventListener('canplay', function(ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);


                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        backbutton.addEventListener('click', function(v) {

            controller.style.display = 'grid';

            van_overlay.style.display = 'none';
            sedan_overlay.style.display = 'none';
            car_front_overlay.style.display = 'none';
            video.style.display = 'none';
            startbutton.style.display = 'none';

            photo.style.display = 'none';
            backbutton.style.display = 'none';
            v.preventDefault();
        }, false);

        startbutton.addEventListener('click', function(ev) {
            takepicture();
            ev.preventDefault();
        }, false);

        sedanButton.addEventListener('click', function(ev) {
            overlayControl("sedan");
            ev.preventDefault();
        }, false);

        vanButton.addEventListener('click', function(ev) {
            overlayControl("van");
            ev.preventDefault();
        }, false);

        carFrontButton.addEventListener('click', function(ev) {
            overlayControl("car-front");
            ev.preventDefault();
        }, false);

        clearphoto();
    }



    function overlayControl(typeVeh) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } }, audio: false })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function(err) {
                console.log("An error occurred: " + err);
            });

        controller.style.display = 'none';

        if (typeVeh == "sedan") {
            sedan_overlay.style.display = 'block';
        } else if (typeVeh == "van") {
            van_overlay.style.display = 'block';
        } else if (typeVeh == "car-front") {
            car_front_overlay.style.display = 'block';
        }
        video.style.display = 'block';
        startbutton.style.display = 'block';

        photo.style.display = 'none';
        backbutton.style.display = 'none';
    }

    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }


    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);

            van_overlay.style.display = 'none';
            sedan_overlay.style.display = 'none';
            car_front_overlay.style.display = 'none';
            video.style.display = 'none';
            startbutton.style.display = 'none';

            photo.style.display = 'block';
            backbutton.style.display = 'block';
        } else {
            clearphoto();
        }
    }

    window.addEventListener('load', startup, false);
})();