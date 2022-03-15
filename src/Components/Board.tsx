

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

const fillIndicators = (cells: string[], rows: number): string[] => {
    
    for (let i = 0, n = cells.length; i < n; i++) {
        if (cells[i] !== '💣') continue;
        // Edge cases: top-left, top-right, bottom-left, bottom-right => 3 available cells
        let topLeft = i-rows-1,
        top = i-rows,
        topRight = i-rows+1,
        left = i-1,
        right = i+1,
        bottomLeft = i+rows-1,
        bottom = i+rows,
        bottomRight = i+rows+1;
        switch (i) {
            case 0:
                // Top-left
                if (cells[right] !== '💣') cells[right] = String(Number(cells[right])+1);
                if (cells[bottomRight] !== '💣') cells[bottomRight] = String(Number(cells[bottomRight])+1);
                if (cells[bottom] !== '💣') cells[bottom] = String(Number(cells[bottom])+1);
                break;
                case rows-1:    
                // Top-right
                if (cells[bottom] !== '💣') cells[bottom] = String(Number(cells[bottom])+1);
                if (cells[bottomLeft] !== '💣') cells[bottomLeft] = String(Number(cells[bottomLeft])+1);
                if (cells[left] !== '💣') cells[left] = String(Number(cells[left])+1);
                break;
            case rows*(rows-1):
                // Bottom-left
                if (cells[top] !== '💣') cells[top] = String(Number(cells[top])+1);
                if (cells[topRight] !== '💣') cells[topRight] = String(Number(cells[topRight])+1);
                if (cells[right] !== '💣') cells[right] = String(Number(cells[right])+1);
                break;
            case rows*rows-1:
                // Bottom-right
                if (cells[left] !== '💣') cells[right] = String(Number(cells[right])+1);
                if (cells[topLeft] !== '💣') cells[topLeft] = String(Number(cells[topLeft])+1);
                if (cells[top] !== '💣') cells[top] = String(Number(cells[top])+1);
                break;
            default:
                break;
        }

        // Other special cases: top, bottom, left, right => 5 available cells
        if (i > 0 && i < rows-1) {
            // Top Center
            if (cells[right] !== '💣') cells[right] = String(Number(cells[right])+1);
            if (cells[bottomRight] !== '💣') cells[bottomRight] = String(Number(cells[bottomRight])+1);
            if (cells[bottom] !== '💣') cells[bottom] = String(Number(cells[bottom])+1);
            if (cells[bottomLeft] !== '💣') cells[bottomLeft] = String(Number(cells[bottomLeft])+1);
            if (cells[left] !== '💣') cells[left] = String(Number(cells[left])+1);
        }
        else if (i > rows*(rows-1) && i < (rows*rows)-1) {
            // Bottom Center
            if (cells[top] !== '💣') cells[top] = String(Number(cells[top])+1);
            if (cells[topRight] !== '💣') cells[topRight] = String(Number(cells[topRight])+1);
            if (cells[right] !== '💣') cells[right] = String(Number(cells[right])+1);
            if (cells[left] !== '💣') cells[left] = String(Number(cells[left])+1);
            if (cells[topLeft] !== '💣') cells[topLeft] = String(Number(cells[topLeft])+1);
        }
        else if (i % rows === 0 && i !== 0 && i !== rows*(rows-1)) {
            // Left Center
            if (cells[top] !== '💣') cells[top] = String(Number(cells[top])+1);
            if (cells[topRight] !== '💣') cells[topRight] = String(Number(cells[topRight])+1);
            if (cells[right] !== '💣') cells[right] = String(Number(cells[right])+1);
            if (cells[bottomRight] !== '💣') cells[bottomRight] = String(Number(cells[bottomRight])+1);
            if (cells[bottom] !== '💣') cells[bottom] = String(Number(cells[bottom])+1);
        }
        else if (i+1 % rows === 0 && i !== rows-1 && i !== (rows*rows)-1) {
            // Left Center
            if (cells[top] !== '💣') cells[top] = String(Number(cells[top])+1);
            if (cells[bottom] !== '💣') cells[bottom] = String(Number(cells[bottom])+1);
            if (cells[bottomLeft] !== '💣') cells[bottomLeft] = String(Number(cells[bottomLeft])+1);
            if (cells[left] !== '💣') cells[left] = String(Number(cells[left])+1);
            if (cells[topLeft] !== '💣') cells[right] = String(Number(cells[right])+1);
        }
        else {
            // Center
            if (cells[top] !== '💣') cells[top] = String(Number(cells[top])+1);
            if (cells[topRight] !== '💣') cells[topRight] = String(Number(cells[topRight])+1);
            if (cells[right] !== '💣') cells[right] = String(Number(cells[right])+1);
            if (cells[bottomRight] !== '💣') cells[bottomRight] = String(Number(cells[bottomRight])+1);
            if (cells[bottom] !== '💣') cells[bottom] = String(Number(cells[bottom])+1);
            if (cells[bottomLeft] !== '💣') cells[bottomLeft] = String(Number(cells[bottomLeft])+1);
            if (cells[left] !== '💣') cells[left] = String(Number(cells[left])+1);
            if (cells[topLeft] !== '💣') cells[right] = String(Number(cells[right])+1);
        }
    }
    return cells;
}


const Board = (props: BoardProps) => {
    const cells: string[] = Array(props.rows*props.rows).fill('0');
    fillBombs(cells, props.bombs);
    fillIndicators(cells, props.rows);
    const board: string[][] = [];
    for (let i = 0; i < props.rows; i++) {
        board.push(cells.slice(i,i+props.rows))
    }
    return (
        <div>
            <h1>Board</h1>
            <section>
                {
                    board.map((row) => (
                        <div className="row">
                            {row.map(cell => (
                                <div>{cell}</div>
                            ))}    
                        </div>
                    ))
                }
            </section>
        </div>
    );
};

export default Board;