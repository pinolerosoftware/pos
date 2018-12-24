import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrincipalProducts from './modules/PrincipalProducts';
import PrincipalClients from './modules/PrincipalClients';
import Dashboard from './modules/dashboard/Dashboard';
import Sales from './modules/sales/Sales'

const { Header, Content, Sider } = Layout;
const icoStyle = {
	fontSize: "1.8em", 
	float: "right", 
	marginTop: "10px", 
	marginRight: "20px",
	borderRadius: "50%",
	background: "#aaa",
	color: "#efefef",
	padding: 5,
	cursor: "pointer"
}

const ListMenu = [{
		to: "/",
		icon: "appstore",
		text: "Dashboard"
	},{
		to: "/products",
		icon: "appstore",
		text: "Productos"
	},{
		to: "/clients",
		icon: "appstore",
		text: "Clientes"
	},{
		to: "/sales",
		icon: "appstore",
		text: "Ventas"
	}
]

class App extends Component {
	constructor(props){
		super(props);
		
		this.state = {
		  collapsed: false,
		};
	}

	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	}

	render() {
		return (
			<Router>
				<Layout style={{ minHeight: '100vh' }}>
					<Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
						<div className="logo" />
						<Menu theme="dark" defaultSelectedKeys={[`/${window.location.pathname.split('/')[1]}`]} mode="inline">
							{ListMenu.map(item => {
								return <Menu.Item key={item.to}>
											<Link to={item.to}>
												<Icon type={item.icon} />
												<span>{item.text}</span>
											</Link>
										</Menu.Item>
							})}
						</Menu>
					</Sider>
					<Layout>
						<Header style={{ background: '#fff', padding: 0 }}>
							<Icon type="user" style={icoStyle}/>
						</Header>
							<br />
							<Content style={{ margin: '0 16px' }}>
								<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
									<Switch>
										<Route path="/" exact component={Dashboard} />
										<Route path="/products" component={PrincipalProducts} />
										<Route path="/clients" component={PrincipalClients} />
										<Route path="/sales" component={Sales} />
									</Switch>
								</div>
							</Content>
					</Layout>
				</Layout>
			</Router>
		);
	}
}

export default App;
