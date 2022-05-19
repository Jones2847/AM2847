canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');
Brick = document.getElementById("Brick")
Stone = document.getElementById("Stone")
Garden = document.getElementById("Garden")
Goat = document.getElementById("Goat");

canvas.width = window.innerWidth
canvas.height = window.innerHeight

//var BombLimit=3;
let cancel=false;

class Player {
    constructor(x,y,width,height) {

        this.position={
            x:x,
            y:y

        }
        this.size={
            width:width,
            height:height
        }

        this.bombLimit = 3;
        this.tilesBomb=1;
    }



    draw(){
        ctx.beginPath()
        ctx.fillStyle = "blue"
        ctx.fillRect(this.position.x,this.position.y,this.size.width,this.size.height);
        ctx.closePath()

    }
    update(){

            this.draw();

    }


}


class Player2 extends Player{
    constructor(x,y,width,height){
        super(x,y,width,height)
    }

}

class Structure{
    constructor(x,y,width,height,image) {

        this.position={
            x:x,
            y:y

        }
        this.size={
            width:width,
            height:height
        }

        this.color = "black"

        this.image=image;
    }


    draw(){
        ctx.beginPath()

        if (this.image!="null"){
        ctx.drawImage(this.image,this.position.x,this.position.y,this.size.width,this.size.height)}
        else
        {

            ctx.fillStyle = this.color;
            ctx.fillRect(this.position.x,this.position.y,this.size.width,this.size.height)
        }
        ctx.closePath()

    }

}

class DestructibleStructures extends Structure{

    constructor(x,y,width,height,image) {
        super(x,y,width,height,image);
    }

    draw() {
        ctx.beginPath()
        ctx.drawImage(this.image,this.position.x,this.position.y,this.size.width,this.size.height);
        ctx.closePath()
    }

}


class Bomb{
    constructor(x,y,width,height,Bomb) {

        this.position={
            x:x,
            y:y

        }
        this.size={
            width:width,
            height:height
        }

        this.tilesAfected = Bomb;

        this.timer=90;

    }
    draw(){

        ctx.beginPath()
        ctx.fillStyle = "black"
        ctx.arc(this.position.x+10,this.position.y+10, this.size.width/2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath()
    }

    update(){

        this.timer--;
        this.draw();

        if (this.timer<=0){
            for (let i=1;i<=this.tilesAfected;i++){
                ctx.beginPath()
                ctx.fillStyle = "gold"
                ctx.fillRect(this.position.x-i*20,this.position.y-i*20,this.size.width+i*20*2,this.size.height+i*20*2);
                ctx.closePath()

            }

        }


    }

}


/*function rand(min, max, step) {
    var delta,
        range,
        rand;
    if (arguments.length < 2) {
        max = min;
        min = 0;
    }
    if (!step) {
        step = 1;
    }
    delta = max - min;
    range = delta / step;
    rand = Math.random();
    rand *= range;
    rand = Math.floor(rand);
    rand *= step;
    rand += min;
    return rand;
}*/

function rand(width,step,mini){




    return (Math.floor(Math.random() * ((width/step)-(mini/step))+(mini/step))) * step;

}
const players = []
players.push(new Player(40,320,20,20))
players.push(new Player2(1280,320,20,20))

const structures = []
const destructible= []
const bomb = []
let keys = []
let first = true



function move(key) {
for (let i =0;i<key.length;i++){
        if(key[i]=="ArrowUp" ) {
            players[1].position.y-=20;
            if (colisionStructure()|| colisionDestructible() ){
                players[1].position.y+=20;
            }}
        if(key[i] ==  "ArrowLeft"){
            players[1].position.x-=20;
            if (colisionStructure()|| colisionDestructible() ){
                players[1].position.x+=20;
            }}

         if (key[i] == "ArrowDown"){
             players[1].position.y+=20;
            if (colisionStructure()|| colisionDestructible() ){
                players[1].position.y-=20;
            }}

        if (key[i] == "ArrowRight") {
            players[1].position.x+=20;
            if (colisionStructure()|| colisionDestructible()){
                players[1].position.x-=20;
            }}

    if(key[i]=="w" ) {
        players[0].position.y-=20;
        if (colisionStructure()|| colisionDestructible() ){
            players[0].position.y+=20;
        }}
    if(key[i] ==  "a"){
        players[0].position.x-=20;
        if (colisionStructure()|| colisionDestructible()){
            players[0].position.x+=20;
        }}

    if (key[i] == "s"){
        players[0].position.y+=20;
        if (colisionStructure()|| colisionDestructible()){
            players[0].position.y-=20;
        }}

    if (key[i] == "d") {
        players[0].position.x+=20;
        if (colisionStructure()|| colisionDestructible()){
            players[0].position.x-=20;
        }}
    if(key[i]== "x"){
        if (players[0].bombLimit>0) {
            bomb.push(new Bomb(players[0].position.x, players[0].position.y, players[0].size.width, players[0].size.height,players[0].tilesBomb))
            players[0].bombLimit--;
            if (players[0].bombLimit==0){
                players[0].tilesBomb++;}
        }
    }

    if(key[i] == "p"){
        if (players[1].bombLimit>0) {
            bomb.push(new Bomb(players[1].position.x, players[1].position.y, players[1].size.width, players[1].size.height,players[1].tilesBomb))
            players[1].bombLimit--;
            if (players[1].bombLimit==0){
                players[1].tilesBomb++;}
        }
    }


}}

function map(){

for (let i=300;i<=canvas.width-300;i+=20) {
    for (let f = 100; f <= canvas.height-100; f += 20) {
        destructible.push(new DestructibleStructures(rand(1200,20,240), rand(600,20,50), players[0].size.width, players[1].size.height,Brick))
    }
}
for (let f=200;f<=1400;f+=200) {

   

if(first){
    for (let i = 20; i <= 600; i += 80) {

        structures.push(new Structure(f, i, 60, 60,Stone))
        first =false;
    }
}
else
{
    for (let i = 0; i <= 600; i += 80) {

        structures.push(new Structure(f, i, 60, 60,Stone))
        first =true;
    }
}
    structures.push(new Structure(0,0,40,canvas.height,"null"))
    structures.push(new Structure(0,0,canvas.width,40,"null"))
    structures.push(new Structure(canvas.width-45,0,40,canvas.height,"null"))
    structures.push(new Structure(0,canvas.height-45,canvas.width,40,"null"))
}

}


function colisionStructure(){

    for (let f=0;f<players.length;f++){
    for(let i=0;i<structures.length;i++){

        if(players[f].position.x < structures[i].position.x + structures[i].size.width &&
            players[f].position.x + players[f].size.width > structures[i].position.x &&
            players[f].position.y < structures[i].position.y + structures[i].size.height &&
            players[f].position.y + players[f].size.height > structures[i].position.y){

            return true;

        }


    }
    }
}

function colisionDestructible(){

    for (let f=0;f<players.length;f++){
    for(let i=0;i<destructible.length;i++){

        if(players[f].position.x < destructible[i].position.x + destructible[i].size.width &&
            players[f].position.x + players[f].size.width > destructible[i].position.x &&
            players[f].position.y < destructible[i].position.y + destructible[i].size.height &&
            players[f].position.y + players[f].size.height > destructible[i].position.y){

            return true;

        }

    }
    }

}

function colisionBombInit(){

    for (let f=0;f<players.length;f++){
        for(let i=0;i<bomb.length;i++){

            if(players[f].position.x < bomb[i].position.x + bomb[i].size.width &&
                players[f].position.x + players[f].size.width > bomb[i].position.x &&
                players[f].position.y < bomb[i].position.y + bomb[i].size.height &&
                players[f].position.y + players[f].size.height > bomb[i].position.y){


                return true;

            }

        }
    }

}

function destroy(){
    for (let i=0; i<destructible.length;i++){
        for (let f=0;f<bomb.length;f++){

            if (destructible[i].position.x < bomb[f].position.x- bomb[f].tilesAfected*20 + bomb[f].size.width+bomb[f].tilesAfected*20*2 &&
                destructible[i].position.x + destructible[i].size.width > bomb[f].position.x- bomb[f].tilesAfected*20 &&
                destructible[i].position.y < bomb[f].position.y- bomb[f].tilesAfected*20 + bomb[f].size.height+bomb[f].tilesAfected*20*2 &&
                destructible[i].position.y + destructible[i].size.height > bomb[f].position.y- bomb[f].tilesAfected*20){
                if (bomb[f].timer<=0){
                destructible.splice(i,1);}
            }
        }

    }

}

function colisionBomb(){
    for (let f=0;f<players.length;f++){
    for(let i=0;i<bomb.length;i++) {
        if (bomb[i].timer <= -4) {
            if (players[f].position.x < bomb[i].position.x -bomb[i].tilesAfected*20 + bomb[i].size.width + bomb[i].tilesAfected*20*2 &&
                players[f].position.x + players[f].size.width > bomb[i].position.x - bomb[i].tilesAfected*20 &&
                players[f].position.y < bomb[i].position.y -bomb[i].tilesAfected*20 + bomb[i].size.height + bomb[i].tilesAfected*20*2 &&
                players[f].position.y + players[f].size.height > bomb[i].position.y- bomb[i].tilesAfected*20) {

                players.splice(f,1);
                cancelAnimationFrame(id);
            }
           /* for (let f=0;f<structures.length;f++)
            if (structures[f].position.x < bomb[i].position.x-20 + bomb[i].size.width+40 &&
                structures[f].position.x + p1.size.width > bomb[i].position.x-20 &&
                structures[f].position.y < bomb[i].position.y-20 + bomb[i].size.height+40 &&
                structures[f].position.y + p1.size.height > bomb[i].position.y-20){


            }*/

        }
    }
    }
}


function explosionTimeOut(){
    for (let i =0 ; i<bomb.length;i++){

        if (bomb[i].timer<=-140){

            bomb.splice(i,1);
            players[0].bombLimit++;
            players[1].bombLimit++;
        }
    }

}
let existe=false;
addEventListener("keyup", event=>{
    for (let i =0; i<keys.length;i++){

        if (keys[i] == event.key){
            existe=false;
            keys.splice(i,1);
        }
    }


    })

window.addEventListener('keydown',event=>{

    for (let i =0; i<keys.length;i++){
    if (keys[i] == event.key){
    existe=true;

    }
    else{
        existe=false
    }

    }


    if (!existe){

        keys.push(event.key);
    }
    if (!cancel){
   move(keys);

    }

});

map()
let contador=0;
function animate(){

    id = requestAnimationFrame(animate)

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(Garden,0,0,canvas.width,canvas.height);

   /* for (x = 0; x <= canvas.width; x += 20) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        for (y = 0; y <= canvas.height; y += 20) {
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
        }
    }*/
    ctx.stroke();


   players.forEach(player=>{

       player.update();
   })

    bomb.forEach(bombs =>{

        bombs.update();
        explosionTimeOut();
        colisionBomb();
    })

    destructible.forEach(destructibles=>{

        destructibles.draw();
        destroy();
    })
    structures.forEach(structure=>{

        structure.draw();
    })


    if (players[1] == null){

        ctx.drawImage(Goat,canvas.width/2 -150,200,200,200)

    }



}




animate()