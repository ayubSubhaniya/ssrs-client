import React, {Component} from 'react'
import {Checkbox, DropdownButton} from "react-bootstrap";
import _ from "lodash";

class CheckboxOption extends Component {
    render() {
        const {name, baseCharge, onClick} = this.props
        return (
            <Checkbox onClick={onClick} data-name={name}>
                <div className={'checkbox-option'}>
                    <div>
                        {name}
                    </div>
                    <div style={{"paddingRight": "12px"}}>
                        {"₹ " + baseCharge}
                    </div>
                </div>
            </Checkbox>
        )
    }
}

export default class CheckboxMultiSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultValue: 'Select',
            currentValues: []
        }

    }


    componentDidMount() {
        this.input.querySelector('.dropdown-menu').classList.add('dropdown-menu_my')
    }


    render() {
        const {defaultValue} = this.state
        const {collectionType, label, currentValues} = this.props
        return (

            <div
                className={'field margin-b'} ref={(input) => {
                this.input = input
            }}>
                <label>{label}</label>
                <DropdownButton
                    id={'dropdown'}
                    className={'dropdown-btn'}
                    title={
                        currentValues.join(', ').length > 20 ?
                            ("Seleted(" + currentValues.length + ")")
                            : (currentValues.length > 0
                            ? currentValues.join(', ')
                            : defaultValue)
                    }>
                    {
                        _.map(collectionType, (ele) => {
                            return (
                                <CheckboxOption
                                    key={ele._id}
                                    id={ele._id}
                                    onClick={this.props.handleChange}
                                    name={ele.name}
                                    baseCharge={ele.baseCharge}/>
                            )
                        })
                    }
                </DropdownButton>
            </div>
        )
    }
}

