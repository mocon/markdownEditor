import React, { Component } from 'react';
import firebase from 'firebase';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.location.state.user
        };
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
                <h1>Edit page, must be authenticated to see this</h1>
                <button onClick={() => { this.signOut(); }}>Sign out</button>
            </div>
        );
    }
}
