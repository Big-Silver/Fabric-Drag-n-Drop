$(function () {		
    var canvas = new fabric.Canvas('canvas', { isDrawingMode: false });

    fabric.Object.prototype.transparentCorners = false;
    canvas.setHeight(800);
    canvas.setWidth(650);

    var _mouseX, _mouseY, _json_type;

    var json_rect, json_triangle , json_circle, json_text; 

    canvas.on('object:moving', function (e) {
        var obj = e.target;
        if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
            return;
        }        
        obj.setCoords();        
        if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
            obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
            obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
        }
        if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
            obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
            obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
        }
    });

    $(".mozgat").draggable({
        helper: "clone",
        appendTo: "body",
        revert: "invalid",
        snap: ".tapad",
        stack: ".mozgat",
        scroll: false
    });

    $("#select").click(function(){
        canvas.isDrawingMode = false;
    });
    $("#draw").click(function(){
        canvas.isDrawingMode = true;
    });
    $("#delete").click(function(){
        canvas.isDrawingMode = false;
        deleteObjects();
    });

    $("#canvas").droppable({
        cursor: "move",
        accept: ".mozgat",
        activeClass: "snaptarget-hover",
        drop: function (event, ui) {
            if (ui.draggable.context.lastElementChild.id == "item_1"){
                _json_type = "rect";
            } else if (ui.draggable.context.lastElementChild.id == "item_2") {
                _json_type = "triangle";
            } else if (ui.draggable.context.lastElementChild.id == "item_3") {
                _json_type = "circle";
            } else  if (ui.draggable.context.lastElementChild.id == "item_4") {
                _json_type = "text";
            } else {
                console.log("error is occured.")
            }
            
            var pos = $("#dragBoard");
            _mouseX = event.pageX - pos.position().left;
            _mouseY = event.pageY - pos.position().top;
            
            json_rect = '{ "angle" : 0 ,' +
                ' "fill" : "#faa" ,' +
                ' "flipX" : false ,' +
                ' "flipY" : false ,' +
                ' "hasBorders" : true ,' +
                ' "hasControls" : true ,' +
                ' "hasRotatingPoint" : true ,' +
                ' "height" : 100 ,' +
                ' "left" : ' + _mouseX + ' , ' +
                ' "opacity" : 1 ,' +
                ' "originX" : "center" ,' +
                ' "originY" : "center" ,' +
                ' "overlayFill" : null ,' +
                ' "perPixelTargetFind" : false ,' +
                ' "rx" : 0 ,' +
                ' "ry" : 0 ,' +
                ' "scaleX" : 1 ,' +
                ' "scaleY" : 1 ,' +
                ' "selectable" : true ,' +
                ' "shadow" : null ,' +
                ' "stroke" : null ,' +
                ' "strokeDashArray" : null ,' +
                ' "strokeWidth" : 1 ,' +
                ' "top" : ' + _mouseY + ' , ' +
                ' "transparentCorners" : false ,' +
                ' "type" : "rect" ,' +
                ' "visible" : true ,' +
                ' "width" : 100 }';

            json_triangle = '{ "angle" : 0 ,' +
                ' "fill" : "#ff8a1b" ,' +
                ' "flipX" : false ,' +
                ' "flipY" : false ,' +
                ' "hasBorders" : true ,' +
                ' "hasControls" : true ,' +
                ' "hasRotatingPoint" : true ,' +
                ' "height" : 190 ,' +
                ' "left" : ' + _mouseX + ' , ' +
                ' "opacity" : 1 ,' +
                ' "originX" : "center" ,' +
                ' "originY" : "center" ,' +
                ' "overlayFill" : null ,' +
                ' "perPixelTargetFind" : false ,' +
                ' "scaleX" : 1 ,' +
                ' "scaleY" : 1 ,' +
                ' "selectable" : true ,' +
                ' "shadow" : null ,' +
                ' "stroke" : "black" ,' +
                ' "strokeDashArray" : null ,' +
                ' "strokeWidth" : 1 ,' +
                ' "top" : ' + _mouseY + ' , ' +
                ' "transparentCorners" : false ,' +
                ' "type" : "triangle" ,' +
                ' "visible" : true ,' +
                ' "width" : 170 } ';

            json_circle = '{ "angle" : 0 ,' +
                ' "fill" : "#afa" ,' +
                ' "flipX" : false ,' +
                ' "flipY" : false ,' +
                ' "hasBorders" : true ,' +
                ' "hasControls" : true ,' +
                ' "hasRotatingPoint" : true ,' +
                ' "height" : 100 ,' +
                ' "left" : ' + _mouseX + ' , ' +
                ' "opacity" : 1 ,' +
                ' "originX" : "center" ,' +
                ' "originY" : "center" ,' +
                ' "overlayFill" : null ,' +
                ' "perPixelTargetFind" : false ,' +
                ' "radius" : 25 ,' +
                ' "scaleX" : 3 ,' +
                ' "scaleY" : 3 ,' +
                ' "selectable" : true ,' +
                ' "shadow" : null ,' +
                ' "stroke" : null ,' +
                ' "strokeDashArray" : null ,' +
                ' "strokeWidth" : 1 ,' +
                ' "top" : ' + _mouseY + ' , ' +
                ' "transparentCorners" : false ,' +
                ' "type" : "circle" ,' +
                ' "visible" : true ,' +
                ' "width" : 100 }';

            json_text = '{ "angle" : 0 ,' +
                ' "backgroundColor" : "" ,' +
                ' "fill" : "rgb(0,0,0)" ,' +
                ' "flipX" : false ,' +
                ' "flipY" : false ,' +
                ' "fontFamily" : "Times New Roman" ,' +
                ' "fontSize" : 40 ,' +
                ' "fontStyle" : "" ,' +
                ' "fontWeight" : "normal" ,' +
                ' "hasBorders" : true ,' +
                ' "hasControls" : true ,' +
                ' "hasRotatingPoint" : true ,' +
                ' "height" : 52 ,' +
                ' "left" : ' + _mouseX + ' , ' +
                ' "lineHeight" : 1.3 ,' +
                ' "opacity" : 1 ,' +
                ' "originX" : "center" ,' +
                ' "originY" : "center" ,' +
                ' "overlayFill" : null ,' +
                ' "path" : null ,' +
                ' "perPixelTargetFind" : false ,' +
                ' "scaleX" : 1 ,' +
                ' "scaleY" : 1 ,' +
                ' "selectable" : true ,' +
                ' "shadow" : null ,' +
                ' "stroke" : null ,' +
                ' "strokeDashArray" : null ,' +
                ' "strokeStyle" : "" ,' +
                ' "strokeWidth" : 1 ,' +
                ' "text" : "Simple Text" ,' +
                ' "textAlign" : "left" ,' +
                ' "textBackgroundColor" : "" ,' +
                ' "textDecoration" : "" ,' +
                ' "textShadow" : "" ,' +
                ' "top" : ' + _mouseY + ' , ' +
                ' "transparentCorners" : false ,' +
                ' "type" : "text" ,' +
                ' "useNative" : true ,' +
                ' "visible" : true ,' +
                ' "width" : 250 }';

            var clonedObject = null;
            var temp = null;
            if (_json_type == 'rect') {
                temp = JSON.parse(json_rect);
                clonedObject = new fabric.Rect(temp);
            } else if (_json_type == 'circle') {
                temp = JSON.parse(json_circle);
                clonedObject = new fabric.Circle(temp);
            } else if (_json_type == 'triangle') {
                temp = JSON.parse(json_triangle);
                clonedObject = new fabric.Triangle(temp);
            } else if (_json_type == "text") {
                clonedObject = new fabric.IText('Sample Text', {
                    left: _mouseX,
                    top: _mouseY
                });
            } else {
                console.log('unknown object type: ' + _json_type);
                return;
            }

            var oldLeft = clonedObject.getLeft();
            var oldTop = clonedObject.getTop();

            clonedObject.setLeft(oldLeft + 10);
            clonedObject.setTop(oldTop + 10);

            var boundingRect = clonedObject.getBoundingRect(true);
            if (boundingRect.left + boundingRect.width > canvas.getWidth()) {
                clonedObject.setLeft(oldLeft);
            }
            if (boundingRect.top + boundingRect.height > canvas.getHeight()) {
                clonedObject.setTop(oldTop);
            }

            canvas.add(clonedObject);
            canvas.setActiveObject(clonedObject);
            canvas.renderAll();

        }
    });

    $('#cloneSelected').click(function() {

        var activeObject = canvas.getActiveObject();
        var activeGroup = canvas.getActiveGroup();
        if (activeObject) {
            var clonedObject = null;
            var json = activeObject.toJSON();
            var temp = null;
            if (json.type == 'rect') {
                temp = JSON.parse(json_rect);
                clonedObject = new fabric.Rect(temp);
            } else if (json.type == 'circle') {
                temp = JSON.parse(json_circle);
                clonedObject = new fabric.Circle(temp);
            }
            else if (json.type == 'triangle') {
                temp = JSON.parse(json_triangle);
                clonedObject = new fabric.Triangle(temp);
            } else if (json.type == "text") {
                clonedObject = new fabric.Text('Sample Text', {
                    left: _mouseX,
                    top: _mouseY
                });
            } else {
                console.log('unknown object type: ' + json.type);
                return;
            }

            var oldLeft = clonedObject.getLeft();
            var oldTop = clonedObject.getTop();

            clonedObject.setLeft(oldLeft + 10);
            clonedObject.setTop(oldTop + 10);

            var boundingRect = clonedObject.getBoundingRect(true);
            if (boundingRect.left + boundingRect.width > canvas.getWidth()) {
                clonedObject.setLeft(oldLeft);
            }
            if (boundingRect.top + boundingRect.height > canvas.getHeight()) {
                clonedObject.setTop(oldTop);
            }

            canvas.add(clonedObject);
            canvas.setActiveObject(clonedObject);
            canvas.renderAll();
        } else if (activeGroup) {
            canvas.discardActiveGroup();
            var clonedObjects = [];
            activeGroup.getObjects().forEach(function (object) {

                var clonedObject = null;
                var json = object.toJSON();                
                if (json.type == 'rect') {
                    clonedObject = new fabric.Rect(json);
                } else if (json.type === 'circle') {
                    clonedObject = new fabric.Circle(json);
                } else {
                    console.log('unknown object type: ' + json.type);
                    return;
                }

                clonedObject.setCoords();
                canvas.add(clonedObject);
                clonedObject.set('active', true);
                clonedObjects.push(clonedObject);
            });

            var group = new fabric.Group(clonedObjects.reverse(), {
                canvas: canvas
            });

            group.addWithUpdate(null);

            var oldLeft = group.getLeft();
            var oldTop = group.getTop();

            group.setLeft(oldLeft + 10);
            group.setTop(oldTop + 10);

            var boundingRect = group.getBoundingRect(true);
            if (boundingRect.left + boundingRect.width > canvas.getWidth()) {
                group.setLeft(oldLeft);
            }
            if (boundingRect.top + boundingRect.height > canvas.getHeight()) {
                group.setTop(oldTop);
            }

            group.setCoords();
            canvas.setActiveGroup(group);
            group.saveCoords();
            canvas.renderAll();
        } else {
            console.log('no object selected');
        }
    });
    function deleteObjects(){
        var activeObject = canvas.getActiveObject(),
        activeGroup = canvas.getActiveGroup();
        if (activeObject) {
            if (confirm('Are you sure?')) {
                canvas.remove(activeObject);
            }
        }
        else if (activeGroup) {
            if (confirm('Are you sure?')) {
                var objectsInGroup = activeGroup.getObjects();
                canvas.discardActiveGroup();
                objectsInGroup.forEach(function(object) {
                canvas.remove(object);
                });
            }
        }
    }
    document.getElementById('textinput').addEventListener('change', function (e) {
        var obj = canvas.getActiveObject();
        if(!obj)
            return;
        obj.setText(e.target.value);
        canvas.renderAll();
    });
});
