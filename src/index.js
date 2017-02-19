/*global document b:true*/
import React, { createClass } from 'react';
import { render } from 'react-dom';
import firebase from 'firebase';
import { Router, Route, IndexRoute, browserHistory, withRouter } from 'react-router';
import { firebaseConfig } from './helpers/constants';
import Edit from './components/Edit';
import Error from './components/Error';

firebase.initializeApp(firebaseConfig);

function App(props) {
    return (
        <div>
            { props.children }
        </div>
    );
}

const Form = withRouter(
    createClass({
        getInitialState() {
            return {
                loggedIn: false
            };
        },
        authenticate(provider) {
            firebase.auth().signInWithPopup(provider)
                .then(this.authHandler)
                .catch(err => console.error(err));
        },
        authHandler(authData) {
            const user = authData.user || authData;

            if (user) {
                this.setState({ loggedIn: true });
                this.props.router.push({
                    pathname: '/edit',
                    state: {
                        user: {
                            id: user.uid,
                            name: user.displayName,
                            email: user.email
                        }
                    }
                });
            } else {
                this.setState({ loggedIn: false });
                this.props.router.push({
                    pathname: '/error',
                    state: {
                        user: null
                    }
                });
            }
        },
        signOut() {
            firebase.auth().signOut().then(() => {
                this.setState({ loggedIn: false });
            }, (err) => {
                console.error(err);
            });
        },
        render() {
            return (
                <div>
                    {
                        !this.state.loggedIn
                        ? <button className="gds-button gds-button--primary" onClick={() => { this.authenticate(new firebase.auth.GoogleAuthProvider()); }}>Login with Google</button>
                        : <button className="gds-button gds-button--outline" onClick={() => { this.signOut(); }}>Log out</button>
                    }
                </div>
            );
        }
    })
);

function requireCredentials(nextState, replace, next) {
    let user = null;

    if (nextState.location.state && nextState.location.state.user) {
        user = nextState.location.state.user;
    }

    if (user !== null) {
        serverAuth(user)
        .then(
            () => next(),
            () => {
                replace('/error');
                next();
            }
        );
    } else {
        replace('/error');
        next();
    }
}

function serverAuth(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (user !== null) {
            resolve('authenticated');
        } else {
            reject('nope');
        } }, 200);
    });
}

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Form} />
            <Route path="edit" component={Edit} onEnter={requireCredentials} />
            <Route path="error" component={Error} />
        </Route>
    </Router>
), document.getElementById('root'));
