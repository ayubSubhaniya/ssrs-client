import React, { PureComponent } from 'react';
import _ from "lodash";

class CollectionTypesDropDown extends PureComponent {
	render() {
		return (
			<div className="form-group row">
				<label className="col-sm-2 col-form-label" style={{"fontSize": "16px"}}>{this.props.label}</label>
				<div className="dropdown" style={{"border": "1.8px solid #343a40", "borderRadius": "4px", "minWidth": "50%"}}>
					<div className="btn dropdown-toggle form-control"
						type="button"
						data-toggle="dropdown">
						{this.props.btnLabel + " "}
						<span className="caret"></span>
					</div>
					<ul className="dropdown-menu col-sm-12">
						{
							_.map(this.props.options, (o, index) => {
								return (
									<li key={o._id}
										data-index={index}
										className='dropdown-item pl-4 pt-2 pb-2'
										style={{ "cursor": "pointer" }}
										onClick={this.props.handleOptionChange}>
										<a
											data-toggle="tooltip"
											title={o.description}>
											{o.name + " (₹" + o.baseCharge + ")"}
										</a>
									</li>)
							})
						}
					</ul>
				</div>
			</div>
		);
	}
}

export default CollectionTypesDropDown;
