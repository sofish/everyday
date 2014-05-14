(function() {

  function $(str) {
    return str.match(/^#/) ? document.querySelector(str) : document.querySelectorAll(str);
  }

  var file = $('[name=file]')[0]
    , token = file.dataset.token
    , url = 'http://up.qiniu.com/';

  file.addEventListener('change', function(e) {
    var files = Recorder.read(input);
    79
    80       files.forEach(function(file) {
      81           var reader = new FileReader();
      82
      83           reader.onload = function(e) {
        84               var li = document.createElement('li')
        85               li.innerHTML = '<img src="' + e.target.result + '" />';
        86               imgs.appendChild(li);
        87           }
      88
      89           reader.readAsDataURL(file);
      90
      91           Recorder.upload('/test/image.php', {
        92               name: 'sofish',
        93               file: file
      94           }, function(data) {
      95               console.log(data);
      96           });
    97       });
  });


})()