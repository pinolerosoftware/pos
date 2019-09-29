import React, {Component} from 'react'
import { Input, Card, Icon, Row, Col, List, Button } from 'antd';

const { Meta } = Card;
const ButtonGroup = Button.Group;

class Sales extends Component {
    constructor(props){
        super(props)
        this.state = {
            products: [],
            loading: false,
            list: [],
            shoppingList: [],
            total: 0
        }
        this.onChange = this.onChange.bind(this);
        this.addToCar = this.addToCar.bind(this);
        this.removeToCar = this.removeToCar.bind(this);
        this.increase = this.increase.bind(this);
        this.decline = this.decline.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
    }

    componentDidMount(){
        this.onGetData();
    }

    onGetData(){
        fetch(`${process.env.REACT_APP_PROXY}/products`)
        .then(res => res.json())
        .then(data => this.setState({products: data.Products, list: data.Products, loading: false}))
    }

    onChange(value){
        let {products, list} = this.state;
        list = []
        list = products.filter(item => String(item.name.toUpperCase()).includes(value.toUpperCase()) || String(item.description.toUpperCase()).includes(value.toUpperCase()))
        this.setState({list});
    }
    
    addToCar(item){
        let {shoppingList, total} = this.state
        if(!shoppingList.find(product => product._id === item._id)){
            item = {...item, quantity: 1}
            shoppingList = [...shoppingList, item]
            this.setState({shoppingList, total}, () => this.calculateTotal())
        }
    }

    removeToCar(item){
        let {shoppingList, total} = this.state
        let list = [];
        shoppingList.find(product => {
            if(product._id !== item._id)
                list.push(product)

            return false;
        });
        this.setState({shoppingList: list, total}, () => this.calculateTotal());
    }

    increase(id) {
        let {shoppingList} = this.state
        shoppingList.map(item =>{
            if(item._id === id)
                item.quantity++
            
            return true
        })
        this.setState(shoppingList, () => this.calculateTotal())
    }

    decline(id) {
        let {shoppingList} = this.state
        shoppingList.map(item =>{
            if(item._id === id && item.quantity > 1)
                item.quantity--

            return true
        })
        this.setState(shoppingList, () => this.calculateTotal())
    }

    calculateTotal() {
        let {shoppingList, total} = this.state
        total = 0
        shoppingList.map(item => total += (item.price * item.quantity))
        this.setState({total})
    }

    render(){
        let {list, shoppingList, total} = this.state;
        return (
            <Row>
                <Col span={16}>
                    <Col span={16} offset={2} style={{marginBottom: 15}}>
                        <Input size="large" placeholder="Buscar" onChange={e => this.onChange(e.target.value)}/>
                    </Col>

                    {list.map(item => 
                        <Col span={7} key={item._id}>
                            <Card hoverable style={{ width: 200, marginTop: 10 }} onClick={() =>this.addToCar(item)} cover={
                                <Icon type="shop" style={{fontSize: "9em", marginTop: 5}} />
                            }>
                                <Meta style={{whiteSpace: "nowrap"}} title={item.name} description={item.description}/>
                            </Card>
                        </Col>
                    )}
                </Col>
                <Col span={8}>
                    <section>
                        {/* <h2>Caja</h2>
                        <br/> */}
                        <List
                            header={
                                <section>
                                    <Row>
                                        <Col span={16}>
                                            <h3>Producto</h3>
                                        </Col>
                                        <Col span={4}>
                                            <h3>Cantidad</h3>
                                        </Col>
                                    </Row>
                                </section>
                            }
                            dataSource={shoppingList}
                            renderItem={item => (
                                <List.Item style={{cursor:"pointer"}}>
                                    <Col span={12} onClick={() => this.removeToCar(item)}>
                                        <h3>{item.name}</h3>
                                    </Col>
                                    <Col span={4}>
                                        <h3>{item.quantity}</h3>
                                    </Col>
                                    <Col span={8}>
                                        <ButtonGroup>
                                            <Button onClick={() => this.decline(item._id)}>
                                                <Icon type="minus" />
                                            </Button>
                                            <Button onClick={() => this.increase(item._id)}>
                                                <Icon type="plus" />
                                            </Button>
                                        </ButtonGroup>
                                    </Col>
                                </List.Item>
                            )}
                        >
                            <List.Item style={{cursor:"pointer"}}>
                                <h3>Total: {total}</h3>
                            </List.Item>
                        </List>
                        <Row style={{textAlign: "right"}}>
                            <br/>
                            <Button type="primary">Pagar</Button>
                        </Row>
                    </section>
                </Col>        
            </Row>
        )
    }
}


export default Sales