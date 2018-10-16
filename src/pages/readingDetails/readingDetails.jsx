import React, {Component} from 'react';
import axios from 'axios';
import './readingDetails.css';
import Footer from '../../components/footer/footer';
import Comment from '../../components/comment/comment';

export default class ReadingDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            readingDetails: {},
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
        axios.get('http://v3.wufazhuce.com:8000/api/essay/' + id)
            .then(function(response){
                self.setState({
                    readingDetails: response.data.data
                })
            })
            .catch(function(error){
                console.log(error)
            })
        axios.get('http://v3.wufazhuce.com:8000/api/comment/praiseandtime/essay/' + id +'/0')
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
            this.state.readingDetails ? 
            <div className="box-content" style={{ height: document.documentElement.clientHeight -45, overflow: 'auto'}}>
                <div className="block-article">
                    <h3 className="text-title">{this.state.readingDetails.hp_title}</h3>
                    <hr className="sort-separate-line" />
                    <p className="text-author">文 / {this.state.readingDetails.hp_author}</p>
                    <div className="text-content" dangerouslySetInnerHTML={{__html: this.state.readingDetails.hp_content}}></div>
                    <p className="text-editor"><i>{this.state.readingDetails.hp_author_introduce}</i></p>
                    <p className="text-editor"><i>{this.state.readingDetails.copyright}</i></p>
                </div>
                <div className="block-author">
                    <p className="page-separate-title">作者</p>
                    <hr className="sort-separate-line" />
                    <div className="info-author">
                        <img className="avatar" src={this.state.readingDetails.author ? this.state.readingDetails.author[0].web_url : ''} alt=""/>
                        <span className="container-inline">
                            <span className="username">{this.state.readingDetails.author ? this.state.readingDetails.author[0].user_name : ''} {this.state.readingDetails.author ? this.state.readingDetails.author[0].wb_name : ''}</span>
                            <span className="summary">{this.state.readingDetails.author ? this.state.readingDetails.author[0].summary : ''}</span>
                        </span>
                    </div>
                </div>
                <Comment comment={this.state.commentList} />
                <Footer previous={this.state.readingDetails.previous_id} next={this.state.readingDetails.next_id} getItem={(e) => this.getItem(e)} />
            </div> : ''
        )
    }
}