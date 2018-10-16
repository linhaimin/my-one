import React from 'react';
import './footer.css';

const Footer = (item) => {
    return (
        item ? 
        <div className="block-footer">
            <span className="previous-item" data-itemid={item.previous} onClick={item.getItem}>上一篇</span>
            <span className="next-item" data-itemid={item.next} onClick={item.getItem}>下一篇</span>
        </div> : ''
    )
}

export default Footer;