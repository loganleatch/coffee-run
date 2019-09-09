import React, { Component } from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import {
  selectLocation, selectOrder, createOrder, selectOrCreateOrder, selectCoffeeForOrder
} from '../actions'

import {
  locations, coffeeTypes, orderWindows
} from '../config'

const mapStateToProps = (state, ownProps) => {
  const {selectedLocation, orders, selectedOrder} = state

  return {
    selectedLocation: selectedLocation ? locations.find((loc)=>{return loc.id == selectedLocation}) : null,
    selectedOrder: selectedOrder ? orders.find((ord)=>{return ord.windowId == selectedOrder}) : null,
    orders
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps);
  return {
    onLocationClick: (id) => {
      dispatch(selectLocation(id))
    },
    onOrderWindowClick: (id) => {
      dispatch(selectOrCreateOrder(id))
    },
    onCoffeeClick: (windowId, coffeeId) => {
      dispatch(selectCoffeeForOrder(windowId, coffeeId))
    }
  }
}


class OfficeOrder extends Component {
  constructor(props) {
    super(props)
  }

  selectedCoffeeOrder(order) {
    console.log(order);
    return order ? order.coffeeId : null
  }

  render() {
    const {selectedLocation, selectedOrder, onLocationClick, onOrderWindowClick, onCoffeeClick} = this.props
    return (
      <div>
        <Jumbotron>
        <h1>Coffee Run</h1>
        <p>
          Hot Coffee at your fingertips
        </p>
        </Jumbotron>
          <Container>
            <Row>
              <Col md="auto">
                <Tab.Container id="left-tabs-example">
                  <Row>
                    <Col>
                      <h4>Location</h4>
                      <Nav variant="pills" className="flex-column" onSelect={onLocationClick}>
                            {locations ? locations.map((location, index) => {
                              return (
                                <Nav.Item key={location.id}>
                                  <Nav.Link eventKey={location.id}>
                                    {location.name}
                                  </Nav.Link>
                                </Nav.Item>
                              )
                            }) : ''}
                      </Nav>
                    </Col>
                  </Row>
                </Tab.Container>
              </Col>
              <Col md="auto">
                <Tab.Container id="left-tabs">
                  <Row>
                    <Col>
                    <h4>Time</h4>
                      <Nav variant="pills" className="flex-column" onSelect={onOrderWindowClick}>
                        {orderWindows ? orderWindows.map((window, index) => {
                          return (
                            <Nav.Item key={index}>
                              <Nav.Link disabled={!selectedLocation} eventKey={window.id}>{window.name}</Nav.Link>
                            </Nav.Item>
                          )
                        }) : ''}
                      </Nav>
                    </Col>
                  </Row>
                </Tab.Container>
              </Col>
              <Col md="auto">
                <Tab.Container id="left-tabs-example">
                  <Row>
                    <Col>
                    <h4>Coffee</h4>
                      <Nav variant="pills" className="flex-column" onSelect={onCoffeeClick}>
                        {coffeeTypes ? coffeeTypes.map((coffee, index) => {
                          return (
                            <Nav.Item key={index}>
                              <Nav.Link disabled={!selectedOrder} active={this.selectedCoffeeOrder(selectedOrder) == coffee.id} eventKey={coffee.id}>{coffee.name}</Nav.Link>
                            </Nav.Item>
                          )
                        }) : ''}
                      </Nav>
                    </Col>
                  </Row>
                </Tab.Container>
              </Col>
              <Col>
              <ListGroup>
                <ListGroup.Item variant="dark">Your Orders</ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                  <Col>
                  08:00 - Long Black
                  </Col>
                  <Col md="auto">
                  <Button variant="outline-secondary" size="sm">
                    Clear
                  </Button>
                  </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                <Row>
                <Col>
                  14:00 - Mocha
                  </Col>
                  <Col md="auto">
                  <Button variant="outline-secondary" size="sm">
                    Clear
                  </Button>
                  </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
              </Col>
            </Row>
          </Container>
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfficeOrder)
