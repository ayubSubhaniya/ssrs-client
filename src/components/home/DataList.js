import React, {Component} from 'react';
import {timeSince} from "../../helper/Time";
import AuthorizedComponent from "../AuthorizedComponent";
import ApplyButton from "../service/ApplyButton";
import {isStudent, isSuperAdmin} from "../../helper/userType";
import EditButton from "../EditButton";
import Switch from "../service/Switch";
import DeleteButton from "../DeleteButton";
import ConfirmModal from "../ConfirmModal";
import {domainUrl} from "../../config/configuration";
import * as HttpStatus from "http-status-codes";
import {asyncFetch} from "../../helper/FetchData";
import EditNews from "./EditNews";
import EditNewsButton from "./EditNewsButton";
import ButtonLink from "../service/ButtonLink";
import AddNewsButton from "./AddNewsButton";

class DataList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSpinner: false,
            isModalOpen: false,
            isNewsEditModalOpen: false,
            isAddNewsModalOpen: false,
        };
    }

    openConfirmationModal = () => {
        this.setState({
            isModalOpen: true
        })
    };

    closeConfirmationModal = () => {
        this.setState({
            isModalOpen: false
        })
    };

    openEditModal = () => {
        this.setState({
            isNewsEditModalOpen: true
        })
    };

    closeEditModal = () => {
        this.setState({
            isNewsEditModalOpen: false
        })
    };

    openAddModal = () => {
        this.setState({
            isAddNewsModalOpen: true
        });
    };

    closeAddModal = () => {
        this.setState({
            isAddNewsModalOpen: false
        })
    };

    onUpdate = (index, message) => {
        this.props.onUpdate(index, message);
        this.closeEditModal();
    };

    onAdd = (message) => {
        this.props.onCreate(message);
        this.closeAddModal();
    };

    onYes = (index) => {
        this.props.onDelete(index);
        this.closeConfirmationModal();
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
                            ? data.map(
                            (data, i) => (
                                <div key={i}
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
                                            permission={isSuperAdmin(this.props.user) && this.props.editPermission}
                                        />
                                        <AuthorizedComponent
                                            permission={isSuperAdmin(this.props.user) || this.props.deletePermission}
                                            openConfirmationModal={this.openConfirmationModal}
                                            component={DeleteButton}/>
                                        <ConfirmModal open={this.state.isModalOpen}
                                                      onYes={() => this.onYes(i)}
                                                      close={this.closeConfirmationModal}/>
                                        <EditNews visible={this.state.isAddNewsModalOpen}
                                                  onUpdate={this.onAdd}
                                                  closeModal={this.closeAddModal}
                                                  action={"Add"}
                                        />
                                        <EditNews visible={this.state.isNewsEditModalOpen}
                                                  onUpdate={(message) => this.onUpdate(i, message)}
                                                  closeModal={this.closeEditModal}
                                                  action={"Edit"}
                                                  message={data.message}/>

                                    </div>
                                </div>
                            ))
                            :
                            <li className="list-group-item list-group-item-action flex-column align-items-start"> Nothing
                                to
                                show </li>
                    }
                </div>
            </div>
        );
    }
}


export default DataList;
