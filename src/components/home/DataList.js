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
        this.currentId = 0;
        this.currentMessage = '';
            this.state = {
            showSpinner: false,
            isModalOpen: false,
            isNewsEditModalOpen: false
        };
    }

    openConfirmationModal = (e) => {
        this.currentId =  e.target.dataset.index;
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
        this.currentId =  e.target.dataset.index;
        this.currentMessage = e.target.dataset.message;
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
        this.props.onUpdate(this.currentId, message);
        this.closeConfirmationModal();
    };

    onYes = (e) => {
        this.props.onDelete(this.currentId);
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
                                            index={data._id}
                                            message={data.message}
                                            permission={isSuperAdmin(this.props.user) && this.props.editPermission}
                                        />
                                        <AuthorizedComponent
                                            index={data._id}
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
                              onUpdate={(message) => this.onUpdate(this.currentId, message)}
                              closeModal={this.closeEditModal}
                              message={this.currentMessage}/> : ''
                }
            </div>
        );
    }
}


export default DataList;
