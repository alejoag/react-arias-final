import { useCart } from '../../hooks/useCart';
import './CartItem.css'
const CartItem = ({id, name, quantity, price}) => {
  const { removeItem } = useCart();
  const handleRemove = (id) => {
    removeItem(id)
  }
  return (
    <article className="CardCart">
      <header className="HeaderCart">
        <h2 className="ItemHeaderCart">{name}</h2>
      </header>
      <section className="ContainerItemCart">
        <p className="ItemCart">Cantidad: {quantity}</p>
        <p className="ItemCart">Precio unitario: ${price}</p>
      </section>
      <footer className="ItemFooterCart">
        <p className="InfoCart">Subtotal: ${price * quantity}</p>
        <button className="btn btn-danger" onClick={() => handleRemove(id)}>
          Eliminar item
        </button>
      </footer>
    </article>
  );
}

export default CartItem
