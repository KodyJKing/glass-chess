import { PieceType } from "./PieceType";

export default {
    [PieceType.Pawn]: { char: 'p' },
    [PieceType.Knight]: { char: 'n' },
    [PieceType.Bishop]: { char: 'b' },
    [PieceType.Rook]: { char: 'r' },
    [PieceType.Queen]: { char: 'q' },
    [PieceType.King]: { char: 'k' }
}
