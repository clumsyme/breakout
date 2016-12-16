// JavaScript By (c) LiYan

const OPACITY = 0.3
var level = 8

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var scoretag = document.getElementById('score')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.onresize = function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

// 定义点
class Point {
    constructor(x, y, vx, vy, r) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.r = r
        this.color = 'rgba(' + Math.floor(255 * Math.random()) + ',' + Math.floor(255 * Math.random())
            + ',' + Math.floor(255 * Math.random()) + ',' + (OPACITY + Math.random()) + ')'
        this.mass = Math.PI * this.r * this.r
    }
    // 绘制
    draw() {
        context.beginPath()
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true)
        context.closePath()
        context.fillStyle = this.color
        context.fill()
    }
    // 移动
    move() {
        this.x += this.vx
        this.y += this.vy

        // 防止点在边缘循环
        if (this.x < this.r) {
            this.x = this.r
            this.vx = -this.vx
        }
        if (this.x + this.r > canvas.width) {
            this.x = canvas.width - this.r
            this.vx = -this.vx
        }
        if (this.y - this.r < 0) {
            this.y = this.r
            this.vy = -this.vy
        }
        if (this.y> canvas.height) {
            this.gone = true
        }
    }
    // 判断下一步会否碰撞
    willTouch(another) {
        let dx = this.x+this.vx - another.x-another.vx,
            dy = this.y+this.vy - another.y-another.vy
        return Math.sqrt(dx * dx + dy * dy) <= (this.r + another.r)
    }
    // 处理碰撞
    touch(another) {
        let angle = Math.atan((this.y - another.y) / (this.x - another.x))
        this.speedx = this.vx * Math.cos(angle) + this.vy * Math.sin(angle)
        this.speedy = -this.vx * Math.sin(angle) + this.vy * Math.cos(angle)
        this.speedx2 = -this.speedx
        this.vx = this.speedx2 * Math.cos(angle) - this.speedy * Math.sin(angle)
        this.vy = this.speedx2 * Math.sin(angle) + this.speedy * Math.cos(angle)
        if (another !== qiupai) {
            bricks.splice(bricks.indexOf(another), 1)
            score += thisscore
            thisscore += 1
            console.log(score)
            scoretag.innerHTML = score
        } else {
            point.vx *= 1.01
            point.vy *= 1.01
            thisscore = 1
        }
    }
}

function getBricks() {
    var screenwidth = window.innerWidth,
        screenHeight = window.innerHeight,
        width = screenwidth / 15,
        rows = Math.floor(screenHeight / width / 2)
        bricks = []
    for (let i = 0; i < rows; i++) {
        for (let j = 3; j < 12; j++) {
            bricks.push(new Point((j + 0.5) * width, (i + 0.5) * width, 0, 0, width/2))
        }
    }
    return bricks
}

var bricks = getBricks(),
point = new Point(canvas.width / 2, canvas.height - 100, 5, -5, 10)
point.color = 'black'
var qiupai = new Point(canvas.width / 2, canvas.height + 100, 0, 0, level*20)
qiupai.color = 'black'
var score = 0,
    thisscore = 1
window.onmousemove = function(e) {
    qiupai.x = e.screenX
}
window.onkeydown = function(e) {
    if (e.which == 37) {
        qiupai.x -= 100
    } else if (e.which == 39) {
        qiupai.x += 100
    }
}

function play() {
    if (point.gone) {
        if (confirm("Game over! Play Again?")) {
            point = new Point(canvas.width / 2, canvas.height - 100, 5, -5, 10)
            point.color = 'black'
            bricks = getBricks()
            score = 0
        } else {
            return
        }       
    }
    if (bricks.length == 0) {
        if (confirm("You Got " + score + " Points! Play Again?")) {
            point = new Point(canvas.width / 2, canvas.height - 100, 5, -5, 10)
            point.color = 'black'
            bricks = getBricks()
            score = 0
        } else {
            return
        }   
    }
    context.clearRect(0, 0, canvas.width, canvas.height)
    point.draw()
    point.move()
    qiupai.draw()
    if (point.willTouch(qiupai)) {
            point.touch(qiupai)
        }
    for (let brick of this.bricks) {
        if (point.willTouch(brick)) {
            point.touch(brick)
        }
    }
    for (let brick of this.bricks) {
        brick.draw()
    }
    window.requestAnimationFrame(play)
}

window.requestAnimationFrame(play)