import react , {useState, useRef, createRef, useEffect} from 'react';
import Block from './Block';

// let matrix = [];
const block_dimension = "80" //in px
const duration = 50;
const connect_how_many = 4;

const Board = ({rows, columns, matrix}) => {

    const arrLength = rows*columns;

    const boardRef = useRef()
    const blockList = useRef([])
    const blockRefList = useRef([])

    if (blockRefList.current.length !== arrLength) {
        // add or remove refs
        blockRefList.current = Array(arrLength)
          .fill()
          .map((_, i) => blockRefList.current[i] || createRef());
      }
    const val = useRef(1)

    const flipTheBlock = (full_or_ThreeQuarter, block) => {
        
        block.classList.remove("rotateOne");
        block.classList.remove("rotateTwo");
        block.classList.remove("rotateThree");
        block.classList.remove("rotateFour");

        const og_backgroundColor = window.getComputedStyle(block).backgroundColor;
        block.classList.add("rotateOne")
        let colorString
        let value_of_this_block = val.current
        setTimeout(() => {
            if (value_of_this_block === 1){
                
                colorString = "rgb(0,255,0)"
            }
            else if (value_of_this_block === -1){
                colorString = "rgb(255,215,0)"
            }
            block.style.backgroundColor = colorString;
            block.classList.add("rotateTwo")

            if (full_or_ThreeQuarter === 1){
                setTimeout(() => {
                    block.classList.add("rotateThree")

                    setTimeout(() => {
                        block.style.backgroundColor = og_backgroundColor;
                        block.classList.add("rotateFour")
                        setTimeout(() => {

                        }, duration)
                    }, duration)
                }, duration)
            }
        }, duration)
    }

    const onBlockClickHandler = (address) => {
        const column_clicked = address[1]
        let i;
        for (i = 0; i < rows; i++){
            if (matrix[i][column_clicked] !== 'null'){
                break
            }
        }
        if (i === 0){
            return
        }
        else if (i === 1){
            matrix[0][column_clicked] = val.current
            const x = blockRefList.current[column_clicked];
            let bl = document.getElementById(x.props.id)
            flipTheBlock(0.75,bl)
        }
        else{
            matrix[i-1][column_clicked] = val.current
            let listOfBlocksToAnimate = []
            for (let k = 0; k < i; k++){
                listOfBlocksToAnimate.push(blockList.current[columns*k + column_clicked])
            }
            for (let k = 0; k < listOfBlocksToAnimate.length; k++){
                setTimeout(() => {
                    let block = listOfBlocksToAnimate[k]
                    let bl = document.getElementById(block.props.id)
                    if (k === listOfBlocksToAnimate.length-1){
                        flipTheBlock(0.75,bl)
                    }
                    else{
                        flipTheBlock(1,bl)
                    }
                }, duration*4*k) 
            }
        }
        checkIfLastMoveWon([i-1, column_clicked])
        val.current = val.current*-1;
    }

    const checkIfCountWon = count => {
        if (count === connect_how_many+1){
            alert("GG YOU WIN")
        }
    }
    
    // const checkIf
    const checkIfLastMoveWon = (move_address) => {
        let row = move_address[0]
        let column = move_address[1]
        let valAtRow = val.current
        console.log(valAtRow)
        let count = 0

        //check horizontal
        let i = column
        for (i = column; i < columns; i++){
            if (matrix[row][i]){
                if (matrix[row][i] === valAtRow){
                    count++;
                }
                else{
                    break
                }
            }
        }
        for (i = column; i >= 0; i--){
            if (matrix[row][i]){
                if (matrix[row][i] === valAtRow){
                    count++;
                }
                else{
                    break
                }
            }
        }
        checkIfCountWon(count)
        count = 0

        let j = row
        for (j = row; j < rows; j++){
            if (matrix[j]){
                if (matrix[j][column]){
                    if (matrix[j][column] === valAtRow){
                        count++;
                    }
                    else{
                        break
                    }
                }
            }
        }
        for (j = row; j >= 0; j--){
            if (matrix[j])
            {
                if (matrix[j][column]){
                    if (matrix[j][column] === valAtRow){
                        count++;
                    }
                    else{
                        break
                    }
                }
            }
        }
        checkIfCountWon(count)
        
        count = 0
        j = row
        i = column
        while (i >= 0 && j >= 0){
            if (matrix[j] && matrix[j][i]){
                if (matrix[j][i] === valAtRow){
                    count++;
                    i--;
                    j--
                }
                else{
                    break;
                }
            }
        }
        j = row
        i = column
        while (i < columns && j < rows){
            if (matrix[j] && matrix[j][i]){
                if (matrix[j][i] === valAtRow){
                    count++;
                    i++;
                    j++
                }
                else{
                    break;
                }
            }
        }

        checkIfCountWon(count)

        count = 0
        j = row
        i = column
        while (i >= 0 && j < rows){
            if (matrix[j] && matrix[j][i]){
                if (matrix[j][i] === valAtRow){
                    count++;
                    i--;
                    j++;
                }
                else{
                    break;
                }
            }
        }

        j = row
        i = column
        while (i < columns && j >= 0){
            if (matrix[j] && matrix[j][i]){
                if (matrix[j][i] === valAtRow){
                    count++;
                    i++;
                    j--;
                }
                else{
                    break;
                }
            }
        }
        checkIfCountWon(count)

    }

    // const add_to_
    const getListOfBlocks = () => {
        for (let i = 0; i < rows; i++){
            for (let j=0; j<columns; j++){
                
                blockList.current.push(<Block id={columns*i + j} address={[i,j]} onClickHandler={onBlockClickHandler} curr_val={val}/>)
            }
        }
        let ndx = 0;
        for (let block of blockList.current){
            blockRefList.current[ndx] = block;
            ndx++;
        }
        return blockList.current
    }

    return(
        <div className="board" 
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                height: `${block_dimension*rows}px`,
                width: `${block_dimension*columns}px`,
            }}
            ref={boardRef}>
            {getListOfBlocks()}
        </div>
    )
}

export default Board