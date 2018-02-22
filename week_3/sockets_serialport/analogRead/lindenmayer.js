var Lindenmayer = (function() {

    var ANTICLOCK = '+';
    var CLOCKWISE = '-';
    var PUSH = '[';
    var POP = ']';
    var DRAW = 'F';
    var RAD = Math.PI / 180;
    var angley;
    var incre=0;


    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    function Pen(x, y, d, c) {
        this.x = x;
        this.y = y;
        this.angle = d;
        this.color = c || 'rgb(0,0,0)';
    }

    function LSystem(conf) {

        var _tree = conf.seed;

        var _angle = conf.angle;
        var _rules = conf.rules;
        var _constants = conf.constants || [DRAW];

        var _canvas = conf.canvas;
        var _context = conf.canvas.getContext('2d');

        var _width = conf.width || _canvas.width;
        var _height = conf.height || _canvas.height;



        var _boundingBox = {
            minX: 0,
            minY: 0,
            maxX: _width,
            maxY: _height
        };

        var _pen;
        var _originX = conf.x || 0;
        var _originY = conf.y || 0;
        var _initialAngle = conf.initialAngle || 0;
        var _color = conf.color;

        // Private

        var process = function(dist, draw) {

            var penStack = [];

            for (var i = 0; i < _tree.length; i++) {
                switch (_tree.charAt(i)) {
                    case ANTICLOCK:
                        _pen.angle += _angle;
                        break;
                    case CLOCKWISE:
                        _pen.angle -= _angle;
                        break;
                    case PUSH:
                        penStack.push(new Pen(_pen.x, _pen.y, _pen.angle, _pen.color));
                        break;
                    case POP:
                        _pen = penStack.pop();
                        break;
                    default:
                        drawForward(dist, draw);
                        break;
                }
            }
        };

        var drawForward = function(dist, draw) {
            var lastX = _pen.x;
            var lastY = _pen.y;
            var angle = _pen.angle * Math.cos(0.0005*incre);

            _pen.x += dist * Math.cos(angle);
            _pen.y += dist * Math.sin(angle);

            if (draw) {
                _context.beginPath();
                _context.moveTo(lastX, lastY);
                _context.lineTo(_pen.x, _pen.y);
                _context.strokeStyle = _pen.color;
                _context.closePath();
                _context.stroke();
            } else {
                if (_pen.x < _boundingBox.minX) {
                    _boundingBox.minX = _pen.x;
                } else if (_pen.x > _boundingBox.maxX) {
                    _boundingBox.maxX = _pen.x;
                }

                if (_pen.y < _boundingBox.minY) {
                    _boundingBox.minY = _pen.y;
                } else if (_pen.y > _boundingBox.maxY) {
                    _boundingBox.maxY = _pen.y;
                }
            }
        };

        var calculateDistance = function(oldDistance) {
            var newDistX = (_width / (_boundingBox.maxX - _boundingBox.minX)) * oldDistance;
            var newDistY = (_height / (_boundingBox.maxY - _boundingBox.minY)) * oldDistance;

            return newDistX < newDistY ? newDistX : newDistY;
        };

        var calculateOffset = function(newDist, oldDist) {
            _boundingBox.minX *= (newDist / oldDist);
            _boundingBox.maxX *= (newDist / oldDist);
            _boundingBox.minY *= (newDist / oldDist);
            _boundingBox.maxY *= (newDist / oldDist);

            return {
                x: (_width / 2) - (((_boundingBox.maxX - _boundingBox.minX) / 2) + _boundingBox.minX),
                y: (_height / 2) - (((_boundingBox.maxY - _boundingBox.minY) / 2) + _boundingBox.minY)
            };
        };

        var recurse = function(){
}

        // Public

        this.getTree = function() {
            return _tree;
        };

        this.addConstants = function(c) {
            _constants = _constants.concat(c);
        };

        this.iterate = function(iterations) {

            var node;
            var it = iterations || 1;

            for (var i = 0; i < it; i++) {
                var newTree = '';
                for (var j = 0; j < _tree.length; j++) {
                    node = _tree.charAt(j);
                    newTree += _rules[node] || node;
                }
                _tree = newTree;
            }

            return _tree;
        };

        this.render = function() {

            _context.clearRect(0, 0, _canvas.width, _canvas.height);

           
            // Cleanup unused commands in tree
            var reg = new RegExp('[^' + _constants.join('') + '\\+\\-\\[\\]]', 'g');
            _tree = _tree.replace(reg, '');

            // First Pass
            var defaultDist = Math.max(_width, _height);
            _pen = new Pen(0, 0, _initialAngle, _color);
            process(defaultDist, false);

            // Second Pass
            var newDist = calculateDistance(defaultDist);
            var offset = calculateOffset(newDist, defaultDist);
            _pen = new Pen(_originX + offset.x, _originY + offset.y, _initialAngle, _color);
            process(newDist, true);
            //_initialAngle += 1;
            incre+=1;
            requestAnimationFrame(this.render.bind(this));

        };


    }



    var createLSystem = function(conf) {
        return new LSystem(conf);
    };

    return {
        createLSystem: createLSystem
    };

})();