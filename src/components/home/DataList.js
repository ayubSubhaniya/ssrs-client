import React, {Component} from 'react';
import {timeSince} from "../../helper/Time";
import AuthorizedComponent from "../AuthorizedComponent";
import {isSuperAdmin} from "../../helper/userType";
import DeleteButton from "../DeleteButton";
import ConfirmModal from "../ConfirmModal";
import EditNews from "./EditNews";
import EditNewsButton from "./EditNewsButton";
import _ from "lodash"

class DataList extends Component {

    constructor(props) {
        super(props);
        this.currentIndex = 0;
        this.state = {
            showSpinner: false,
            isModalOpen: false,
            isNewsEditModalOpen: false
        };
    }

    openConfirmationModal = (e) => {
        this.currentIndex =  e.target.dataset.index;
        this.setState({
            isModalOpen: true
        })
    };

    closeConfirmationModal = () => {
        this.setState({
            isModalOpen: false,
        })
    };

    openEditModal = (e) => {
        this.currentIndex =  e.target.dataset.index;
        this.setState({
            isNewsEditModalOpen: true
        })
    };

    closeEditModal = () => {
        this.setState({
            isNewsEditModalOpen: false
        })
    };

    onUpdate = (index, message) => {
        this.props.onUpdate(this.currentIndex, message);
        this.closeConfirmationModal();
    };

    onYes = () => {
        console.log(this.currentIndex);
        this.props.onDelete(this.currentIndex);
        this.closeConfirmationModal();
    };

    render() {
        const {data} = this.props;
        return (
            <div className={'list-group'}>
                {
                    data.length !== 0
                        ? _.map(data, (data, i) => {
                            return (
                            <div key={data._id}>
                                <div
                                    className="list-group-item list-group-item-action align-items-start d-flex justify-content-between">
                                    <div>
                                        <h5 className="mb-1">{data.message}</h5>
                                        <small
                                            className="text-muted"> {timeSince(new Date(data.createdOn)) + ' ago'}</small>
                                    </div>
                                    <div className='d-flex p-2 align-items-center justify-content-center'>
                                        <AuthorizedComponent
                                            component={EditNewsButton}
                                            openEditModal={this.openEditModal}
                                            index={i}
                                            permission={isSuperAdmin(this.props.user) && this.props.editPermission}
                                        />
                                        <AuthorizedComponent
                                            index={i}
                                            permission={isSuperAdmin(this.props.user) || this.props.deletePermission}
                                            openConfirmationModal={this.openConfirmationModal}
                                            component={DeleteButton}/>
                                    </div>
                                </div>
                            </div>
                        )})
                        :
                        <li className="list-group-item list-group-item-action flex-column align-items-start"> Nothing to
                            show </li>
                }
                {
                    this.state.isModalOpen ?
                    <ConfirmModal open={true}
                                  onYes={this.onYes}
                                  close={this.closeConfirmationModal}/> : ''
                }
                {
                    this.state.isNewsEditModalOpen ?
                    <EditNews visible={true}
                              onUpdate={(message) => this.onUpdate(this.currentIndex, message)}
                              closeModal={this.closeEditModal}
                              message={data[this.currentIndex] ? data[this.currentIndex].message : ''}/> : ''
                }
            </div>
        );
    }
}


export default DataList;
