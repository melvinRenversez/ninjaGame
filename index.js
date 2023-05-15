const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
       position: {
              x: 0,
              y:0
       },
       imageSrc: 'assets/decor/background.png'
})

const shop = new Sprite({
       position: {
              x: 625,
              y: 128
       },
       imageSrc: 'assets/decor/shop.png',
       scale: 2.75,
       framesMax: 6
})

const playerSpeed = 5
const playerJump = -20

const player = new Fighter({
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
       },
       imageSrc: 'assets/player1/Sprites/Idle.png',
       framesMax: 8,
       scale: 2.5,
       offset: {
              x: 215,
              y: 157
       }
})

const enemy = new Fighter({
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

decreaseTimer()

function animate() {
       window.requestAnimationFrame(animate)
       c.fillStyle = 'black'
       c.fillRect(0,0, canvas.width, canvas.height)
       background.update()
       shop.update()
       player.update()
       // enemy.update()

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

       //life verification

       if ( player.health <= 0 || enemy.health <= 0 ){
              determineWinner({player, enemy, timerID})
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