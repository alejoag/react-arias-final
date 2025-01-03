import { Link } from "react-router-dom";

const Item = ({product}) => {
    
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={product.img} style={{ width: 200, margin: "0 auto" }} className="card-img-top w-100" alt={product.name}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <Link to={`/detail/${product.id}`}>
          <button className="btn btn-primary rounded-pill">Ver más</button>
        </Link>
      </div>
    </div>
  );
}

export default Item
