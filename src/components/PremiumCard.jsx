import React from 'react';
import './styles.css'

const PremiumCard = ({
    discount = 50,
    title = "Premium",
    priceStr,
    desc,
    params = [],
    onGet,
}) => {
    return (
        <div className="premium-card">
            <div className="ribbon-wrapper">
                <div className="ribbon">{discount}% off</div>
            </div>
            <section className="premium-section">
                <div>
                    <div style={{display:"grid", gap:"20px"}}>
                        <p className="premium-title">{title}</p>
                        <p className="premium-price">{priceStr}</p>
                        <p className="premium-desc">{desc}</p>
                        <ul className='premium-params'>
                            {params.map((e, i) => {
                                return (<li style={{display:"flex", gap:"20px", alignItems:"center"}}>{e.icon}{e.content}</li>)
                            })}
                        </ul>
                    </div>
                </div>
                <div>
                    <a className="premium-button" onClick={onGet}>Get started</a>
                </div>
            </section>
        </div>
    );
}

export default PremiumCard;