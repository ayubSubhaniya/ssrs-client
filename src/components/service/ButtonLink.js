import React from 'react'
import {Link} from "react-router-dom";

class ButtonLink extends React.Component {
    render() {
        return (
            <div className={'d-flex justify-content-center mt-3'}>
                <Link to={'/service/add'} style={{textDecoration: 'none'}}>
                    <input
                        className='submit'
                        type="submit"
                        value="Add New Service"/>
                </Link>
            </div>
        )
    }
}

export default ButtonLink
