import { useCart } from "../../hooks/useCart";
import ItemCount from "../ItemCount/ItemCount";
import { Link } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
const ItemDetail = ({name, img, description, stock, category, id, price}) => {
  const {addItem, isInCart} = useCart();
  const {setNotification} = useNotification()

  const handleAdd = (count) => {
    const produtObj = {
      id, name, price, quantity: count
    } 
    addItem(produtObj)
    setNotification("success", `Se agregaron ${count} de ${name}`);
  }
  
  return (
    <article>
      <div className="card d-flex align-items-center justify-content-center">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={img} style={{ width: 200 }} className="card-img-top h-100" alt={name} />
          </div>
        
        <div className="col-md-8">
          <div className="card-body ms-5">
            <h2>{name}</h2>
            <p className="card-text">{description}</p>
            <p className="card-text">Categoría: {category}</p>
            <p className="card-text">Precio: $ {price}</p>
            <p className="card-text">Disponibilidad: {stock}</p>
            <div className="justify-content-end ms-5">
              {
                isInCart(id) ? (
                  <Link to='/cart'><button className="btn btn-primary rounded-pill">Finalizar Compra</button></Link>
                ): (
                  <ItemCount stock={stock} onAdd={handleAdd} />
                )
              }
          </div>
          </div>
        
        </div>
        </div>
        
        
      </div>
    </article>
  );
}

export default ItemDetail
