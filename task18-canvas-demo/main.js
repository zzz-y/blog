document.body.addEventListener('touchstart ', function (e) {
  e.preventDefault();
});
var canvas = document.getElementById('myCanvas');
var content = canvas.getContext('2d');
var lineWidth = 5;

autoSetCanvasSize(canvas);

listenToUser(canvas);

function listenToUser(canvas) {
  var using = false;
  var lastPoint = {x: undefined, y: undefined};

  // 特性检测
  if (document.body.ontouchstart !== undefined) {
    // 触屏设备
    canvas.ontouchstart = function (e) {
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
      start(x, y);
    };

    canvas.ontouchmove = function (e) {
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
      move(x, y);
    };

    canvas.ontouchend = function (e) {
      using = false;
    };
  } else {
    // 非触屏设备
    canvas.onmousedown = function (e) {
      var x = e.clientX;
      var y = e.clientY;
      start(x, y);
    };

    canvas.onmousemove = function (e) {
      var x = e.clientX;
      var y = e.clientY;
      move(x, y)
    };

    canvas.onmouseup = function (e) {
      using = false;
    };
  }

  function start(x, y) {
    using = true;
    if (eraserEnabled) {
      eraserRect(x, y, 10);
    } else {
      lastPoint = {x: x, y: y};
      drawCircle(x, y, lineWidth / 2);
    }
  }

  function move(x, y) {
    if (!using) return;

    if (eraserEnabled) {
      eraserRect(x, y, 10);
    } else {
      var newPoint = {x: x, y: y};
      drawCircle(x, y, lineWidth / 2);
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
      lastPoint = newPoint;
    }
  }

}

var eraserEnabled = false;
eraser.onclick = function () {
  eraserEnabled = true;
  eraser.classList.add('active');
  pen.classList.remove('active');
};
pen.onclick = function () {
  eraserEnabled = false;
  pen.classList.add('active');
  eraser.classList.remove('active');
};

color.onclick = function (e) {
  var list = e.target.parentNode.children;
  for (var i = 0; i < list.length; i++) {
    list[i].classList.remove('active');
  }
  e.target.classList.add('active');
  content.strokeStyle = e.target.style.backgroundColor;
  content.fillStyle = e.target.style.backgroundColor;
};

thin.onclick = function () {
  lineWidth = 5;
  thin.classList.add('active');
  thick.classList.remove('active');
};

thick.onclick = function () {
  lineWidth = 10;
  thick.classList.add('active');
  thin.classList.remove('active');
};

clear.onclick = function () {
  content.clearRect(0, 0, canvas.width, canvas.height);
};

save.onclick = function () {
  var url = canvas.toDataURL('image/png');
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = '画';
  a.target = '_blank';
  a.click();
};


function eraserRect(x, y, r) {
  content.clearRect(x - r / 2, y - r / 2, r, r);
}

function drawLine(x1, y1, x2, y2) {
  content.beginPath();
  content.moveTo(x1, y1);
  content.lineWidth = lineWidth;
  content.lineTo(x2, y2);
  content.stroke();
}

function drawCircle(x, y, r) {
  content.beginPath();
  content.arc(x, y, r, 0, Math.PI * 2);
  content.fill();
}

function autoSetCanvasSize(canvas) {
  setSize();

  window.onresize = function () {
    setSize();
  };

  function setSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;

    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}