import React, {Component} from 'react';
import './Tabs.scss'

class Tabs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: this.props.selected || 0

        }
        this.handleChange = this
            .handleChange
            .bind(this);

    }

    handleChange(index) {
        this.setState({selected: index});
    }
    render() {
        return (
            <div className="tabs-style container">
                <div className="row">
                    <div className="col-md-2 mb-3">
                        <ul className="inline nav nav-pills flex-column" id="myTab" role="tablist">
                            {this
                                .props
                                .children
                                .map((elem, index) => {
                                    let style = index === this.state.selected
                                        ? "nav-item btn fourth selected"
                                        : " nav-item btn fourth";
                                    return (
                                        <li
                                            className={style}
                                            key={index}
                                            onClick={this
                                            .handleChange
                                            .bind(this, index)}>
                                            <a
                                                className="nav-link btn fourth active"
                                                id="home-tab"
                                                data-toggle="tab"
                                                href="#home"
                                                role="tab"
                                                aria-controls="home"
                                                aria-selected="true">{elem.props.title}</a>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                    <div className="col-md-10">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane  fade show active" id="home" role="tabpanel">{this.props.children[this.state.selected]}</div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tabs
