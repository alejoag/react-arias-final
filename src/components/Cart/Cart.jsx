import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart"
import CartItem from "../CartItem/CartItem";

const Cart = () => {
    const { cart, getTotal, totalQuantity } = useCart();
    const total = getTotal()
    console.log(total)

    if(totalQuantity === 0){
        return <h3 className="d-flex justify-content-center">No hay items agregados...</h3>
    }
  return (
    <div>
      {cart.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <h4 style={{ textAlign: "right", marginRight: "30px" }}>Total: $ {total}</h4>
      <div className="d-flex justify-content-end m-2 ">
        <Link to="/checkout" className="btn btn-success m-2">
          Finalizar compra
        </Link>
      </div>
    </div>
  );
}

export default Cart
