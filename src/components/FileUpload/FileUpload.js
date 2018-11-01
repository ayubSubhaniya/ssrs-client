import React, { Component } from "react";
import NavigationBar from "../NavigationBar"
import { domainUrl, errorMessages } from "../../config/configuration";
const XLSX = require('xlsx');

export default class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filesToBeSent: [],
        }
    }
    onChange = (e) => {
        e.preventDefault();
        this.setState({
            filesToBeSent: [...this.state.filesToBeSent, e.target.files[0]]
        })
    }
    FileUploadHandler = (e) => {
        e.preventDefault();
        var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
        if (this.state.filesToBeSent.length == 0) {
            alert("Please Select File to Upload")
        }
        else {
            var files = this.state.filesToBeSent, f = this.state.filesToBeSent[0];
            var reader = new FileReader();
            const that = this;
            reader.onload = function (e) {
                var data = e.target.result;
                if (!rABS) data = new Uint8Array(data);
                var workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });
                const first_sheet_name = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[first_sheet_name];
                const something = XLSX.utils.sheet_to_json(worksheet);
                let keys = Object.keys(something);
                keys.forEach((e) => {

                    Object.keys(something[`${e}`]).forEach((ele) => {
                        something[`${e}`][`${ele}`] = `${something[`${e}`][`${ele}`]}`
                    })
                })
                that.setState({
                    filesToBeSent : []
                })
                that.props.handleSubmit(something);
            };
            if (rABS) {
                reader.readAsBinaryString(f);
            } else {
                reader.readAsArrayBuffer(f);
            }
        }

    }
    render() {
        return (
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.FileUploadHandler(e)
                }}
                >
                    <input type="file" name="fileupload" onChange={(e) => this.onChange(e)} multiple />
                    <input type="submit" name="Submit" class="btn btn-primary" onClick={(e) => {
                        e.preventDefault();
                        this.FileUploadHandler(e)
                    }} />
                </form>
            </div>
        );
    }
}
