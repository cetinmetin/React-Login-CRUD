import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import TitleComponent from "./title";

import UserDatas  from "../mockDatas/Users.json";
import { generateToken } from '../helpers/helperFunctions';

export default class Login extends Component {

    state = {
        email: '',
        password: '',
        redirect: false,
        authError: false,
        isLoading: false,
        location: {},
    };
    
    handleEmailChange = event => {
        this.setState({email: event.target.value});
    };
    handlePwdChange = event => {
        this.setState({password: event.target.value});
    };
    doLogin(user){
        localStorage.setItem('token', generateToken(user));
        localStorage.setItem('isLoggedIn', true);
        if(localStorage.getItem('isLoggedIn'))
            this.setState({redirect: true, isLoading: false})
        
        
    }
     handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const email = this.state.email;
        const password = this.state.password;
        UserDatas.map((user)=>{
            if (user.email === email && user.password === password) {
                this.doLogin(user)
            }
            else{
                this.setState({authError: true, isLoading: false});
            }
        })
           
    };

    componentDidMount() {
    }

    renderRedirect = () => {
        if (this.state.redirect) {
           return <Redirect to='/dashboard'/>
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        // UserDatas.map((datas)=>{console.log(datas.email,datas.password)})
        return (
            <div className="container">
                <TitleComponent title="React CRUD Login "></TitleComponent>
                <div className="card card-login mx-auto mb-0" style={{marginTop:window.innerHeight * 0.2}}>
                    <div className="card-body">
                    <h3 className='card-title'>REACT LOGIN-CRUD APP</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputEmail" placeholder="Email address" type="text" name="email" onChange={this.handleEmailChange} autoFocus required/>
                                    <label htmlFor="inputEmail">Email address</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Email.
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="password" className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputPassword" placeholder="******" name="password" onChange={this.handlePwdChange} required/>
                                    <label htmlFor="inputPassword">Password</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Password.
                                    </div>
                                </div>
                            </div>
                            <div className="form-group float-right">
                                <button className="btn btn-primary" type="submit" disabled={this.state.isLoading ? true : false}>Login
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span></span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {this.renderRedirect()}
            </div>
        );
    }
}


