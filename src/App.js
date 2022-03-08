import { useEffect } from 'react';
import './App.css';
import Board from './components/Board'

const rows = 6;
const columns = 7;
function App() {

  const createEmptyMatrix = (rows, columns) => {
      let matrix = []
      for (let i = 0; i < rows; i++){
        let empty_row = []
        for(let j = 0; j < columns; j++){
            empty_row.push('null')
        }
        matrix.push(empty_row)
    }
    return matrix
  }

  return (
    <div className="flex justify-center items-center bg-gray-900 h-screen w-screen">
      <Board rows={rows} columns={columns} matrix={createEmptyMatrix(rows, columns)}/>
    </div>
  );
}

export default App;
