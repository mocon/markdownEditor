import React, { Component } from 'react';

export default class SpaHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false
        };
    }

    toggleMenu = () => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        });
    }

    render() {
        const menuClass = this.state.isMenuOpen ? 'gds-avatar--menu-open' : '';

        return (
            <header className="gds-spa-header">
                <div className="gds-spa-header__primary-nav">
                    <div className="gds-spa-header__section">
                        <img className="gds-spa-header__logo-image" src="https://c.gumgum.com/ads/com/gumgum/documentation/logos/logo_designsystem.svg" alt="GumGum Design System" />
                    </div>
                </div>
                <div className="gds-spa-header__secondary-nav">
                    <div className="gds-spa-header__section gds-spa-header__section--white">
                        <div className={`gds-avatar ${menuClass} -m-l-2`} onClick={() => { this.toggleMenu(); }}>
                            <div className="gds-avatar__image">
                                <img src="https://c.gumgum.com/ads/com/gumgum/documentation/avatars/avatar--default2.jpg" alt="User Name" height="100%" />
                            </div>
                            <div className="gds-avatar__menu">
                                <ul className="gds-avatar__menu-list">
                                    <li className="gds-avatar__menu-list-item -ellipsis"><a onClick={() => { this.props.signOut(); }} className="gds-avatar__menu-list-link">Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
