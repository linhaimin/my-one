import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from "axios";
import { PullToRefresh, ListView } from 'antd-mobile';
import PlayCard from '../../components/playCard/playCard';
import './play.css';

class Play extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            data: [],
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
        };
    }

    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
    //     });
    //   }
    // }

    componentDidUpdate() {
        if (this.state.useBodyScroll) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }

    componentDidMount() {
        const self = this;
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        let playList = [];
        axios.get('http://v3.wufazhuce.com:8000/api/channel/movie/more/0')
            .then(function(response){
                playList = response.data.data
                console.log(response.data.data)
                setTimeout(() => {
                    self.setState({
                        dataSource: self.state.dataSource.cloneWithRows(playList),
                        height: hei,
                        refreshing: false,
                        isLoading: false,
                    });
                }, 600);
            })
            .catch(function(error){
                console.log(error)
            })
    }

    onRefresh = () => {
        const self = this;
        let playList = [];
        this.setState({ refreshing: true, isLoading: true });
        axios.get('http://v3.wufazhuce.com:8000/api/channel/movie/more/0')
            .then(function(response){
                playList = response.data.data
                setTimeout(() => {
                    self.setState({
                        dataSource: self.state.dataSource.cloneWithRows(playList),
                        refreshing: false,
                        isLoading: false,
                    });
                }, 600);
            })
            .catch(function(error){
                console.log(error)
            })
    };

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        // if (this.state.isLoading && !this.state.hasMore) {
        //     return;
        // }
        // console.log('reach end', event);
        // this.setState({ isLoading: true });
        // setTimeout(() => {
        //     this.rData = [...this.rData, ...genData(++pageIndex)];
        //     this.setState({
        //         dataSource: this.state.dataSource.cloneWithRows(this.rData),
        //         isLoading: false,
        //     });
        // }, 1000);
    };

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        return (
            <ListView
                ref={el => this.lv = el}
                initialListSize={10}
                dataSource={this.state.dataSource}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderRow={(rowData, sIndex, rIndex) => <PlayCard data={rowData} sIndex={sIndex} rIndex={rIndex} />}
                renderSeparator={separator}
                useBodyScroll={this.state.useBodyScroll}
                style={this.state.useBodyScroll ? {} : {
                    height: this.state.height
                }}
                pullToRefresh={<PullToRefresh
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                />}
                onEndReached={this.onEndReached}
                pageSize={5}
            />
        )
    }
}

export default Play;