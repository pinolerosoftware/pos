import React, {Component} from 'react'
import { Tooltip, Row, Col, List, Button, Spin, Input, Card } from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined, SaveFilled } from '@ant-design/icons';
import PageLayout from '../../layout/PageLayout';
import { Api, RouterPage  } from '../../Config';
import { Notification, NotificationType } from '../../component/Notification';
import Authenticate from '../../services/Authenticate';
import HttpClient from '../../services/HttpClient';
const { Search } = Input;

class Sales extends Component {
    constructor(props){
        super(props);
        this.httpClient = new HttpClient();
        const authUserId = Authenticate.getUserId();
        const authCompanyId = Authenticate.getCompanyId();        
        this.state = {
            companyId: authCompanyId,
            userId: authUserId,
            products: [],
            productsFilter: [],
            sales: {
                userId: authUserId,
                companyId: authCompanyId,
                subTotal: 0,
                tax: 0,
                total: 0
            },
            salesDetails: [],
            loading: false,
            setting: {}
        };
        this.onClickAddProduct = this.onClickAddProduct.bind(this);
        this.listProduct = this.listProduct.bind(this);
        this.listProductAccion = this.listProductAccion.bind(this);
        this.listSalesDetails = this.listSalesDetails.bind(this);
        this.listAccionSalesDetails = this.listAccionSalesDetails.bind(this);
        this.onClickGuardar = this.onClickGuardar.bind(this);
        this.onChangeSearchProduct = this.onChangeSearchProduct.bind(this);
        this.onClickRemoveProductDetail = this.onClickRemoveProductDetail.bind(this);
        this.onClickQuitProductDetail = this.onClickQuitProductDetail.bind(this);
        this.onClickAddProductDetail = this.onClickAddProductDetail.bind(this);
    }

    componentDidMount(){
        this.loadProducts();
    }

    async loadProducts(){
        this.setState({ loading: true });
        const getHttpClient = this.httpClient;
        const data = await getHttpClient.get(Api.product);
        const urlSetting = `${Api.setting}${this.state.companyId}`;
        const setting = await getHttpClient.get(urlSetting);
        if(data){
            this.setState({ products: data, productsFilter: data, loading: false, setting: setting });
            return;     
        }
        if(getHttpClient.error){
            Notification('Error', getHttpClient.error, NotificationType.Error);
            this.setState({ loading: false });
        }
    }

    listSalesDetails(product){
        return(
            <List.Item
                key={product.productId}
                actions={this.listAccionSalesDetails(product)}
            >
                <List.Item.Meta
                    title={product.nameProduct}
                    description={`${this.state.setting.monedaSymbolo} ${product.unitPrice} Cant ${product.quantity}`}
                >                 
                </List.Item.Meta>
                <div>
                    {`${this.state.setting.monedaSymbolo} ${product.total}`}
                </div>
            </List.Item>
        );
    }

    listAccionSalesDetails(product){
        return [
            <Tooltip title="Agregar">
                <Button type="primary" onClick={() => this.onClickAddProductDetail(product)}>
                    <PlusOutlined />
                </Button>
            </Tooltip>,
            <Tooltip title="Restar">
                <Button type="primary" onClick={() => this.onClickRemoveProductDetail(product)}>
                    <MinusOutlined />
                </Button>
            </Tooltip>,
            <Tooltip title="Quitar">
                <Button type="primary" onClick={() => this.onClickQuitProductDetail(product)}>
                    <CloseOutlined />
                </Button>
            </Tooltip>
        ];
    }

    onClickAddProduct(product){
        let { sales ,salesDetails } = this.state;
        let productDetail = salesDetails.find(item => item.productId === product._id);
        if(productDetail){
            productDetail.quantity += 1;
            productDetail.unitPrice = Number(parseFloat(product.price).toFixed(this.state.setting.monedaCantidadDecimal));
            productDetail.total = Number(parseFloat(productDetail.quantity * productDetail.unitPrice).toFixed(this.state.setting.monedaCantidadDecimal));
        } else {
            salesDetails.push({
                productId: product._id,
                nameProduct: product.name,
                quantity: 1,
                unitPrice: Number(parseFloat(product.price).toFixed(this.state.setting.monedaCantidadDecimal)),
                total: Number(parseFloat(product.price).toFixed(this.state.setting.monedaCantidadDecimal))
            });
        }        
        this.summary(sales, salesDetails);
        this.setState({ salesDetails: salesDetails, sales: sales });
    }

    onClickAddProductDetail(product){
        let { sales ,salesDetails } = this.state;
        let productDetail = salesDetails.find(item => item.productId === product.productId);
        if(productDetail){
            productDetail.quantity += 1;
            productDetail.unitPrice = Number(parseFloat(product.unitPrice).toFixed(this.state.setting.monedaCantidadDecimal));
            productDetail.total = Number(parseFloat(productDetail.quantity * productDetail.unitPrice).toFixed(this.state.setting.monedaCantidadDecimal));
            this.summary(sales, salesDetails);
            this.setState({ salesDetails: salesDetails, sales: sales });
        }
    }

    onClickRemoveProductDetail(product){
        let { sales , salesDetails } = this.state;
        let productDetail = salesDetails.find(item => item.productId === product.productId);        
        if(productDetail && productDetail.quantity > 1){
            productDetail.quantity -= 1;
            productDetail.unitPrice = Number(parseFloat(product.unitPrice).toFixed(this.state.setting.monedaCantidadDecimal));
            productDetail.total = Number(parseFloat(productDetail.quantity * productDetail.unitPrice).toFixed(this.state.setting.monedaCantidadDecimal));
        } else {
            const index = salesDetails.indexOf(productDetail);
            salesDetails.splice(index, 1);
        }
        this.summary(sales, salesDetails);
        this.setState({ salesDetails: salesDetails, sales: sales });
    }

    onClickQuitProductDetail(product){
        let { sales , salesDetails } = this.state;
        let productDetail = salesDetails.find(item => item.productId === product.productId);        
        if(productDetail){
            const index = salesDetails.indexOf(productDetail);
            salesDetails.splice(index, 1);
            this.summary(sales, salesDetails);
            this.setState({ salesDetails: salesDetails, sales: sales });
        }        
    }

    summary(sales, salesDetails){
        let subTotal = 0;
        let tax = 0;
        let total = 0;
        salesDetails.forEach(item => {            
            subTotal += parseFloat(item.total);
        });
        tax = subTotal * (this.state.setting.taxPorcentage / 100);
        total = subTotal + tax;
        sales.tax = Number(tax.toFixed(this.state.setting.monedaCantidadDecimal));
        sales.subTotal = Number(subTotal.toFixed(this.state.setting.monedaCantidadDecimal));
        sales.total = Number(total.toFixed(this.state.setting.monedaCantidadDecimal));
    }

    listProduct(product){
        return(
            <List.Item 
                key={product._id}
                actions={this.listProductAccion(product)}
            >
                <List.Item.Meta
                    title={product.name}
                    description={product.description}                    
                >                                        
                </List.Item.Meta>
                <div>
                    {`${this.state.setting.monedaSymbolo} ${product.price}`}
                </div>                
            </List.Item>
        );
    }

    listProductAccion(product){
        return[
            <Tooltip title="Agregar">
                <Button type="primary" onClick={() => this.onClickAddProduct(product)}>
                    <PlusOutlined />
                </Button>
            </Tooltip>
        ];
    }

    listProductHeader(){
        return(
            <div>
                <Row>
                    <Search
                        placeholder="Buscar producto"
                        onSearch={this.onChangeSearchProduct}
                    />
                </Row>
            </div>
        );
    }

    onChangeSearchProduct(value){        
        const products = this.state.products;        
        const productsFilter = products.filter(item => item.name.toUpperCase().search(value.toUpperCase()) !== -1);
        this.setState({ productsFilter: productsFilter });
    }

    cardAcctionTotales(){
        return[
            <Tooltip title="SubTotal">
                {`${this.state.setting.monedaSymbolo} ${this.state.sales.subTotal}`}
            </Tooltip>,
            <Tooltip title="Iva">
                {`${this.state.setting.monedaSymbolo} ${this.state.sales.tax}`}
            </Tooltip>,
            <Tooltip title="Total">
                {`${this.state.setting.monedaSymbolo} ${this.state.sales.total}`}
            </Tooltip>
        ]
    }

    async onClickGuardar(){
        this.setState({ loading: true });
        const salesData = {
            sales: this.state.sales,
            salesDetails: this.state.salesDetails
        };
        const url = `${Api.sales}`;
        const postHttpClient = this.httpClient;
        const data = await postHttpClient.post(url, salesData);
        if(data){
            const dataClear = this.clearData();
            this.setState({ sales: dataClear.sales, salesDetails: dataClear.salesDetails, loading: false});
            return;
        }
        if(postHttpClient.error){
            Notification('Error', postHttpClient.error, NotificationType.Error);
            this.setState({ loading: false });
        }
    }

    clearData(){
        return {
            sales: {
                userId: this.state.userId,
                companyId: this.state.companyId,
                subTotal: 0,
                tax: 0,
                total: 0
            },
            salesDetails: []
        }
    }

    cardExtra(){
        return(
            <Tooltip title="Guardar Venta">
                <Button onClick={this.onClickGuardar}><SaveFilled /></Button>
            </Tooltip>
        );
    }

    render(){
        return(
            <PageLayout menuKey={RouterPage.sales.new}>
                <Spin spinning={this.state.loading}>
                    <Row>                        
                        <Col lg={{span: 10}} xs={{span:24}}>
                            <Card
                                title="Lista de productos"
                            >
                                <List
                                    dataSource={this.state.productsFilter}
                                    renderItem={this.listProduct}
                                    header={this.listProductHeader()}
                                >
                                </List>
                            </Card>
                        </Col>
                        <Col lg={{span: 10, offset: 2}} xs={{span:24}}>
                            <Card
                                title="Productos a pagar"
                                actions={this.cardAcctionTotales()}
                                extra={this.cardExtra()}
                            >
                                <List
                                    dataSource={this.state.salesDetails}
                                    renderItem={this.listSalesDetails}
                                >                                
                                </List>
                            </Card>
                        </Col>
                    </Row>
                </Spin>
            </PageLayout>
        );
    }
}

export default Sales;