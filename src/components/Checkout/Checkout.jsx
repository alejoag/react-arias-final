import { useState } from "react"
import { useCart } from "../../hooks/useCart"
import { addDoc, collection, documentId, getDocs, query, where, writeBatch } from "firebase/firestore"
import { db } from "../../services/firebase"


const Checkout = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const [loading, setLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);

  const { cart, totalQuantity, getTotal, clearCart } = useCart();
  const total = getTotal();

  const createOrder = async () => {
    setLoading(true);
    try {
      const objOrder = {
        buyer: {
          firstName: nombre,
          lastName: apellido,
          phone: telefono,
          addres: direccion,
        },
        items: cart,
        totalQuantity,
        total,
        date: new Date(),
      };

      const ids = cart.map((item) => item.id);

      const productRef = collection(db, "products");

      const productsAddedFromFirestore = await getDocs(
        query(productRef, where(documentId(), "in", ids))
      );
      const { docs } = productsAddedFromFirestore;

      const outOfStock = [];
      const batch = writeBatch(db);

      docs.forEach((doc) => {
        const dataDoc = doc.data();
        const stockDB = dataDoc.stock;

        const productAddedToCart = cart.find((prod) => prod.id === doc.id);
        const productQuantity = productAddedToCart?.quantity;

        if (stockDB >= productQuantity) {
          batch.update(doc.ref, { stock: stockDB - productQuantity });
        } else {
          outOfStock.push({ id: doc.id, ...dataDoc });
        }
      });

      if (outOfStock.length === 0) {
        await batch.commit();

        const orderRef = collection(db, "orders");
        const orderAdded = await addDoc(orderRef, objOrder);
        console.log(`El id de su orden es ${orderAdded.id}`);
        

        setOrderCreated(true);
        clearCart();
      } else {
        console.log("Hay productos seleccionado que estan fuera de stock");
      }
    } catch (error) {
      console.log("");
    } finally {
      setLoading(false);
    }

    if (loading) {
      return <h1>Se esta generando la orden</h1>;
    }

    if (orderCreated) {
      return <h1>La orden fue creada correctamente</h1>;
    }
  };

  return (
    <>
      {}
      <h1 className="text-center">Finalizar compra</h1>
      <div className="d-flex w-50 flex-column justify-content-center p-3 " >
      <label htmlFor="nombre">Nombre: </label>
      <input onChange={(e) => setNombre(e.target.value)} value={nombre} />{" "}
      <br />
      <label htmlFor="apellido">Apellido: </label>
      <input onChange={(e) => setApellido(e.target.value)} value={apellido} />
      <br />
      <label htmlFor="telefono">Telefono: </label>
      <input onChange={(e) => setTelefono(e.target.value)} value={telefono} />
      <br />
      <label htmlFor="direccion">Dirección: </label>
      <input onChange={(e) => setDireccion(e.target.value)} value={direccion} />
      </div>
      <div>
        {cart.map((item) => (
          <article key={item.id}>
            <header >
              <h2 style={{color:"white", fontSize:"15px", paddingLeft: "25px"}} className="text-start bg-success m-5">
                {item.name}{" "}
                <span style={{color:"white", fontSize:"15px"}} > - Cantidad: {totalQuantity}</span>
              </h2>
            </header>
          </article>
        ))}
      </div>
      
      {}
      <div className="d-flex justify-content-center p-3 ">
        <button className="btn btn-success rounded-pill" onClick={createOrder}>
          Enviar pedido
        </button>
      </div>
    </>
  );
}

export default Checkout
