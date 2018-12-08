import React, {Component} from 'react';
import {timeSince} from "../../helper/Time";
import AuthorizedComponent from "../AuthorizedComponent";
import {isSuperAdmin} from "../../helper/userType";
import DeleteButton from "../DeleteButton";
import EditNews from "./EditNews";
import EditNewsButton from "./EditNewsButton";
import _ from "lodash"
import AddNewsButton from "./AddNewsButton";
import {modalMessages} from "../../config/configuration"

class DataList extends Component {

    constructor(props) {
        super(props);
        this.currentId = 0;
        this.currentMessage = '';
        this.state = {
            showSpinner: false,
            isEditModalOpen: false,
            isAddModalOpen: false
        };
    }


    openAddModal = (e) => {
        this.setState({
            isAddModalOpen: true
        })
    };

    closeAddModal = () => {
        this.setState({
            isAddModalOpen: false,
        })
    };

    openEditModal = (e) => {
        this.currentId = e.target.dataset.index;
        this.currentMessage = e.target.dataset.message;
        this.setState({
            isEditModalOpen: true
        })
    };

    closeEditModal = () => {
        this.setState({
            isEditModalOpen: false
        })
    };

    onUpdate = (index, message) => {
        this.props.onUpdate(this.currentId, message);
        this.closeEditModal();
    };

    onAdd = (message) => {
        this.props.onCreate(message);
        this.closeAddModal();
    };

    render() {
        const {data} = this.props;
        return (
            <div>
                <AuthorizedComponent
                    component={AddNewsButton}
                    openAddModal={this.openAddModal}
                    permission={isSuperAdmin(this.props.user) && this.props.createPermission}
                />
                <div className={'list-group'}>
                    {
                        data.length !== 0
                            ? _.map(data, (data, i) => {
                                return (
                                    <div key={data.createdOn}>
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
                                                    index={i}
                                                    permission={isSuperAdmin(this.props.user) || this.props.deletePermission}
                                                    handleClick={this.props.onDelete}
                                                    component={DeleteButton}
                                                    message={modalMessages.newsOrNotificationDelete} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <li className="list-group-item list-group-item-action flex-column align-items-start"> Nothing
                                to
                                show </li>
                    }
                    {
                        this.state.isEditModalOpen ?
                            <EditNews visible={true}
                                      onUpdate={(message) => this.onUpdate(this.currentId, message)}
                                      closeModal={this.closeEditModal}
                                      message={this.currentMessage}/> : ''
                    }
                    {
                        this.state.isAddModalOpen ?
                            <EditNews visible={true}
                                      onUpdate={this.onAdd}
                                      closeModal={this.closeAddModal}
                            /> : ''
                    }
                </div>
            </div>
        );
    }
}


export default DataList;
