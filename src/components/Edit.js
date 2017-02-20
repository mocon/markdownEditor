/*global document b:true*/
import React, { Component } from 'react';
import firebase from 'firebase';
import SpaHeader from './SpaHeader';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.location.state.user
        };
    }

    componentWillMount() {
        document.body.classList.add('-has-spa-header');
    }

    signOut = () => {
        firebase.auth().signOut();
        this.props.router.push({
            pathname: '/',
            state: {
                user: null
            }
        });
    }

    render() {
        return (
            <div>
                <SpaHeader signOut={this.signOut} />
                <div className="gds-layout__container">
                    <div className="gds-layout__row">
                        <div className="gds-layout__column--md-12">
                            <h1 className="gds-text--header-md -m-b-3">Edit page, must be authenticated (user: {this.state.user.name}) to see this.</h1>
                            <button className="gds-button gds-button--primary" onClick={() => { this.signOut(); }}>Sign out</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
