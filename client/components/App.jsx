import React, {Component} from 'react';
import BurgerMenu from './BurgerMenu.jsx';
import Content from './Content.jsx';
import CoverPage from './CoverPage.jsx';
import '../styles/app.css';

class App extends Component {
    state() {
        visible: false
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        let el = document.getElementById('cover-page')
        let visible = this.elementInViewport(el);

        this.setState({
            visible: !visible
        })
    }

    elementInViewport(el) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (top < (window.pageYOffset + window.innerHeight) && left < (window.pageXOffset + window.innerWidth) && (top + height) > window.pageYOffset && (left + width) > window.pageXOffset);
    }

        render() {
            return (
                <div className="App">
                    <CoverPage/>
                    <BurgerMenu visible={this.state.visible}/>
                    <Content/>
                </div>
            );
        }
}
export default App;
