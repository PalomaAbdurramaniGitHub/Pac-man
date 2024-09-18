document.addEventListener("DOMContentLoaded", ()=>{
    const width = 62;
    let score = 0;
    const grid = document.querySelector('.grid');
    const pacManSpeed = 200;

    // 62x18
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,1,1,4,4,1,1,0,0,1,1,1,0,0,0,0,1,0,0,0,1,4,4,1,1,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,0,1,1,1,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,1,1,0,0,1,0,0,1,1,1,1,0,0,1,1,1,1,1,0,1,0,0,1,
        1,0,0,0,1,1,4,4,4,1,0,1,0,3,0,0,1,1,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,
        4,0,0,5,5,5,5,5,5,0,0,0,0,5,5,0,0,1,0,5,5,0,1,1,0,1,1,0,1,0,0,0,0,1,0,0,5,5,5,5,5,5,0,1,0,0,5,5,0,0,1,1,0,5,5,5,5,5,5,5,0,1,
        1,0,5,5,5,5,5,5,5,5,0,0,5,5,5,5,0,0,0,5,5,0,1,1,0,1,1,0,1,1,1,1,1,1,0,0,5,5,5,5,5,5,0,0,0,5,5,5,5,0,0,1,5,5,5,5,5,5,5,5,0,1,
        1,0,0,5,5,5,5,5,5,0,0,5,5,4,4,5,5,0,0,5,5,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,5,5,0,0,0,0,0,0,5,5,4,4,5,5,0,0,5,5,5,0,0,0,0,0,0,1,
        1,0,0,0,0,5,5,0,0,0,5,5,4,4,4,4,5,5,0,5,5,0,1,0,0,1,0,1,1,1,2,2,1,1,1,0,5,5,0,0,0,1,0,5,5,4,4,4,4,5,5,0,0,5,5,5,0,0,1,1,0,1,
        1,0,1,1,0,5,5,0,1,0,5,5,5,5,5,5,5,5,0,5,5,0,1,0,0,1,0,1,2,2,2,2,2,2,1,0,5,5,5,5,0,1,0,5,5,5,5,5,5,5,5,0,0,0,5,5,5,0,0,1,0,1,
        1,0,0,1,0,5,5,0,1,0,5,5,5,5,5,5,5,5,0,5,5,0,0,1,1,1,0,1,2,2,2,2,2,2,1,0,5,5,5,5,0,1,0,5,5,5,5,5,5,5,5,0,0,0,0,5,5,5,0,0,0,1,
        1,1,0,1,0,5,5,0,1,0,5,5,0,0,0,0,5,5,0,5,5,0,0,1,1,1,0,1,2,2,2,2,2,2,1,0,5,5,0,0,0,1,0,5,5,0,0,0,0,5,5,0,0,1,0,0,5,5,5,0,0,1,
        1,0,0,1,0,5,5,0,1,0,5,5,0,1,1,0,5,5,0,5,5,0,0,0,0,0,0,1,1,1,2,2,1,1,1,0,5,5,0,0,0,0,0,5,5,0,1,1,0,5,5,0,0,1,1,3,0,5,5,5,0,1,
        1,0,1,0,0,5,5,0,0,0,5,5,0,1,1,0,5,5,0,5,5,5,5,5,5,5,0,0,0,4,4,4,4,0,0,0,5,5,5,5,5,5,0,5,5,0,1,1,0,5,5,0,5,5,5,5,5,5,5,5,0,1,
        1,0,0,0,5,5,5,5,0,0,5,5,0,1,0,0,5,5,0,5,5,5,5,5,5,5,0,1,0,1,1,1,0,0,1,0,5,5,5,5,5,5,0,5,5,0,0,1,0,5,5,0,5,5,5,5,5,5,5,0,0,4,
        1,3,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,4,4,1,1,0,0,0,1,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,0,0,0,1,0,1,1,1,1,1,0,1,1,1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,1,1,0,0,0,0,1,0,1,0,0,1,1,1,1,0,1,0,0,0,1,0,1,
        1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,4,1,1,3,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,1,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    ];

    /* 0 - pac-dots
       1 - wall
       2 - ghost-lair
       3 - power-pellet
       4 - empty
       5 - TALEAS */


    // create Board
    const squares = []; // array that will contain divs named square

    function createBoard(){
        for(let index=0; index < layout.length; index++){
            // create square and add it to the squares array
            const square = document.createElement('div');
            grid.appendChild(square);
            squares.push(square);

            // add Layout
            if(layout[index] === 0){
                squares[index].classList.add("pac-dot");
            }
            if(layout[index] === 1){
                squares[index].classList.add("wall");
            }
            if(layout[index] === 2){
                squares[index].classList.add("ghost-lair");
            }
            if(layout[index] === 3){
                squares[index].classList.add("power-pellet");
            }
            if(layout[index] === 4){
                squares[index].classList.add("empty");
            }
            if(layout[index] === 5){
                squares[index].classList.add("taleas");
            }
        }
    }
    createBoard();

    // add pac-man to the grid on index 404
    let pacmanCurrentIndex = 900;
    squares[pacmanCurrentIndex].classList.remove("pac-dot");
    squares[pacmanCurrentIndex].classList.add("pac-man");

    // when pac-dot gets eaten
    function pacDotEaten(){
        if(squares[pacmanCurrentIndex].classList.contains("pac-dot")){
            score++;
        }
        squares[pacmanCurrentIndex].classList.remove("pac-dot");
        squares[pacmanCurrentIndex].classList.add("empty");
        document.getElementById("score").innerHTML = score;
    }

    // when power-pellet gets eaten
    function powerPelletEaten(){
        if(squares[pacmanCurrentIndex].classList.contains("power-pellet")){
            score += 10;
            ghosts.forEach(ghost => ghost.isScared = true); // make ghosts scared
            setTimeout(unScareGhosts, 10000); // set timer for ghosts to get unscared
        }
        squares[pacmanCurrentIndex].classList.remove("power-pellet");
        squares[pacmanCurrentIndex].classList.add("empty");
        document.getElementById("score").innerHTML = score;
    }

    // unscare ghosts
    function unScareGhosts(){
        ghosts.forEach(ghost => ghost.isScared = false);
    }


    
    var direction = ""; // move pac-man according to the pressed key
    var moveInterval; // To keep track of the interval ID
    function movePacman(e){

        clearInterval(moveInterval); // clear any existing interval when a new key is pressed
        
        var oldDirection = direction; // remove pac-man from existing position before adding it to the new one

        // act accordingly to the pressed key
        switch(e.key){
            case 'ArrowLeft':
                direction = "-left";

                // teleport
                if(squares[pacmanCurrentIndex] === squares[248]){
                    pacmanCurrentIndex = 867;
                    updatePacmanPosition();
                    break;
                }

                // move pac-man until it encounters an obstacle
                moveInterval = setInterval(function(){
                    if(
                        !squares[pacmanCurrentIndex - 1].classList.contains("wall") && 
                        !squares[pacmanCurrentIndex - 1].classList.contains("taleas") && 
                        !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
                    ){
                        squares[pacmanCurrentIndex].classList.remove("pac-man"+oldDirection);
                        pacmanCurrentIndex -= 1;
                        updatePacmanPosition();
                    }else{
                        clearInterval(moveInterval); // Stop if it encounters wall or obstacle
                    }
                }, pacManSpeed);

                break;
            case 'ArrowRight':
                direction = "-right";
                if(squares[pacmanCurrentIndex] === squares[867]){
                    pacmanCurrentIndex = 248;
                    updatePacmanPosition();
                    break;
                }
                moveInterval = setInterval(function(){
                    if(
                        !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
                        !squares[pacmanCurrentIndex + 1].classList.contains("taleas") &&
                        !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
                    ){
                        squares[pacmanCurrentIndex].classList.remove("pac-man"+oldDirection);
                        pacmanCurrentIndex += 1;
                        updatePacmanPosition();
                    }else{
                        clearInterval(moveInterval);
                    }
                }, pacManSpeed);
                
                break;
            case 'ArrowUp':
                direction = "-up";
                moveInterval = setInterval(function(){
                    if(
                        !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
                        !squares[pacmanCurrentIndex - width].classList.contains("taleas") &&
                        !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")
                    ){
                        squares[pacmanCurrentIndex].classList.remove("pac-man"+oldDirection);
                        pacmanCurrentIndex -= width;
                        updatePacmanPosition();
                    }else{
                        clearInterval(moveInterval);
                    }
                }, pacManSpeed);
                
                break;
            case 'ArrowDown':
                direction = "-down";
                moveInterval = setInterval(function(){
                    if(
                        !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
                        !squares[pacmanCurrentIndex + width].classList.contains("taleas") &&
                        !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
                    ){
                        squares[pacmanCurrentIndex].classList.remove("pac-man"+oldDirection);
                        pacmanCurrentIndex += width;
                        updatePacmanPosition();
                    }else{
                        clearInterval(moveInterval);
                    }
                }, pacManSpeed);
                
                break;
        }
    }

    //change pac-man position
    function updatePacmanPosition(){
        squares.forEach(square => square.classList.remove("pac-man"+direction));
        squares[pacmanCurrentIndex].classList.add("pac-man"+direction);
        pacDotEaten();
        powerPelletEaten();
        checkForWin();
    }

    document.addEventListener('keyup', movePacman); // adds an event listener for the keyup event, allowing Pac-Man to move when the user presses a key
    

    //create Ghost class using Constructor
    class Ghost {
        constructor(className, startIndex, ghostRestartIndex, speed){
            this.className = className;
            this.startIndex = startIndex;
            this.ghostRestartIndex = ghostRestartIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.isScared = false;
            this.timerId = null;
        }
    }

    //create ghosts array
    const ghosts = [
        new Ghost ("blinky", 200, 587,  500),
        new Ghost ("pinky", 830, 588, 400),
        new Ghost ("inky", 369, 589, 300),
        new Ghost ("clyde", 700, 590, 250),
    ];

    ghosts.forEach(ghost => squares[ghost.currentIndex].classList.add(ghost.className, "ghost")); //draw Ghosts onto the grid

    
    ghosts.forEach(ghost => moveGhost(ghost)); //move ghosts

    //move ghosts
    function moveGhost(ghost) {
        let pocDotOrEmpty = "empty";
        let powerPelletOrEmpty = "empty";
        let lastDirection = null; // last tried direction
    
        ghost.timerId = setInterval(() => {
            let ghostDirection = null;
            let minDistance = Infinity;
    
            // possible directions
            const directions = [-1, 1, width, -width];
            const validDirections = directions.filter(direction => {
                const nextIndex = ghost.currentIndex + direction;
                return (
                    !squares[nextIndex].classList.contains("wall") &&
                    !squares[nextIndex].classList.contains("ghost") &&
                    !squares[nextIndex].classList.contains("taleas") &&
                    direction !== -lastDirection 
                );
            });
    
            // select the best direction
            validDirections.forEach(direction => {
                const nextIndex = ghost.currentIndex + direction;
                const distanceToPacman = Math.abs(nextIndex % width - pacmanCurrentIndex % width) +
                                         Math.abs(Math.floor(nextIndex / width) - Math.floor(pacmanCurrentIndex / width));
                if (distanceToPacman < minDistance) {
                    minDistance = distanceToPacman;
                    ghostDirection = direction;
                }
            });
    
            if (ghostDirection !== null) {
                // move ghost
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
    
                // reset what was removed when ghost was on that square
                if (
                    !squares[ghost.currentIndex].classList.contains("ghost-lair") &&
                    !squares[ghost.currentIndex].classList.contains("empty")
                ) {
                    if (pocDotOrEmpty === "pac-dot") {
                        squares[ghost.currentIndex].classList.add("pac-dot");
                        pocDotOrEmpty = "empty";
                    }
                    if (powerPelletOrEmpty === "power-pellet") {
                        squares[ghost.currentIndex].classList.add("power-pellet");
                        powerPelletOrEmpty = "empty";
                    }
                }

                ghost.currentIndex += ghostDirection;
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
    
                lastDirection = ghostDirection;
    

                if (squares[ghost.currentIndex].classList.contains("pac-dot")) {
                    pocDotOrEmpty = "pac-dot";
                }
                if (squares[ghost.currentIndex].classList.contains("power-pellet")) {
                    powerPelletOrEmpty = "power-pellet";
                }
    
                squares[ghost.currentIndex].classList.remove("pac-dot");
            } else {
                // if no valid direction is found, reset lastDirection
                lastDirection = null;
            }
    
            // only if the ghost is scared
            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add("scared-ghost");
    
                // if the ghost is scared and pac-man is on it
                if (ghost.currentIndex === pacmanCurrentIndex) {
                    squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
                    ghost.currentIndex = ghost.ghostRestartIndex;
                    squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
    
                    score += 100;
                    ghost.isScared = false;
                }
            }
    
            // check for game over
            if (!ghost.isScared) {
                checkForGameOver();
            }
    
        }, ghost.speed);
    }
    

    //check for game over
    function checkForGameOver(){
        if(squares[pacmanCurrentIndex].classList.contains("ghost")){
            //add eaten state to that square and clear the ghost interval so ghosts stop moving
            squares[pacmanCurrentIndex].classList.add("pac-man-eaten");
            ghosts.forEach(ghost => clearInterval(ghost.timerId));

            document.removeEventListener('keyup', movePacman); //removes the keyup event listener, preventing Pac-Man from moving when a key is pressed

            // display smth else after a set time
            setTimeout(function(){ 

                const style = document.createElement('style');
                style.innerHTML = `
                    #grid {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        text-align: center;
                    }
                    #grid h1{
                        font-size: 60px;
                    }
                    #grid h1, #restart-btn {
                        color: rgb(232, 134, 7);
                    }
                    #restart-btn {
                        background-color: rgba(205, 111, 16, 0.74);
                        border: 3px solid rgb(124, 55, 8);
                        border-radius: 5px;
                        padding: 20px;
                        font-size: 18px;
                    }
                    #restart-btn:hover {
                        background-color: rgba(205, 111, 16, 0.74);
                        color: rgb(10, 17, 36);
                    }
                `;
                document.head.appendChild(style);

                document.getElementById('grid').innerHTML = `<h1>Unfortunately, you didn't win this time! &#128546;</h1>  <button id="restart-btn">Restart</button>`;

                // This will reload the page, restarting the game
                document.getElementById('restart-btn').addEventListener('click', function() {
                    location.reload(); 
                });
            } , 500);
        }
    }
    
    //check for a win
    function checkForWin(){

        // all dots scores + all power pellets scores = 496
        if(score >= 200){
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keyup', movePacman);
            setTimeout(function(){ 

                const style = document.createElement('style');
                style.innerHTML = `
                    #grid {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        text-align: center;
                    }
                    #grid h1{
                        font-size: 60px;
                    }
                    #grid h1, #restart-btn {
                        color: rgb(232, 134, 7);
                    }
                    #restart-btn {
                        background-color: rgba(205, 111, 16, 0.74);
                        border: 3px solid rgb(124, 55, 8);
                        border-radius: 5px;
                        padding: 20px;
                        font-size: 18px;
                    }
                    #restart-btn:hover {
                        background-color: rgba(205, 111, 16, 0.74);
                        color: rgb(10, 17, 36);
                    }
                `;
                document.head.appendChild(style);

                document.getElementById('grid').innerHTML = `<h1>Victory is yours! You've just WON the game! &#127882;</h1>  <button id="restart-btn">Play Again</button>`;

                // This will reload the page, effectively restarting the game
                document.getElementById('restart-btn').addEventListener('click', function() {
                    location.reload(); 
                });
            } , 100);
        }
    }
    
})