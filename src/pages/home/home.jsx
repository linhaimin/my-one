import React, { Component } from "react";
import axios from "axios";
import './home.css';
import Cover from '../../components/cover/cover';
import ReadingBlock from '../../components/readingBlock/readingBlock';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        var self = this;
        axios.get('http://v3.wufazhuce.com:8000/api/onelist/idlist/')
            .then(function (response) {
                self.getonelist(response.data.data[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentDidUpdate(){
        document.getElementById('short-article').innerHTML = this.state.text_reading;
        document.getElementById('short-question').innerHTML = this.state.text_question;
    }
    getonelist(data) {
        var self = this;
        axios.get('http://v3.wufazhuce.com:8000/api/onelist/' + data + '/0')
            .then(function (response) {
                var data = response.data.data;
                var list = response.data.data.menu.list;
                var dateArr = data.weather.date.split('-');
                console.log(list)
                list.forEach(item => {
                    if(item.content_type === '1' && item.tag && item.tag.title === 'ONE STORY'){
                        self.getStoryDetails(item.content_id);
                    }
                    if(item.content_type === '3'){
                        self.getQuestionDetails(item.content_id);
                    }
                })
                // simulate img loading
                self.setState({
                    data: data.content_list[0],
                    day: parseInt(dateArr[2]),
                    month: parseInt(dateArr[1]),
                    year: parseInt(dateArr[0])
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    getStoryDetails(data){
        var self = this;
        axios.get('http://v3.wufazhuce.com:8000/api/essay/' + data)
        .then(function(response){
            self.setState({
                content_reading: response.data.data,
                text_reading: response.data.data.hp_content
            })
        })
        .catch(function(error){
            console.log(error);
        })
    }
    getQuestionDetails(data){
        var self = this;
        axios.get('http://v3.wufazhuce.com:8000/api/question/' + data)
        .then(function(response){
            self.setState({
                content_question: response.data.data,
                text_question: response.data.data.answer_content
            })
        })
        .catch(function(error){
            console.log(error);
        })
    }
    render() {
        const date = [this.state.year, this.state.month, this.state.day];
        return (
            <div>
                <Cover data={this.state.data} date={date} />
                <ReadingBlock reading={this.state.content_reading} question={this.state.content_question} />
            </div>
        )
    }
}

export default Homepage;