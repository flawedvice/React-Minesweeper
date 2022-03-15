

interface BoardProps {
    rows: number
    bombs: number
}

const generateRandIndexes = (indexes:number[], maxIndex: number): void => {
    let randIndex = Math.random()*maxIndex;
    if (indexes.indexOf(Math.floor(randIndex)) === -1) {
        indexes.push(Math.floor(randIndex));
    }
    else if (indexes.indexOf(Math.ceil(randIndex)) === -1) {
        indexes.push(Math.ceil(randIndex));
    }
    else {
        generateRandIndexes(indexes, maxIndex);
    }
}

const fillBombs = (cells: string[], bombs: number):string[] => {
    let indexes: number[] = [];
    for (let i = 0; i < bombs; i++) generateRandIndexes(indexes, cells.length);
    for (let index of indexes) cells[index] = '💣';
    return cells;
};


const Board = (props: BoardProps) => {
    const cells: string[] = Array(props.rows*props.rows).fill('');
    fillBombs(cells, props.bombs);
    return (
        <div>
            <h1>Board</h1>
        </div>
    );
};

export default Board;