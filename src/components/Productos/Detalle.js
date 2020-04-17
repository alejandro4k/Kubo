import React, { Component } from "react";
import Axios from "axios";
import "./Productos.css";
class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Producto: [],
    };
  }
  componentDidMount() {
    Axios.get("http://localhost/ApiKubo/Productos/getInfoProducto", {
      params: {
        id_producto: this.props.idProducto,
      },
    }).then((response) => {
      this.setState({ Producto: response.data });
    });
  }
  saveCompra(e){
      e.preventDefault();
      var dataform = new FormData();
      var Cantidad = document.getElementById("cantidad").value
      var total = this.state.Producto.precio*Cantidad
      alert(total);
      
      dataform.append("total",total)
      Axios.post("http://localhost/ApiKubo/Carrito/saveCompra",dataform).then(res=>{
          if(res.data){
              alert("compra exitosa");
          }else{
              alert("intentalo de nuevo.")
          }
      })
  }
  render() {
    return (
      <section className="product-section">
        <div className="container">
          <div className="back-link">
            <a href="./category.html"> &lt;&lt; Back to Category</a>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="product-pic-zoom">
                <img
                  className="product-big-img"
                  src={this.state.Producto.img}
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6 product-details">
              <h2 className="p-title">{this.state.Producto.nombre}</h2>
              <h3 className="p-price">{this.state.Producto.precio}</h3>
              <h4 className="p-stock">
                Available: <span>In Stock</span>
              </h4>
              <div className="p-rating">
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o"></i>
                <i className="fa fa-star-o fa-fade"></i>
              </div>
              <div className="p-review">
                <a href="">3 reviews</a>|<a href="">Add your review</a>
              </div>

              <div className="quantity">
                <p>Cantidad</p>
                <div className="pro-qty">
                  <input
                    type="number"
                    min="1"
                    step="1"
                    defaultValue="1"
                    id="cantidad"
                    
                    required
                  />
                </div>
              </div>
              <a className="site-btn" onClick={(e)=> this.saveCompra(e)}>
                Comprar
              </a>
              <div id="accordion" className="accordion-area">
                <div className="panel">
                  <div className="panel-header" id="headingOne">
                    <button
                      className="panel-link active"
                      data-toggle="collapse"
                      data-target="#collapse1"
                      aria-expanded="true"
                      aria-controls="collapse1"
                    >
                      information
                    </button>
                  </div>
                  <div
                    id="collapse1"
                    className="collapse show"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div className="panel-body">
                      <p>{this.state.Producto.descripcion}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Detalle;
