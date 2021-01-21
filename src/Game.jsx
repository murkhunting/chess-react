import * as Chess from "chess.js";
//we need to create an observable to create to listen the changes that happen
import {BehaviorSubject} from "rxjs";

const chess = new Chess()

export const gameSubject = new BehaviorSubject({
    board: chess.board()
})

//function to move a piece that takes the initial location (from) and the final (to)
export function move(from, to) {
   const legalMove = chess.move({from, to})
   if(legalMove) {
       gameSubject.next({board: chess.board()})
   }
}