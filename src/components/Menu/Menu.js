import React, { Component } from "react";
import './Menu.css'
class Menu extends Component {
  render() {
    return (
        <header className="header-section">
		<div className="header-top">
			<div className="container">
				<div className="row">
					<div className="col-lg-2 text-center text-lg-left">
						
						<a href="./index.html" className="site-logo">
							<img className="img-logo" src="img/Logo.jpg" alt=""/>
						</a>
					</div>
					<div className="col-xl-6 col-lg-5">
						<form className="header-search-form">
							<input type="text" placeholder="Buscar en kubo ...."/>
							<button><i className="flaticon-search"></i></button>
						</form>
					</div>
					<div className="col-xl-4 col-lg-5">
						<div className="user-panel">
						
							<div className="up-item">
								<div className="shopping-card">
									<i className="flaticon-bag"></i>
									
								</div>
								<a href="#" onClick={()=> this.props.changeCompt(1)}>Shopping Cart</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<nav className="main-navbar">
			<div className="container">
				
				<ul className="main-menu">
					<li><a href="#"  onClick={()=> this.props.changeCompt(0)}>Home</a></li>
					
				</ul>
			</div>
		</nav>
	</header>
    );
  }
}
export default Menu;
