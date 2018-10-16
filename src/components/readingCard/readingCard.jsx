import React from 'react';
import {Link} from 'react-router-dom';

const Card = (item, sIndex, rIndex) => {
    console.log(item)
    let dateArr = item.data.post_date.split(' ')[0].split('-');
    return (
        <div className="reading-item" key={rIndex} style={{padding: '0 20px 20px'}}>
            <Link to={"/readingDetails/" + item.data.content_id}>
                <p className="item-tag">-{item.data.tag_list[0] ? item.data.tag_list[0].title : '阅读'}-</p>
                <p className="item-title">{item.data.title}</p>
                <p className="item-text-author">文 / {item.data.author.user_name}</p>
                <div>
                    <img className="item-cover" src={item.data.img_url} alt=""/>
                    <p className="item-content-short">{item.data.forward}</p>
                    <p className="item-post-date">{dateArr[0] + '/' + dateArr[1] + '/' + dateArr[2]}</p>
                </div>
            </Link>
        </div>
    );
}

export default Card;