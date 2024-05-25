//Getting all the element tags
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGame = document.querySelector("#newGame");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");

let count = 0;
let turn0 = true;

//analizing all the possible winning outcomes 
const winPattern = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
];

//Function to reset/restart the Game
const resetGame = ()=> {
    turn0 = true;
    enableeBoxes();
    msgContainer.classList.add("hide");
    count = 0;
};

const drawGame = () => {
    msg.innerText = "Game has been Draw!"
    msgContainer.classList.remove("hide");
    count = 0;
}

//Disabling the box after placing "X" or "O"
const enableeBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};

//Showing Winner at the top
const showWinner = (Winner)=>{
    msg.innerText = `Congratulations, Winner of this game is "${Winner}"`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

//logic to run the Game (What to display when the players play the game)
boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turn0){
            box.innerText = "O";
            turn0 = false;
            count++;
        }else{
            box.innerText = "X";
            turn0 = true;
            count++;
        }
        box.disabled = true;

        if(count == 9){
            drawGame();
        }

        checkWinner();
    });
});


const checkWinner = ()=>{
    for(let pattern of winPattern){
        let pos1val = boxes[pattern[0]].innerText; 
        let pos2val = boxes[pattern[1]].innerText; 
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val == pos2val && pos2val == pos3val){
                console.log("Winner", pos1val);
                showWinner(pos1val);
                count = 0;
            }
        }
    }
};

//Using js event listener to reset and restart the game on click
resetBtn.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);
