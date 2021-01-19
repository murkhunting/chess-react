import * as Chess from "chess.js";
//we need to create an observable to create to listen the changes that happen
import {BehaviorSubject} from "rxjs";

const chess = new Chess()

export const gameSubject = new BehaviorSubject({
    board: chess.board()
})