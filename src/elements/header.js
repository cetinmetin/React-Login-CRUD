import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import TitleComponent from "../pages/title";


export default class Header extends Component {

    constructor(props) {
        super(props);
        this.handleClickLogout = this.handleClickLogout.bind(this)
    }

    state = {
        toDashboard: false,
    };

    handleClickLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('dataSource');
        localStorage.setItem('isLoggedIn', false);
        this.setState({ toDashboard: true });
    }

    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }
        return (
            <nav className="navbar navbar-expand static-top bg-dark">
                <TitleComponent title="React CRUD"></TitleComponent>

                <Link to={'/dashboard'} className="navbar-brand mr-1">Innovile</Link>

                <button className="btn btn-link btn-sm text-blue order-1 order-sm-0" id="sidebarToggle">
                    <i className="fas fa-bars"></i>
                </button>

                <div className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto ">
                        <li className="nav-item active">
                            <Link to={'#'} className="nav-item text-white" id="user"
                                aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-user-circle fa-fw text-white"></i>
                                Admin User
                            </Link>
                        </li>
                        <li className='nav-item text-white ml-3 mr-3'>
                        <Link to={'#'} className="nav-item" id="notif"
                                aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-bell text-white"></i>
                        </Link>
                        </li>
                        <li className='nav-item mr-3'>
                        <Link to={'#'} className="nav-item" id="alert"
                                aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-exclamation-circle text-warning"></i>
                        </Link>
                        </li>
                        
                        <li className="nav-item text-white">
                        <i class="fas fa-sign-out-alt"></i>
                            <Link to={'#'} onClick={this.handleClickLogout} className="text-white" data-toggle="modal" data-target="#logoutModal">Log out</Link>
                        </li>
                    </ul>
                </div>
                {/* <ul className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                    <li className="nav-item">
                    <Link to={'#'} className="nav-item" id="user"
                           aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-user-circle fa-fw"></i>
                    </Link>
                    <li className="nav-item">
                <Link to={'#'} onClick={this.handleClickLogout} className="" data-toggle="modal" data-target="#logoutModal">Logout</Link>
                </li>
                    </li>
                </ul> */}
                {/* <ul className="navbar-nav ml-auto ml-md-0">
                    <li className="nav-item dropdown no-arrow">
                        <Link to={'#'} className="nav-link dropdown-toggle" id="userDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-user-circle fa-fw"></i>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                            <Link to={'#'} className="dropdown-item">Settings</Link>
                            <Link to={'#'} className="dropdown-item">Activity Log</Link>
                            <div className="dropdown-divider"></div>
                            
                        </div>
                    </li>
                </ul> */}
            </nav>
        );
    }
}
