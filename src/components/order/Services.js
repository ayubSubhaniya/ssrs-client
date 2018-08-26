import React, {Component} from 'react';
import NavigationBar from "../NavigationBar";
import List from "./List";

class Services extends Component {
    constructor(){
        super();
        this.state = {
            isFilterVisible: false
        }
    }

    triggerFilter = (e) => {
        this.setState({
            isFilterVisible: !this.state.isFilterVisible
        })
    }

    render() {
        return (
            <div>
            <NavigationBar/>
            <main className="cd-main-content">
                <div className="cd-tab-filter-wrapper">
                    <div className={"cd-tab-filter " + (this.state.isFilterVisible?"filter-is-visible": '')}>
                        <ul className="cd-filters">
                            <li className="placeholder"><a data-type="all">All</a></li>
                            <li className="filter"><a className="selected" data-type="all">All</a></li>
                            <li className="filter" data-filter=".color-1"><a data-type="color-1">PG </a></li>
                            <li className="filter" data-filter=".color-2"><a data-type="color-2">UG</a></li>
                        </ul>
                    </div>
                </div>
                <section className={"cd-gallery " + (this.state.isFilterVisible?"filter-is-visible": '')}>
                    <ul>
                       <List/>
                        <List/>
                        <List/>
                        <List/>
                        <List/>
                        <List/>
                        <List/>
                        <List/>
                        <List/>
                        <List/>
                        <List/>
                        <List/>
                        <List/>

                        <li className="gap"></li>
                        <li className="gap"></li>
                        <li className="gap"></li>
                    </ul>
                    <button className="uk-button uk-button-large uk-button-outline ladda-button uk-width-1-1"><i
                        className="uk-icon uk-icon-plus"></i> SHOW MORE
                    </button>
                    <div className="cd-fail-message">No results found</div>
                </section>


                <div className={"cd-filter " + (this.state.isFilterVisible?"filter-is-visible": '')}>
                    <form>

                        <div className="cd-filter-block">
                            <h4 >Choose a Store</h4>
                            <ul className="cd-filter-content cd-filters list">
                                <li>
                                    <input className="filter" data-filter="" type="radio" name="radioButton" id="radio1"
                                           checked/>
                                        <label className="radio-label" htmlFor="radio1">All</label>
                                </li>

                                <li>
                                    <input className="filter" data-filter=".radio2" type="radio" name="radioButton"
                                           id="radio2"/>
                                        <label className="radio-label" htmlFor="radio2">Apple Store</label>
                                </li>

                                <li>
                                    <input className="filter" data-filter=".radio3" type="radio" name="radioButton"
                                           id="radio3"/>
                                        <label className="radio-label" htmlFor="radio3">Amazon.com</label>
                                </li>
                                <li>
                                    <input className="filter" data-filter=".radio4" type="radio" name="radioButton"
                                           id="radio4" disabled/>
                                        <label className="radio-label" htmlFor="radio4">BestBuy.com</label>
                                </li>
                            </ul>
                        </div>

                        <div className="cd-filter-block">
                            <h4>Filter Results</h4>

                            <div className="cd-filter-content">
                                <input type="search" placeholder="Search Amazon.com"/>
                            </div>
                        </div>

                        <div className="cd-filter-block">
                            <h4>Categories</h4>

                            <ul className="cd-filter-content cd-filters list">
                                <li>
                                    <input className="filter" data-filter=".check1" type="checkbox" id="checkbox1"/>
                                        <label className="checkbox-label" htmlFor="checkbox1">iPhone</label>
                                </li>

                                <li>
                                    <input className="filter" data-filter=".check2" type="checkbox" id="checkbox2"/>
                                        <label className="checkbox-label" htmlFor="checkbox2">iPad</label>
                                </li>

                                <li>
                                    <input className="filter" data-filter=".check3" type="checkbox" id="checkbox3"/>
                                        <label className="checkbox-label" htmlFor="checkbox3">Apple TV</label>
                                </li>
                                <li>
                                    <input className="filter" data-filter=".check3" type="checkbox" id="checkbox3"/>
                                        <label className="checkbox-label" htmlFor="checkbox3">Macbook</label>
                                </li>
                                <li>
                                    <input className="filter" data-filter=".check3" type="checkbox" id="checkbox3"/>
                                        <label className="checkbox-label" htmlFor="checkbox3">Macbook Air</label>
                                </li>
                                <li>
                                    <input className="filter" data-filter=".check3" type="checkbox" id="checkbox3"/>
                                        <label className="checkbox-label" htmlFor="checkbox3">Macbook Pro</label>
                                </li>
                                <li>
                                    <input className="filter" data-filter=".check3" type="checkbox" id="checkbox3"/>
                                        <label className="checkbox-label" htmlFor="checkbox3">Apple Accessories</label>
                                </li>
                            </ul>
                        </div>

                        <div className="cd-filter-block">
                            <h4>Currency</h4>

                            <div className="cd-filter-content">
                                <div className="cd-select cd-filters">
                                    <select className="filter" name="selectThis" id="selectThis">
                                        <option value="">ARS</option>
                                        <option value=".option1">USD</option>
                                        <option value=".option2">BRL</option>
                                        <option value=".option3">EUR</option>
                                        <option value=".option4">GBP</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                    </form>

                    <a className="cd-close" onClick={this.triggerFilter}><i className="icon ent-close"></i> close </a>
                </div>

                <a className={"cd-filter-trigger " + (this.state.isFilterVisible?"filter-is-visible": '')} onClick={this.triggerFilter}>Filters</a>
            </main>
            </div>
    );
    }
    }

    export default Services;
