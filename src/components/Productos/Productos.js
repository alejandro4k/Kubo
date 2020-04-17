import React,{Component} from 'react';
import Axios from 'axios';
let cardProducts;
let categoriasList;

class Productos extends Component{
    constructor(props) {
        super(props);
        this.state = {
          Listproductos: [],
          ListCategorias:[]
         
        };
      }
    componentDidMount(){
        Axios.get("http://localhost/ApiKubo/Productos/getAllProductos").then(response =>{
            this.setState({
                Listproductos:response.data
            })
        })
        Axios.get("http://localhost/ApiKubo/Categorias/getAllCategorias").then(response =>{
            this.setState({
                ListCategorias:response.data
            })
        })
    }
    filterProductos(e,id_categoria){
        e.preventDefault();
        
       
       if(id_categoria!=0){

           Axios.get('http://localhost/ApiKubo/Productos/getFilterProductos', {
               params: {
                 id_categoria: id_categoria
               }
             }).then(response =>{
               this.setState({Listproductos:response.data})
             })
       }else{
        Axios.get("http://localhost/ApiKubo/Productos/getAllProductos").then(response =>{
            this.setState({
                Listproductos:response.data
            })
        })

       }

    }
    goToDetail(e,id_producto){
        e.preventDefault();
        this.props.changeCompt(2)
        this.props.getIdProducto(id_producto);
    }
    addToCard(e,id_producto){
        e.preventDefault();
        var dataform = new FormData();
        dataform.append('id_producto',id_producto);
        Axios.post("http://localhost/ApiKubo/Carrito/addToCard",dataform).then(response=>{
            if(response.data.status){
                alert("producto agregado al carrito");

            }else{
                alert(response.data.msj)
            }
        })
    
    }

    render(){
        if(this.state.Listproductos){
            cardProducts = this.state.Listproductos.map(e=>{
                return <div className="col-lg-4 col-sm-6">
                <div className="product-item">
                    <div className="pi-pic">
                        <img className="pointer" onClick={(c)=> this.goToDetail(c,e.id_producto)} src={e.img} alt=""/>
                        <div className="pi-links">
                            <a href="#" className="add-card" onClick={(c)=>this.addToCard(c,e.id_producto)}><i className="flaticon-bag"></i><span>ADD TO CART</span></a>
                            <a href="#" className="wishlist-btn"><i className="flaticon-heart"></i></a>
                        </div>
                    </div>
                    <div className="pi-text">
            <h6>${e.precio}</h6>
            <p>{e.nombre}</p>
                    </div>
                </div>
            </div>
            })

        }
        if(this.state.ListCategorias){
            categoriasList = this.state.ListCategorias.map(e=>{
            return <li value={e.id_categoria} id={e.id_categoria}><a onClick={(c)=>this.filterProductos(c,e.id_categoria)}>{e.nombre}</a></li>
            })

        }
        return(
            <section className="category-section spad">
		<div className="container">
			<div className="row">
				<div className="col-lg-3 order-2 order-lg-1">
					<div className="filter-widget">
						<h2 className="fw-title">Categories</h2>
						<ul className="category-menu" id="categorialist">
							{categoriasList}
                            <li><a onClick={(e)=> this.filterProductos(e,0)}>Sin filtros</a></li>
						</ul>
					</div>
					
					
	
				</div>

				<div className="col-lg-9  order-1 order-lg-2 mb-5 mb-lg-0">
					<div className="row">
					
							{cardProducts}
						
						<div className="text-center w-100 pt-3">
							<button className="site-btn sb-line sb-dark">LOAD MORE</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
        )
    }
}
export default Productos;