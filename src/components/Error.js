import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Error extends Component {
    render() {
        return (
            <div>
                <h1>Oh no! Your auth failed!</h1>
                <p><Link to="/">Please login to continue</Link></p>
            </div>
        );
    }
}
