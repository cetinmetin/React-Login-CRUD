import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Sidebar extends Component {
    render() {
        return (
            <div id="wrapper">
                <ul className="sidebar navbar-nav">

                    <input type="text" className="form-control" placeholder="Search function" aria-label="Search"
                               aria-describedby="basic-addon2" />
                    <li className="nav-item active">
                        <Link to={'/dashboard'} className="nav-link">
                            <span>&nbsp;Autocorrection</span></Link>
                    </li>
                </ul>
            </div>
        );
    }
}
