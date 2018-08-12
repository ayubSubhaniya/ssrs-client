import React, {Component} from 'react'
import {Checkbox, DropdownButton} from "react-bootstrap";
import _ from "lodash";

class CheckboxOption extends Component {
    render() {
        const {name, onClick} = this.props
        return (
            <Checkbox onClick={onClick} data-name={name}>
                {name}
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

    getToggledList = (value) => {
        const index = _.indexOf(this.state.currentValues,value);
        if(index>-1){
            return _.difference(this.state.currentValues,[value]);
        }
        return _.concat(this.state.currentValues,[value]);
    }

    handleChange = ({target}) => {

        if (target.checked) {
            target.parentNode.style.backgroundColor="#e7e7e7";
        } else {
            target.parentNode.style.backgroundColor="#ffffff";

        }
        this.setState({
            currentValues: this.getToggledList(target.dataset.name)
        })
        console.log(this.getToggledList(target.dataset.name));
    }

    componentDidMount(){
        this.input.querySelector('.dropdown-menu').classList.add('dropdown-menu_my')
    }



    render() {
        const {defaultValue, currentValues} = this.state
        const {collectionType,label} = this.props
        return (

            <div
                className={'field margin-b'} ref={(input) => {this.input = input}}>
                <label >{label}</label>
                <DropdownButton
                    id={'dropdown'}
                    className={'dropdown-btn'}
                    title={
                        currentValues.join(', ').length > 20 ?
                            ("Seleted("+currentValues.length+")")
                        : (currentValues.length > 0
                            ? currentValues.join(', ')
                            : defaultValue)
                    }>
                    {
                        _.map(collectionType,(ele)=>{
                            return(
                                <CheckboxOption
                                    key={ele._id}
                                    id={ele._id}
                                    onClick={this.handleChange}
                                    name={ele.name}/>
                            )
                        })
                    }
                </DropdownButton>
            </div>
        )
    }
}

