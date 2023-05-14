const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const playerSpeed = 5
const playerJump = -20

class Sprite  {
       constructor({position, velocity, color, offset}){
              this.position = position 
              this.velocity = velocity
              this.width = 50
              this.height = 150
              this.lastKey
              this.attackBox = {
                     position: {
                            x: this.position.x,
                            y: this.position.y
                     } ,
                     offset,
                     width: 100,
                     height: 50
              }
              this.color = color
              this.isAttacking
              this.health = 100
       }

       draw() {
              c.fillStyle = this.color
              c.fillRect(this.position.x, this.position.y, this.width, this.height)

              //attack boxes
              if ( this.isAttacking){
                     c.fillStyle = 'green'
                     c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width , this.attackBox.height)
              }
       }

       update(){
              this.draw();
              this.attackBox.position.x = this.position.x + this.attackBox.offset.x
              this.attackBox.position.y = this.position.y

              this.position.x += this.velocity.x
              this.position.y += this.velocity.y

              if ( this.position.y + this.height + this.velocity.y >= canvas.height ){
                     this.velocity.y = 0
              }else this.velocity.y += gravity
       }

       attack(){
              this.isAttacking = true
              setTimeout(() => {
                    this.isAttacking = false
              }, 100);
       }

}

const player = new Sprite({
       position:{
              x: 0,
              y: 0
       },
       velocity:{
              x: 0,
              y: 10
       },
       color: 'red',
       offset:{
              x: 0,
              y: 0
       }
})

const enemy = new Sprite({
       position:{
              x: 400,
              y: 150
       },
       velocity: {
              x: 0,
              y: 10
       },
       color: 'blue',
       offset:{
              x: -50,
              y: 0
       }
})

console.log(player)

const keys = {
       d:{
              pressed: false,
       },
       q:{
              pressed: false,
       },
       s:{
              pressed: false,
       },
       ArrowRight:{
              pressed: false,
       },
       ArrowLeft: {
              pressed: false,
       }

}

function rectangleCollision({ rectangle1, rectangle2 }) {
       return(
              rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
              rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
              rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
              rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height 
       )
}

let timer = 10
function decreaseTimer(){
       setTimeout(decreaseTimer, 1000)
       if ( timer > 0) {
              timer --
              document.querySelector('#timer').innerHTML = timer
       }

       if ( timer == 0 ) {
              if ( player.health === enemy.health){
                     document.querySelector('#displayText').innerHTML = 'Egalite'
                     document.querySelector('#displayText').style.display = 'flex'
              }
       }
}

decreaseTimer()

function animate() {
       window.requestAnimationFrame(animate)
       c.fillStyle = 'black'
       c.fillRect(0,0, canvas.width, canvas.height)
       player.update()
       enemy.update()

       //player movement
       player.velocity.x = 0
       if (keys.d.pressed && player.lastKey === 'd') {
              player.velocity.x = playerSpeed
       }else if (keys.q.pressed && player.lastKey === 'q') {
              player.velocity.x = -playerSpeed
       }

       //enemy movement
       enemy.velocity.x = 0
       if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
              enemy.velocity.x = playerSpeed
       }else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
              enemy.velocity.x = -playerSpeed
       }

       //colision
       if (rectangleCollision({ rectangle1: player, rectangle2: enemy }) && player.isAttacking) {
              player.isAttacking = false 
              enemy.health -= 20
              document.querySelector('#enemyHealth').style.width = enemy.health + '%'
       }

       if (rectangleCollision({ rectangle1: enemy, rectangle2: player }) && enemy.isAttacking) {
              enemy.isAttacking = false 
              player.health -= 20
              document.querySelector('#playerHealth').style.width = player.health + '%'
       }

}

animate()

window.addEventListener('keydown', (event) => {
       switch (event.key){

              //player 

              case 'd':
                     keys.d.pressed = true
                     player.lastKey = 'd'
                     break
              case 'q':
                     keys.q.pressed = true
                     player.lastKey = 'q'
                     break
              case 's':
                     player.velocity.y = playerJump
                     break
              case ' ':
                     player.attack()
                     break

              //enemy

              case 'ArrowRight':
                     keys.ArrowRight.pressed = true
                     enemy.lastKey = 'ArrowRight'
                     break
              case 'ArrowLeft':
                     keys.ArrowLeft.pressed = true
                     enemy.lastKey = 'ArrowLeft'
                     break
              case 'ArrowUp':
                     enemy.velocity.y = playerJump
                     break
              case '0':
                     enemy.attack()
                     break

       }

       console.log(event.key)  
})

window.addEventListener('keyup', (event) => {
       switch (event.key){
              case 'd':
                     keys.d.pressed = false
                     break
              case 'q':
                     keys.q.pressed = false
                     break


              case 'ArrowRight':
                     keys.ArrowRight.pressed = false
                     break
              case 'ArrowLeft':
                     keys.ArrowLeft.pressed = false
                     break


       }
       console.log(event.key)  
})