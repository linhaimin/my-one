import React from 'react';

const Card = (item, sIndex, rIndex) => {
    console.log(item);
    let dateArr = item.data.post_date.split(' ')[0].split('-');
    return (
        <div key={rIndex}>
            <p className="item-date">{dateArr[0] + ' ' + '/' + ' ' + dateArr[1] + ' ' + '/' + ' ' + dateArr[2]}</p>
            <p className="item-volume-no">{item.data.volume}</p>
            <div>
                <img className="item-cover" src={item.data.img_url} alt=""/>
                <p className="item-author">{item.data.title} | {item.data.pic_info}</p>
                <p className="item-content">{item.data.forward}</p>
                <p className="item-author">{item.data.words_info}</p>
            </div>
        </div>
    );
}

export default Card;