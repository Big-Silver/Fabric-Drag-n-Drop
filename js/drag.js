$(function () {		
  var canvas = new fabric.Canvas('c');
  var hi = new fabric.Text('hello, world.', {
    left: canvas.getWidth() / 2,
    top: canvas.getHeight() / 2		
  });	
  canvas.add(hi);				
});