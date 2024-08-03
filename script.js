var blockSize = 25; //Tamanho do bloco em px
var rows = 20; //linhas em px
var columns =20; //colunas em px
var board; //inicializando o quadro para depois acessar com o DOM
var context; //será utilizado para "desenhar"

//cabeça da cobra
var snakeX = blockSize*3
var snakeY= blockSize*3

//gameover
var gameOver = false

//Corpo
var snakeBody = [] //array que conterá as coordenadas do corpo d a cobra

//velocidade
var velocityX = 0
var velocityY =0

//comida
var foodX;
var foodY;

window.onload= function (){ //Quando a tela carregar, essa função será executada
    board = document.getElementById('board');
    board.height= rows*blockSize // acessa a propriedade e modifica ela;
    board.width =columns*blockSize
    context= board.getContext('2d')

    placeFood()
    //o trecho abaixo torna possivel a movimentação, adicionando um event listener.
    document.addEventListener('keyup', changeDirection)
    setInterval(update, 1000/10) //faz um callback pra atualizar o canvas a cada 1 100 milissegundos
}


function update(){

    if(gameOver){
        return
    }
    context.fillStyle= "black" //seleciona a cor
    context.fillRect(0,0, board.width, board.height) //desenha um retangulo e determina as coordenadas a serem preenchidas

    context.fillStyle= "red"
    context.fillRect(foodX, foodY, blockSize, blockSize)

    if (snakeX===foodX && snakeY===foodY){
        snakeBody.push([foodX, foodY])
        placeFood()
    }

    for (let i= snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1]
    }

    if (snakeBody.length){
        snakeBody[0]= [snakeX, snakeY]
    }

    context.fillStyle= "lime"
    snakeX+=velocityX * blockSize
    snakeY+= velocityY *blockSize
    context.fillRect(snakeX,snakeY, blockSize, blockSize)

    for (let i =0; i< snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
        //cada lugar onde a cobra come a comida é marcado, pintado.
    }
    //Condições para acabar o jogo: a cobra não pode bater nas paredes, nem no proprio corp
    if(snakeX<0 || snakeX>columns*blockSize || snakeY<0 || snakeY> rows*blockSize){
        gameOver= true
        alert("Fim de jogo")
    }
    
    for (let i =0; i< snakeBody.length; i++){
        if (snakeX===snakeBody[i][0] && snakeY===snakeBody[i][1]){
            gameOver= true
            alert("FIm de jogo")
        }
    }
}

function changeDirection(e){
    if (e.code ==="ArrowUp" && velocityY !=1){ // a cobra nao pode se mexer em direção oposta a que vai, senão colidiria nela mesma
        velocityX=0  //explicação no readme
        velocityY = -1
    }
    else if (e.code ==="ArrowDown"  && velocityX != -1){
        velocityX=0  //explicação no readme
        velocityY = 1
    }
    if (e.code ==="ArrowLeft" && velocityX != 1){
        velocityX= -1  //explicação no readme
        velocityY = 0
    }
    if (e.code ==="ArrowRight" && velocityX != -1){
        velocityX= 1  //explicação no readme
        velocityY = 0
    }

    
}

//mas a comida até então nascia em um lugar pré definido, isso não deixaria o jogo interessante, então, é preciso criar uma função que dê origem a um local aleatório de spawn.

function placeFood(){
    foodX= Math.floor(Math.random()* columns)*blockSize //a explicação está no readme
    foodY = Math.floor(Math.random()* rows) * blockSize
}