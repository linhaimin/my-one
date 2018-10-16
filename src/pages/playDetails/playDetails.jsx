import React, {Component} from 'react';
import axios from 'axios';
import './playDetails.css';
import Footer from '../../components/footer/footer';
import Comment from '../../components/comment/comment';

export default class PlayDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            playDetails: {},
            commentList: []
        }
        this.getArticle = this.getArticle.bind(this);
        // this.getItem = this.getItem.bind(this);
    }

    componentDidMount(){
        this.getArticle(this.props.match.params.id);
    }

    getArticle(id){
        const self = this;
        let commentList = [];
        axios.get('http://v3.wufazhuce.com:8000/api/movie/detail/' + id)
            .then(function(response){
                console.log(response.data.data)
                self.setState({
                    playDetails: response.data.data
                })
            })
            .catch(function(error){
                console.log(error)
            })
        axios.get('http://v3.wufazhuce.com:8000/api/comment/praiseandtime/movie/' + id +'/0')
            .then(function(res){
                console.log(res.data.data)
                for(let i = 0; i < 3; i++){
                    commentList.push(res.data.data.data[i]);
                }
                self.setState({
                    commentList: commentList
                })
            })
            .catch(function(error){
                console.log(error)
            })
    }

    getItem(e){
        this.getArticle(e.currentTarget.dataset.itemid);
    }

    render(){
        return(
            this.state.playDetails ? 
            <div className="box-content" style={{ height: document.documentElement.clientHeight -45, overflow: 'auto'}}>
                <div className="block-article">
                    <div className="box-cover-top">
                        <img className="cover-top" src={this.state.playDetails.detailcover} />
                    </div>
                </div>
                <div className="block-author">
                    <p className="page-separate-title">作者</p>
                    <hr className="sort-separate-line" />
                    <div className="info-author">
                        <img className="avatar" src={this.state.playDetails.author ? this.state.playDetails.author[0].web_url : ''} alt=""/>
                        <span className="container-inline">
                            <span className="username">{this.state.playDetails.author ? this.state.playDetails.author[0].user_name : ''} {this.state.playDetails.author ? this.state.playDetails.author[0].wb_name : ''}</span>
                            <span className="summary">{this.state.playDetails.author ? this.state.playDetails.author[0].summary : ''}</span>
                        </span>
                    </div>
                </div>
                <Comment comment={this.state.commentList} />
                <Footer previous={this.state.playDetails.previous_id} next={this.state.playDetails.next_id} getItem={(e) => this.getItem(e)} />
            </div> : ''
        )
    }
}