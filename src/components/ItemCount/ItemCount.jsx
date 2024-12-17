import { useState } from 'react'

function ItemCount({initialValue=1, stock, onAdd}) {
    const [count, setCount] = useState(initialValue);
    

    const decrement = () => {
        if(count>1){
            setCount(count => count - 1)
        }
    }
    const increment = () => {
        if(count < stock){
            setCount((count) => count + 1);
        }
    };

  return (
    <>
      <h5 className='text-center'>Cantidad a comprar: {count}</h5>
      <button className='btn btn-danger rounded-pill m-2' onClick={decrement}><i className="bi bi-dash"></i></button>
      <button className='btn btn-primary rounded-pill' onClick={() => onAdd(count)}>Agregar al Carrito</button>
      <button className='btn btn-success rounded-pill m-2' onClick={increment}><i className="bi bi-plus"></i></button>
    </>
  );
}

export default ItemCount
