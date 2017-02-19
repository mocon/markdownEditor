import React, { Component } from 'react';
import Firebase from 'firebase';
import '../App.css';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAEen54QgNaW1Xmm22FR4SqSmtcDz_sS7s",
    authDomain: "markdown-editor-c36aa.firebaseapp.com",
    databaseURL: "https://markdown-editor-c36aa.firebaseio.com",
    storageBucket: "markdown-editor-c36aa.appspot.com",
    messagingSenderId: "562650467855"
};

Firebase.initializeApp(config);

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userLoading: true
        };
    }

    componentWillMount() {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is signed in
                this.authHandler(user);
            } else {
                // User is signed out
            }
        });
    }

    authenticate = (provider) => {
        Firebase.auth().signInWithPopup(provider)
            .then(this.authHandler)
            .catch(err => console.error(err));
    }

    authHandler = (authData) => {
        let user = authData.user || authData;

        if (user) {
            this.setState({
                user: {
                    email: user.email,
                    name: user.displayName,
                    uid: user.uid
                },
                userLoading: false
            });

            this.props.history.push('/overview');
        } else {
            // TODO: Logout & redirect to `/login`
        }
    }

    signOut = () => {
        Firebase.auth().signOut().then(() => {
            // User is signed out
            this.setState({
                user: null,
                userLoading: false
            });
        }, (err) => {
            console.error(err);
        });
    }

    loggedIn = () => {
        return <button onClick={ () => { this.authenticate(new Firebase.auth.GoogleAuthProvider()) } }>Login with Google</button>
    }

    loggedOut = () => {
        return <button onClick={ () => { this.signOut() } }>Sign Out</button>
    }

    render() {
        return (
            <div className="login">
                { !this.state.user ? this.loggedIn() : this.loggedOut() }
            </div>
        );
    }
}

export default Login;
