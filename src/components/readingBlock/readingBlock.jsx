import React from 'react';

const ReadingBlock = ({reading, question}) => {
    return (
        <div>
            <div className="text-reading">
                <p className="text-type">
                    <a href="">阅读 |</a>
                </p>
                <div className="block-article">
                    <h3 className="title">{reading ? reading.hp_title : ''}</h3>
                    <p className="author">作者 / {reading ? reading.hp_author : ''}</p>
                    <div className="short" id="short-article"></div>
                </div>
                <p className="btn-more">
                    <a href="">阅读全文</a>
                </p>
            </div>
            <div className="text-question">
                <p className="text-type">
                    <a href="">问答 |</a>
                </p>
                <div className="block-article">
                    <h3 className="title">{question ? question.question_title : ''}</h3>
                    <div className="short" id="short-question"></div>
                </div>
                <p className="btn-more">
                    <a href="">阅读全文</a>
                </p>
            </div>
            <div className="box-btn-more">
                <a href="">更多内容 ></a>
            </div>
        </div>
    )
}
export default ReadingBlock;