import React, { Component } from "react";
import { BrowserRouter, Link } from 'react-router-dom';
import { Drawer, NavBar, Icon } from 'antd-mobile';
import Routes from '../../router';
import './drawer.css';

export default class SideDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.onOpenChange = this.onOpenChange.bind(this);
    }
    onOpenChange() {
        this.setState({ 
            open: !this.state.open
        });
    }
    render() {
        const sidebar = (
            <ul className="listview">
                <li>
                    <Link to='/one' onClick={this.onOpenChange}>图文</Link>
                </li>
                <li>
                    <Link to='/reading' onClick={this.onOpenChange}>阅读</Link>
                </li>
                <li>
                    <Link to='/one' onClick={this.onOpenChange}>音乐</Link>
                </li>
                <li>
                    <Link to='/play'>影视</Link>
                </li>
                <li>
                    <Link to='/one'>App下载</Link>
                </li>
                <li>
                    <Link to='/one'>关于</Link>
                </li>
            </ul>
        );

        return (
            <BrowserRouter>
                <div>
                    <NavBar
                        icon={<i className="icon-menu"></i>}
                        onLeftClick={this.onOpenChange}
                        rightContent={[<Icon key="0" type="search" />]}
                    >
                        一个
                    </NavBar>
                    <Drawer
                        className="my-drawer"
                        style={{ minHeight: document.documentElement.clientHeight -45 }}
                        enableDragHandle
                        contentStyle={{ color: '#A6A6A6', textAlign: 'center'}}
                        sidebar={sidebar}
                        open={this.state.open}
                        onOpenChange={this.onOpenChange}
                    >
                        <Routes />
                    </Drawer>
                </div>
            </BrowserRouter>
        );
    }
}
