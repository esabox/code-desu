const f1 = function() {
  var canv1 = document.getElementById('canvas_id')
  var a1 = Array(20)
  function tick1() {
    var j
    var c1 = canv1.getContext('2d')
    c1.clearRect(0, 0, 400, 400)
    for (j = 0; j < 20; j++) {
      c1.beginPath()
      c1.fillStyle = 'rgb(128,255,0)'
      c1.shadowColor = 'rgb(0,0,0)'
      c1.shadowOffsetX = 3
      c1.shadowOffsetY = 3
      c1.shadowBlur = 5
      c1.rect(j * 20, a1[j], 18, 18)
      c1.fill()
      a1[j] = a1[j] - 5
      if (a1[j] < 0) {
        a1[j] = Math.floor(Math.random() * 400)
      }
    }
  }
  function draw_canvas() {
    var j
    /* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
    if (!canv1 || !canv1.getContext) {
      return false
    }
    for (j = 0; j < 20; j++) {
      a1[j] = Math.floor(Math.random() * 400)
    }
    timer = setInterval(tick1, 50)
  }
  draw_canvas()
}
const f2 = function() {
  var canv1 = document.getElementById('canvas_id')
  var a1 = Array(20)
  var b1 = Array(100)
  function tick1() {
    var j
    var c1 = canv1.getContext('2d')
    c1.clearRect(0, 0, 400, 400)
    for (j = 1; j < 20; j++) {
      c1.beginPath()
      c1.fillStyle = 'rgb(128,255,0)'
      c1.shadowColor = 'rgb(0,0,0)'
      c1.shadowOffsetX = 3
      c1.shadowOffsetY = 3
      c1.shadowBlur = 5
      c1.arc(j * 20, a1[j], 10, 0, 2 * Math.PI, false)
      c1.fill()
      a1[j] = a1[j] - Math.floor((a1[j] + 10) / 10)
      if (a1[j] < 0) {
        a1[j] = Math.floor(Math.random() * 400)
      }
    }
  }
  function draw_canvas() {
    var j
    /* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
    if (!canv1 || !canv1.getContext) {
      return false
    }
    for (j = 1; j < 20; j++) {
      a1[j] = Math.floor(Math.random() * 400)
    }
    timer = setInterval(tick1, 50)
  }
  draw_canvas()
}
const f3 = function() {
  var i = 0
  var canv1 = document.getElementById('canvas_id')

  var i = 0
  var b1 = new Array(100)
  function B1() {
    var x
    var v
  }
  var i = 0
  var j = 0
  function tick1() {
    var c1 = canv1.getContext('2d')
    c1.clearRect(0, 0, 400, 400)
    for (j = 1; j < 20; j++) {
      c1.beginPath()
      c1.fillStyle = 'rgb(128,255,0)'
      c1.shadowColor = 'rgb(0,0,0)'
      c1.shadowOffsetX = 3
      c1.shadowOffsetY = 3
      c1.shadowBlur = 5
      c1.arc(j * 20, 380 - b1[j].x, 10, 0, 2 * Math.PI, false)
      c1.fill()
      b1[j].x = b1[j].x + Math.floor((b1[j].v + 2) / 10)
      b1[j].v = b1[j].v - Math.floor((b1[j].x + 4) / (10 + j))
      if (b1[j].x < 0) {
        b1[j].x = -b1[j].x
        b1[j].v = -b1[j].v
      }
    }
    i++
    if (i > 19) {
      i = 0
    }
  }
  function draw_canvas() {
    /* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
    if (!canv1 || !canv1.getContext) {
      return false
    }
    for (j = 1; j < 20; j++) {
      b1[j] = new B1()
      b1[j].x = Math.floor(Math.random() * 400)
      b1[j].v = 0
    }
    timer = setInterval(tick1, 50)
  }
  draw_canvas()
}

const exeFn_ClearTimer = function() {
  let self = exeFn_ClearTimer
  self.i = self.i || 0
  console.log(timer)
  clearInterval(timer)
  funcArr[self.i]()

  self.i = self.i + 1
  if (self.i == funcArr.length) self.i = 0
}

//メイン処理
let el = document.createElement('canvas')
el.id = 'canvas_id'
el.width = 400
el.height = 400
document.body.appendChild(el)

let timer
const funcArr = [f1, f2, f3]

window.onload = function() {
  document.addEventListener('click', function() {
    exeFn_ClearTimer()
  })
}
let i = 100, j = 200
console.log(`j=${j} < i=${i}`)
let $someVariable
  , _someVariable
  //,1Variable
  , some_variable
  , functions
  , someVariable
   // , some * Variable
