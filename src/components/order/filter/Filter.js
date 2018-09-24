import React, {Component} from 'react';
import NavigationBar from "../../NavigationBar";
import Header from "../../Header";
import OrderList from "./../OrderList";
import {asyncFetch} from "../../../helper/FetchData";
import Spinner from "../../Spinner";


class Filter extends Component {
    constructor(props) {
        super(props);
        this.state={
            showSpinner: false,
            isFilterVisible: false,
            order: []
        }
        this.asyncFetch = asyncFetch.bind(this);
    }

    componentDidMount(){
        this.asyncFetch('order');
    }

    showFilter = () => {
        this.setState({
            isFilterVisible: true
        })
    }
    hideFilter = () => {
        this.setState({
            isFilterVisible: false
        })
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <Header title={'Orders'}/>
                <main className="cd-main-content">
                    <div className="cd-tab-filter-wrapper">
                        <div className="cd-tab-filter">
                            <ul className="cd-filters">
                                <li className="placeholder">
                                    <a data-type="all" href="#0">All</a>
                                </li>
                                <li className="filter"><a className="selected" href="#0" data-type="all">All</a></li>
                                <li className="filter" data-filter=".color-1"><a href="#0" data-type="color-1">Color
                                    1</a></li>
                                <li className="filter" data-filter=".color-2"><a href="#0" data-type="color-2">Color
                                    2</a></li>
                            </ul>
                        </div>
                    </div>

                    <section className="cd-gallery">
                        <ul>
                            {/*<li className="mix color-1 check1 radio2 option3"><img src="img/img-1.jpg" alt="Image 1"/>*/}
                            {/*</li>*/}
                            {/*<li className="mix color-2 check2 radio2 option2"><img src="img/img-2.jpg" alt="Image 2"/>*/}
                            {/*</li>*/}
                            {/*<li className="mix color-1 check3 radio3 option1"><img src="img/img-3.jpg" alt="Image 3"/>*/}
                            {/*</li>*/}
                            {/*<li className="mix color-1 check3 radio2 option4"><img src="img/img-4.jpg" alt="Image 4"/>*/}
                            {/*</li>*/}
                            {/*<li className="mix color-1 check1 radio3 option2"><img src="img/img-5.jpg" alt="Image 5"/>*/}
                            {/*</li>*/}
                            {/*<li className="mix color-2 check2 radio3 option3"><img src="img/img-6.jpg" alt="Image 6">*/}
                            {/*</li>*/}
                            {/*<li className="mix color-2 check2 radio2 option1"><img src="img/img-7.jpg" alt="Image 7">*/}
                            {/*</li>*/}
                            {/*<li className="mix color-1 check1 radio3 option4"><img src="img/img-8.jpg" alt="Image 8">*/}
                            {/*</li>*/}
                            {/*<li className="mix color-2 check1 radio2 option3"><img src="img/img-9.jpg" alt="Image 9">*/}
                            {/*</li>*/}
                            {/*<li className="mix color-1 check3 radio2 option4"><img src="img/img-10.jpg" alt="Image 10">*/}
                            {/*</li>*/}
                            {/*<li className="mix color-1 check3 radio3 option2"><img src="img/img-11.jpg" alt="Image 11">*/}
                            {/*</li>*/}
                            {/*<li className="mix color-2 check1 radio3 option1"><img src="img/img-12.jpg" alt="Image 12">*/}
                            {/*</li>*/}
                            <li className="gap"></li>
                            <li className="gap"></li>
                            <li className="gap"></li>
                        </ul>
                        <div className="cd-fail-message">No results found</div>
                    </section>

                    <div className={`cd-filter ${this.state.isFilterVisible?'filter-is-visible':''}`}>
                        <form>
                            <div className="cd-filter-block">
                                <h4>Search</h4>

                                <div className="cd-filter-content">
                                    <input type="search" placeholder="Try color-1..."/>
                                </div>
                            </div>

                            <div className="cd-filter-block">
                                <h4>Check boxes</h4>

                                <ul className="cd-filter-content cd-filters list">
                                    <li>
                                        <input className="filter" data-filter=".check1" type="checkbox" id="checkbox1"/>
                                            <label className="checkbox-label" htmlFor="checkbox1">Option 1</label>
                                    </li>

                                    <li>
                                        <input className="filter" data-filter=".check2" type="checkbox" id="checkbox2"/>
                                            <label className="checkbox-label" htmlFor="checkbox2">Option 2</label>
                                    </li>

                                    <li>
                                        <input className="filter" data-filter=".check3" type="checkbox" id="checkbox3"/>
                                            <label className="checkbox-label" htmlFor="checkbox3">Option 3</label>
                                    </li>
                                </ul>
                            </div>

                            <div className="cd-filter-block">
                                <h4>Select</h4>

                                <div className="cd-filter-content">
                                    <div className="cd-select cd-filters">
                                        <select className="filter" name="selectThis" id="selectThis">
                                            <option value="">Choose an option</option>
                                            <option value=".option1">Option 1</option>
                                            <option value=".option2">Option 2</option>
                                            <option value=".option3">Option 3</option>
                                            <option value=".option4">Option 4</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="cd-filter-block">
                                <h4>Radio buttons</h4>

                                <ul className="cd-filter-content cd-filters list">
                                    <li>
                                        <input className="filter" data-filter="" type="radio" name="radioButton"
                                               id="radio1" checked/>
                                            <label className="radio-label" htmlFor="radio1">All</label>
                                    </li>

                                    <li>
                                        <input className="filter" data-filter=".radio2" type="radio" name="radioButton"
                                               id="radio2"/>
                                            <label className="radio-label" htmlFor="radio2">Choice 2</label>
                                    </li>

                                    <li>
                                        <input className="filter" data-filter=".radio3" type="radio" name="radioButton"
                                               id="radio3"/>
                                            <label className="radio-label" htmlFor="radio3">Choice 3</label>
                                    </li>
                                </ul>
                            </div>
                        </form>

                        <div className="cd-close" onClick={this.hideFilter}>Close</div>
                    </div>

                    <div className="cd-filter-trigger" onClick={this.showFilter}>Filters</div>
                </main>
                <OrderList orders={this.state.order}
                           user={this.props.user}/>
                <Spinner open={this.state.showSpinner}/>
            </div>
        );
    }
}

export default Filter;
