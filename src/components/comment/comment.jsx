import React from 'react';
import './comment.css';

const Comment = (item) => {
    console.log(item)
    return(
        <div className="block-comment">
            <p className="page-separate-title">评论内容</p>
            <hr className="sort-separate-line" />
            <div className="box-commentList">
                {item.comment.map(val => {
                    return(
                        <div className="comment-item" key={val.id}>
                            <div className="comment-item-head">
                                <span className="item-head-left">
                                    <img className="item-avatar" src={val.user.web_url} alt=""/>
                                    <span className="itme-usernmae">{val.user.user_name}</span>
                                </span>
                                <span className="item-head-right">{val.input_date}</span>
                            </div>
                            <div className="comment-item-body">
                                {val.quote && <div className="comment-quote-content">{val.quote}</div>}
                                <div className="comment-content">{val.content}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Comment;