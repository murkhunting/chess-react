import * as Chess from "chess.js";
//we need to create an observable to create to listen the changes that happen
import {BehaviorSubject} from "rxjs";

let promotion = 'rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5'
let staleMate = "4k3/4P3/4K3/8/8/8/8/8 b - - 0 78"
let checkMate = 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3'
let insufficientMaterial = "k7/8/n7/8/8/8/8/7K b - - 0 1"

const chess = new Chess(staleMate)

export const gameSubject = new BehaviorSubject()

//function to iniciate the game
export function initGame() {
    updateGame()
}

//function to reestart the game
export function resetGame (){
    chess.reset()
    updateGame()
}
//function to handle the movements of the pieces and check if we can have a promotion
export function handleMove (from, to) {
    const promotions = chess.moves({verbose:true}).filter(m => m.promotion)
    //we need to compare the actual position with the promotions positions
    //if it is true the user will have to be able to chose a new piece
    if (promotions.some(p => `${p.from}:${p.to}` === `${from}:${to}`)) {
        const pendingPromotion = {from , to, color: promotion[0].color}
        //now we call the updateGame function with the optional parameter of the promotion
        updateGame(pendingPromotion)
    }
    const {pendingPromotion} = gameSubject.getValue()
    //if there is no pendingPromotion make any move
    if (!pendingPromotion){
        move(from, to)
    }
}

//function to move a piece that takes the initial location (from) and the final (to)
export function move(from, to, promotion) {
    const tempMove = {from, to}
    if (promotion) {
        tempMove.promotion = promotion
    }
   const legalMove = chess.move({from, to})

   if(legalMove) {
       updateGame()
   }
}

function updateGame(pendingPromotion) {
    const isGameOver = chess.game_over()
    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        result: isGameOver? getGameResult() : null
    }

    gameSubject.next(newGame)
}

function getGameResult() {
    if(chess.in_checkmate()) {
        const winner = chess.turn() === "w" ? "BLACK" : "WHITE"
        return `CHECKMATE - ${winner} - WINS`
    } else if (chess.in_draw()) {
        let reason = "50 - MOVES - RULE"
        if(chess.in_stalemate()) {
            reason = "STALEMATE"
        } else if (chess.in_threefold_repetition()){
            reason = "REPETITION"
        } else if (chess.in_insufficient_material()){
            reason = "INSUFFICIENT MATERIAL"
        }
        return `DRAW - ${reason}`
    } else {
        return "UNKNOWN REASON"
    }
}