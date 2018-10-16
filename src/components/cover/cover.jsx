import React from 'react';

const Cover = ({data, date}) => {
    const monthArr = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
    return (
        <div>
            <div className="box-image">
                <div>
                    <a href="">
                        <img src={data.img_url ? data.img_url : ''} alt="" style={{width: document.documentElement.clientWidth, height: document.documentElement.clientHeight - 45, objectFit: 'cover'}} />
                    </a>
                    <div className="box-mobilce" style={{width: document.documentElement.clientWidth, height: document.documentElement.clientHeight - 45 }}>
                        <div className="box-text">
                            <p className="day">{date[2] ? date[2] : ''}</p>
                            <p className="volume">{data.volume ? data.volume : ''} | {date[1] ? monthArr[date[1] -1 ] + '.' + ' ' + date[0] : ''}</p>
                            <p className="forward">{data.forward}</p>
                            <div>
                                <a href="#text-anchor"><img className="icon-next" src="http://image.wufazhuce.com/m.wufazhuce.com-arrow-down.png" alt=""/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="text-anchor"></div>
        </div>
    )
}

export default Cover;