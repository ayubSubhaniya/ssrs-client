import React, {Component} from 'react';
import _ from "lodash"
import CartDetails from "./CartDetails";

class CartList extends Component {
    render() {
        const {carts,...others} = this.props;
        return (
            <section className={`orders cd-gallery ${this.props.isFilterVisible?'filter-is-visible':''}`}>
                {
                    _.map(carts, (cart, i) => {
                        return (
                            <CartDetails key={cart._id}
                                         cart={cart}
                                         index={i}
                                         {...others}/>
                        )
                    })
                }
            </section>
        );
    }
}


export default CartList;

