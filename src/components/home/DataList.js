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
import EditNews from "../EditNews";
import EditNewsButton from "../EditNewsButton";

class DataList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSpinner: false,
            isModalOpen: false,
            isNewsEditModalOpen: false,
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

    onUpdate = (index, message) => {
        this.props.onUpdate(index, message);
        this.closeConfirmationModal();
    };

    onYes = (index) => {
        this.props.onDelete(index);
        this.closeConfirmationModal();
    };

    render() {
        const {data} = this.props;
        return (
            <div className={'list-group'}>

                {

                    data.length !== 0
                        ? data.map(
                        (data, i) => (
                            <React.Fragment>
                                <a href={data._id} key={i}
                                   className="list-group-item list-group-item-action flex-column align-items-start">
                                    <h5 className="mb-1">{data.message}</h5>
                                    <small
                                        className="text-muted"> {timeSince(new Date(data.createdOn)) + ' ago'}</small>
                                </a>
                                <div className='d-flex p-2 align-items-center justify-content-center'>
                                    <AuthorizedComponent
                                        component={EditNewsButton}
                                        openEditModal={this.openEditModal}
                                        permission={isSuperAdmin(this.props.user)&&this.props.editPermission}
                                    />
                                    <AuthorizedComponent permission={isSuperAdmin(this.props.user)}
                                                         openConfirmationModal={this.openConfirmationModal}
                                                         component={DeleteButton}/>
                                    <ConfirmModal open={this.state.isModalOpen}
                                                  onYes={() => this.onYes(i)}
                                                  close={this.closeConfirmationModal}/>
                                    <EditNews visible={this.state.isNewsEditModalOpen}
                                              onUpdate={(message) => this.onUpdate(i, message)}
                                              closeModal={this.closeEditModal}
                                              message={data.message}/>

                                </div>
                            </React.Fragment>
                        ))
                        :
                        <li className="list-group-item list-group-item-action flex-column align-items-start"> Nothing to
                            show </li>
                }
            </div>
        );
    }
}


export default DataList;
