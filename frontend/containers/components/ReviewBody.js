import React from "react";
import SideNav from "./SideNav";
import Inputfield from "./Inputfield";
import Card from "./Card";
import Footer from "./Footer";
import axios from 'axios';
import { connect } from 'react-redux';

class ReviewBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: [],
      
    }
    //this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate(val) {
    this.setState({
      courses: val
    })
    
  }

  componentWillMount() {

    console.log(location.search);

    var self=this;
    axios.get('/test'+location.search)
        .then(function (response) {
          
            self.setState({
              courses:response.data
              
            })
          
           
           //console.log(response.data);

          //window.location.replace(location.search)
          //windows.location = 
          //this.props.history.push('/search');
          
        })
        .catch(function (error) {
          console.log(error);
        });

  }


  render() {
    console.log(this.state.courses);
    var cards = [];
    for (var i = 0; i < this.state.courses.length; i++) {
      cards.push(<Card cnum= {this.state.courses[i].course_num} cname={this.state.courses[i].course_name} key={i}/>);
      console.log(this.state.courses[i]);
    }
    return (
      <div>
        <SideNav />
        <div
          style={{
            margin: "0 auto",
            marginLeft: 15,
            paddingTop: 15
          }}
        >
          <nav
            className
            style={{
              background: "white",
              width: "98%"
            }}
          >
            <div className="nav-wrapper">
              <form>
                <Inputfield/>
              </form>
            </div>
          </nav>
        </div>
        <div
          style={{
            height: 30
          }}
        />
        <div
          style={{
            margin: "0 auto",
            marginLeft: 15
          }}
        >
          <h5
            style={{
              fontWeight: 300
            }}
          >
            Showing Results for CS370
          </h5>
        </div>
        <div
          style={{
            height: 20
          }}
        />
        <div className="container"
          style={{
            width: "95%"
          }}
        >
          <div className="row">
            <div className="col s12">

              {cards}
              
            </div>
          </div>
          <div
            style={{
              height: 580
            }}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{ 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewBody);
