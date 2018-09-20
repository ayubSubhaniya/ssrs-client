import React from 'react'
import NavigationBar from "../../NavigationBar";
import Stapes from "../../service/Stapes";
import {Link, Redirect} from "react-router-dom";

class Payment extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isPaymentDone: false
        }
    }

    pay = () => {
        this.setState({
            isPaymentDone: true
        })
    }

    render() {
        if(this.state.isPaymentDone){
            return (
                <Redirect to={{
                pathname: "/order"
            }}/>
                )
        }
        return (
            <div>
                <NavigationBar/>
                <Stapes active={3}/>
                <div className={'container'}>
                    <Link to={'/order'}>
                        <div className="btn btn-success">
                            {"Pay"}
                            <i className="fa fa-angle-right"></i>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Payment
