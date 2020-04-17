import React, { Component } from "react";
import Axios from "axios";
import "./Carrito.css";
let ProductosCard;
class Carrito extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      totalPrice: 0,
    };
  }
  componentDidMount() {
    Axios.get("https://apikubo.herokuapp.com/Carrito/getProductsFromCard").then(
      (response) => {
        this.setState({ productos: response.data });
        if (this.state.productos) {
          var total = 0;
          this.state.productos.map((e) => {
            total = total + parseInt(e.precio);
          });
          this.setState({
            totalPrice: total,
          });
        }
      }
    );
  }
  increment(e, idInput, precio) {
    e.preventDefault();
    document.getElementById(idInput).stepUp(1);
    var totalprice = this.state.totalPrice;
    var precioparse = parseInt(precio);
  
    totalprice = totalprice+precioparse;
   
    this.setState({totalPrice:totalprice})
  }
  decrement(e, idInput, precio) {
    e.preventDefault();
    var value = document.getElementById(idInput).value
    if(value>1){

        document.getElementById(idInput).stepDown(1);
        var totalprice = this.state.totalPrice;
        var precioparse = parseInt(precio);
      
        totalprice = totalprice-precioparse;
       
        this.setState({totalPrice:totalprice})
    }
  }
  comprar(e){
      e.preventDefault();
      if(this.state.totalPrice>0){

          var ventaData = new FormData();
          ventaData.append("total",this.state.totalPrice);
    
          Axios.post("https://apikubo.herokuapp.com/Carrito/saveCompra",ventaData).then(res =>{
              if(res.data){
                  alert("compra exitosa.")
                  Axios.get("https://apikubo.herokuapp.com/Carrito/getProductsFromCard").then(
                    (response) => {
                      this.setState({ productos: response.data });
                      if (this.state.productos) {
                        var total = 0;
                        this.state.productos.map((e) => {
                          total = total + parseInt(e.precio);
                        });
                        this.setState({
                          totalPrice: total,
                        });
                      }
                    }
                  );
              }else{
                  alert("error al realizar la compra intente nuevamente.")
              }
          })
      }else{
          alert("debes agregar algo al carrito")
      }
  }

  render() {
    if (this.state.productos) {
        
      ProductosCard = this.state.productos.map((e) => {
        return (
          <tr>
            <td className="product-col">
              <img src={e.img} alt="" />
              <div className="pc-title">
                <h4>{e.nombre}</h4>
                <p>${e.precio}</p>
              </div>
            </td>
            <td className="quy-col">
              <div className="quantity">
                <div className="pro-qty">
                  <div className="row">
                    <div className="col-6">
                      <input id={e.id_producto} type="number" min="1" defaultValue="1" />
                    </div>
                    <div className="col-6">
                      <div className="containerbtn">
                        <a
                          className="iconForm"
                          onClick={(c) =>
                            this.increment(c, e.id_producto, e.precio)
                          }
                        >
                          +
                        </a>

                        <a
                          className="iconForm"
                          onClick={(c) =>
                            this.decrement(c, e.id_producto, e.precio)
                          }
                        >
                          -
                        </a>
                      </div>
                    </div>
                  </div>

                  {/*
                  
                    */}
                </div>
              </div>
            </td>
            <td className="total-col">
              <h4>${e.precio}</h4>
            </td>
          </tr>
        );
      });
    }else{
        ProductosCard= <h3>No hay productos agregados.</h3>
        
    }
    return (
      <section className="cart-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="cart-table">
                <h3>Your Cart</h3>
                <div className="cart-table-warp">
                  <table>
                    <thead>
                      <tr>
                        <th className="product-th">Product</th>
                        <th className="quy-th">Quantity</th>
                        <th className="total-th">Price</th>
                      </tr>
                    </thead>
                    <tbody>{ProductosCard}</tbody>
                  </table>
                </div>
                <div className="total-cost">
                  <h6>
                    Total <span>{this.state.totalPrice}</span>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 card-right">
              
              <button href="" id="btnComprar" className="site-btn" onClick={(e)=> this.comprar(e)}>
                Comprar
              </button>
              <a href="" className="site-btn sb-dark">
                Continue shopping
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Carrito;
