import React,{Component} from 'react';
import Menu from './Menu/Menu';
import Carrito from './Carrito/Carrito';
import Productos from './Productos/Productos';
import DetalleProducto from './Productos/Detalle'
class ComponentMaster extends Component{
    constructor(props) {
        super(props);
        this.state = {
          changeCompt: 0,
          id_producto: 0
         
        };
      }
      changeComponent(value){
          this.setState({
              changeCompt:value
          })
      }
      getIdProducto(value){
          this.setState({
              id_producto:value
          })
      }
    showComponent = () => {
        switch (this.state.changeCompt) {
          case 0:
            return <Productos changeCompt={this.changeComponent.bind(this)} getIdProducto={this.getIdProducto.bind(this)}/>;
            break;
          case 1:
            return <Carrito/>;
            break;
            case 2:
            return <DetalleProducto idProducto={this.state.id_producto}/>;
            break;
        }
      };
    render(){
        return <div className="mainComponent">
            <Menu changeCompt={this.changeComponent.bind(this)}/>
            {this.showComponent()}

            </div>;
    }
}
export default ComponentMaster;