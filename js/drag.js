$(function () {		
    var canvas = new fabric.Canvas('canvas');
    fabric.Object.prototype.transparentCorners = false;

    canvas.setHeight(700);
    canvas.setWidth(500);

    var _mouseX, _mouseY, _json_type;

    var json_rect, json_triangle , json_circle; 

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

    $("#canvas").droppable({
        cursor: "move",
        accept: ".mozgat",
        activeClass: "snaptarget-hover",
        drop: function (event, ui) {
            console.log(ui);
            if (ui.draggable.context.lastElementChild.id == "item_1"){
                _json_type = "rect";
            }else if (ui.draggable.context.lastElementChild.id == "item_2") {
                _json_type = "triangle";
            }else if (ui.draggable.context.lastElementChild.id == "item_3") {
                _json_type = "circle";
            }else {
                console.log("error is occured.")
            }
            console.log(event.pageX + " , " + event.pageY)
            _mouseX = event.pageX - 300;
            _mouseY = event.pageY - 20;
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

            var clonedObject = null;
            var temp = null;
            if (_json_type == 'rect') {
                temp = JSON.parse(json_rect);
                clonedObject = new fabric.Rect(temp);
            } else if (_json_type == 'circle') {
                temp = JSON.parse(json_circle);
                clonedObject = new fabric.Circle(temp);
            }
            else if (_json_type == 'triangle') {
                temp = JSON.parse(json_triangle);
                clonedObject = new fabric.Triangle(temp);
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
        console.log('cloneSelected');
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
            console.log('selected object cloned');

        } else if (activeGroup) {
            console.log('group selected');

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
});