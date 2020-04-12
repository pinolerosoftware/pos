import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import { RouterPage } from '../Config';
const { Header, Footer, Sider, Content } = Layout;
/*import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrincipalProducts from './modules/PrincipalProducts';
import Dashboard from './modules/dashboard/Dashboard';
import Sales from './modules/sales/Sales';*/
//import PrincipalClients from './modules/PrincipalClients';
//import CheckIn from './modules/checkIn/CheckIn';
//import Home from './modules/principal/Home';

class PageLayout extends Component{
    render(){
        return(
            <Layout>
                <Sider>
					<Menu
						theme='dark'
					>
						<Menu.Item key={RouterPage.home}>
							<Icon type='dashboard' />
							<span>Dashboard</span>
							<Link to={RouterPage.home} />
						</Menu.Item>
					</Menu>
				</Sider>
                <Layout>
                    <Header>Canesera</Header>
                    <Content>
                        {this.props.children}
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default PageLayout;

/*const { Header, Content, Sider } = Layout;
const icoStyle = {
	float: "right", 
	marginTop: "10px", 
	marginRight: "20px",
	borderRadius: "50%",
	cursor: "pointer"
}

const ListMenu = [
	{
		to: "/",
		icon: "appstore",
		text: "Dashboard"
	},{
		to: "/products",
		icon: "appstore",
		text: "Productos"
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
			<div>
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
							<Avatar size="large" icon="user" style={icoStyle}/>
						</Header>
							<br />
							<Content style={{ margin: '0 16px' }}>
								<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
									<Switch>
										<Route path="/" exact component={Dashboard} />
										<Route path="/products" component={PrincipalProducts} />
										<Route path="/sales" component={Sales} />
									</Switch>
								</div>
							</Content>
					</Layout>
				</Layout>
			</Router>			
			</div>
		);
	}
}

export default App;*/