import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Layout, Menu, Typography, Tooltip, Button, Row, Col, Drawer } from 'antd';
import { RouterPage } from '../Config';
import { SettingOutlined, AppstoreOutlined, DashboardOutlined, FileAddOutlined, UserOutlined } from '@ant-design/icons';
import Authenticate from '../services/Authenticate';
const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

const contentStyle = { background: '#fff', padding: 50, minHeight: '60vh' }

class PageLayout extends Component{
	constructor(props){
		super(props);		
		this.state = {
			visibleSettings: false,
			redirectLogin: false,
			comanyName: Authenticate.getComanyName(),
			menuOpenKey: [this.props.menuOpenKey || RouterPage.home]
		};
		this.onOpenSetting = this.onOpenSetting.bind(this);
		this.onCloseSetting = this.onCloseSetting.bind(this);
		this.onLogout = this.onLogout.bind(this);
		this.onOpenChange = this.onOpenChange.bind(this);
	}

	onOpenSetting(){
		this.setState({ visibleSettings: true });
	}

	onCloseSetting(){
		this.setState({ visibleSettings: false });
	}

	onLogout(){
		Authenticate.logOut();
		this.setState({ redirectLogin: true, visibleSettings: false });
	}

	onOpenChange(openKeys){
		const lastKey = openKeys.pop();		
        this.setState({ menuOpenKey: [lastKey] })
	}

    render(){		
		if(this.state.redirectLogin)
			return <Redirect to={RouterPage.account.login} />		
        return(
            <Layout>
				<Sider
					style={{ minHeight: '100vh' }}
				>
					<Menu
						theme='dark'
						mode="inline"
						defaultSelectedKeys={[this.props.menuKey || RouterPage.home]}
						openKeys={this.state.menuOpenKey}
						onOpenChange={this.onOpenChange}
						style={{ height: '100%' }}						
					>
						<Menu.Item key={RouterPage.home}>
							<DashboardOutlined />
							<span>Dashboard</span>
							<Link to={RouterPage.home} />
						</Menu.Item>
						<SubMenu key="catalogo"
							title={					
								<span>
									<AppstoreOutlined />
									<span>
										Catalogo
									</span>
								</span>
							}
						>
							<Menu.Item key={RouterPage.products.index}>								
								<AppstoreOutlined />
								<span>Productos</span>
								<Link to={RouterPage.products.index} />
							</Menu.Item>
							<Menu.Item key={RouterPage.category.index}>
								<AppstoreOutlined />
								<span>Categoria</span>
								<Link to={RouterPage.category.index} />
							</Menu.Item>
							<Menu.Item key={RouterPage.locations.index}>
								<AppstoreOutlined />
								<span>Bodegas</span>
								<Link to={RouterPage.locations.index} />
							</Menu.Item>
						</SubMenu>
						<Menu.Item key={RouterPage.sales.new}>
							<FileAddOutlined />
							<span>Nueva Venta</span>
							<Link to={RouterPage.sales.new} />
						</Menu.Item>
						<Menu.Item key={RouterPage.company.setting}>
							<SettingOutlined />
							<span>Configuración</span>
							<Link to={RouterPage.company.setting} />
						</Menu.Item>
					</Menu>
				</Sider>
				<Drawer
					title="Configuración"					
					onClose={this.onCloseSetting}
					visible={this.state.visibleSettings}
					bodyStyle={{ paddingBottom: 80 }}					
					>	
					<Button type="primary" onClick={this.onLogout}>
						Cerrar Sesión
					</Button>				
				</Drawer>
				<Layout>
					<Header>
						<Row>
							<Col span={12}>
								<Title style={{color: "white"}}>{this.state.comanyName}</Title>
							</Col>
							<Col span={12} push={10}>
								<Tooltip title="Perfil">
									<Button type="primary" shape="circle" onClick={this.onOpenSetting}>
										<UserOutlined />										
									</Button>
								</Tooltip>
							</Col>
						</Row>
					</Header>
					<Content 							
						style={{							
							padding: 24,
							margin: '24px 16px',												
						}}
					>
						<div style={contentStyle}>
							{this.props.children}
						</div>
					</Content>	
				</Layout>				
            </Layout>
        );
    }
}

export default PageLayout;