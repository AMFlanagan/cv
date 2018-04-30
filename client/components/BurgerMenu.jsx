import React, {Component} from 'react';
import {slide as Menu} from 'react-burger-menu';

class BurgerMenu extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className={this.props.visible ? "bm-wrapper-" + this.props.visible : "bm-wrapper-false"}>
                <Menu
                    width={ '200px' }
                    className="bm"
                    >
                    <a id="home" className="menu-item" href="/"><span className="home-icon"></span><span className="icon-text">Home</span></a>
                    <a id="timeline" className="menu-item" href="/"><span className="timeline-icon"></span><span className="icon-text">Time Line</span></a>
                    <a id="about" className="menu-item" href="/"><span className="about-icon"></span><span className="icon-text">About</span></a>
                    <a id="contact" className="menu-item" href="/"><span className="contact-icon"></span><span className="icon-text">Contact</span></a>
                </Menu>
            </div>
        )
    }
}

export default BurgerMenu;
