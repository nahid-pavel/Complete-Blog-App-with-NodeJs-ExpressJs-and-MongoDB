window.onload = function() {
  console.log("got this src file");

  let baseCropping = $('#cropped-image').croppie({
    viewport: {
      width: 200,
      height: 200
    },
    boundary: {
      width: 300,
      height: 300
    },
    showZoomer: true
  });

  function readFile(file) {
    let reader = new FileReader();
    reader.onload = function(event) {
      baseCropping
        .croppie('bind', {
          url: event.target.result
        })
        .then(() => {
          $(".cr-slider").attr({
            min: 0.5,
            max: 1.5
          });
        });
    };

    reader.readAsDataURL(file);
  }

  $('#myprofilePics').on("change", function(e) {
    console.log(`find: ${this}}`);
    if (this.files[0]) {
      readFile(this.files[0]);

      $("#crop-modal").modal({
        backdrop: "static",
        keyboard: false
      });
    } else {
      console.log("not found");
    }
  });

  $("#cancel-cropping").on("click", function(e) {
    $("#crop-modal").modal("hide");
    
  });

  $("#upload-image").on("click", function(e) {
    baseCropping
      .croppie("result", "blob")
      .then(blob => {
        console.log(`blob: ${blob}`);
        let formData = new FormData();
        let fileName = document.getElementById('myprofilePics').files[0].name;
        console.log(fileName);
        let name = generateFileName(fileName);
        formData.append('profilePics', blob, name);
        console.log(formData);

        let headers = new Headers();
        headers.append("Accept", "Application/Json");

        let request = new Request('/upload/profilePics', {
          method: 'POST',
          headers,
          mode: 'cors',
          body: formData
        });

        console.log(request)

        return fetch(request);
        
      })
      .then(res => res.json())
      .then(data => {

        document.getElementById('remove-image').style.display= 'block';
        document.getElementById('profilePics').src=data.profilePics;
        document.getElementById('profilePicsForm').reset();

        $("#crop-modal").modal('hide');
       
        
        
      });
  });

  $("#remove-image").on("click", function(e) {
       let request = new Request('/upload/profilePics', {
          method: 'DELETE',
          mode: 'cors'
          
        });

       fetch(request)
         .then(res => res.json())
         .then(data => {

        document.getElementById('remove-image').style.display= 'none';
        document.getElementById('profilePics').src=data.profilePics;
        document.getElementById('profilePicsForm').reset();

        
        
      })
      .catch(e=>{
        console.log(e);
        alert('Server Error');
      })
  });


  function generateFileName(file) {
    let types = /(.jpg|.jpeg.|.png|.gif)/;
    return file.replace(types, '.png');
  }
};
