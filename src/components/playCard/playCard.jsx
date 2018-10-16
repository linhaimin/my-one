import React from 'react';
import './playCard.css';
import {Link} from 'react-router-dom';

const PlayCard = (item) => {
    console.log(item)
    let dateArr = item.data.post_date.split(' ')[0].split('-');
    return (
        <div className="play-item">
            <Link to={'/playDetails/' + item.data.content_id}>
                <p className="text-tag">-影视-</p>
                <h3 className="text-title">{item.data.title}</h3>
                <p className="text-author">文 / {item.data.author.user_name}</p>
                <div className="container-cover">
                    <img className="cover" src={item.data.img_url} alt=""/>
                </div>
                <p className="text-content-short">{item.data.forward}</p>
                <p className="text-play-subtitle">—关于 {item.data.subtitle}</p>
                <p className="text-date">{dateArr[0] + '/' + dateArr[1] + '/' + dateArr[2]}</p>
            </Link>
        </div>
    )
}

export default PlayCard;