import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar , Nav ,NavDropdown , Form , FormControl , Button} from 'react-bootstrap';

class NavbarComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.fromParent.category,
            query: this.props.fromParent.query
        };
        console.log(this.state)
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }  
      handleChange(event) {
        this.setState({query: event.target.value});
        // console.log(event.target.value);
      }
    
      handleSubmit(event) {
        console.log(this.state.query)
        event.preventDefault();
        this.props.parentCallback(null,this.state.query)
        }
      
      onSelect(event){
        let quer_str = event.target.innerHTML
        quer_str = quer_str.toLowerCase()
        if(quer_str === "news-portal"){
            this.setState({category:""})
            quer_str=""
        }
        else{
            this.setState({category:quer_str})    
        }
        this.props.parentCallback(quer_str,null)
        }

    function

    render(){
        return(    
            <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand onClick={this.onSelect}>News-Portal</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link onClick={this.onSelect}>Science</Nav.Link>
                <Nav.Link onClick={this.onSelect}>Technology</Nav.Link>
                <Nav.Link onClick={this.onSelect}>Business</Nav.Link>
                <NavDropdown bg="dark" variant="dark" title="More" id="responsive-navbar-nav">
                    <NavDropdown.Item onClick={this.onSelect}>Health</NavDropdown.Item>
                    <NavDropdown.Item onClick={this.onSelect}>Entertainment</NavDropdown.Item>
                    <NavDropdown.Item onClick={this.onSelect}>General</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Form onSubmit={this.handleSubmit} inline>
                    <FormControl value={this.state.value} onChange={this.handleChange} type="text" placeholder="Search" className="mr-sm-2" />
                    <Button type="submit" variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
        )    
    }
}
export default NavbarComponent;