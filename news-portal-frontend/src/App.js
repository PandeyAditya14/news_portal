import React from 'react';
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import NavbarComponent from './components/navbar/navbar';
import CardComponent from './components/card/card';
// import { render } from 'react-dom';
// import { Card , Button } from 'react-bootstrap';

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      country : null,
      category:null,
      query:null,
      data: []
    }
    this.callBack = this.callBack.bind(this)
    this.fetchData = this.fetchData.bind(this);
  }

 async fetchData(){
    var cou = this.state.country;
    var cat = this.state.category;
    var q = this.state.query;
    // console.log(this.state);
    var data = await Axios.post('http://localhost:8080/', {country : cou,category: cat,query:q})
    var res = await data.data
    this.setState({data:res},()=>{
      console.log(this.state.data)
    })

  }


  callBack = (category , query) => {
    // console.log("category: "+category +" query: " + query);
    this.setState({category:category , query:query},
      ()=>{
        this.fetchData()
      })
  
  }

  componentDidMount(){
    this.fetchData();
  }

  render(){
  return (
  <div className='wrapper'>
      <NavbarComponent parentCallback={this.callBack} fromParent={this.state}></NavbarComponent>
      <CardComponent renderList={this.state.data}></CardComponent>
      
  </div>

)
}
}

export default App;
