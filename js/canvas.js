function showCanvas()
{
  var canvas = document.getElementById('scene');
  var ctx = canvas.getContext('2d');

  var img = new Image();

  img.onload = function(){
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  ctx.drawImage(img, 0, 0);
  }

  img.src = 'src/img/Scene.png';  
}
