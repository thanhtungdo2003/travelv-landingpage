import React from 'react';
import styled from 'styled-components';

const BookingSummary = ({
  hasEmail = false,
  hasPhone = false,
  hasName = false,
  amountOfAdult = 0,
  amountOfChildren = 0,
  amountOfBaby = 0,
  amountOfSingleRoom = 0,
  amountOfSuite = 0,
  tour,
  onCheckOut
}) => {
  const getSubtotal = () => {
    try {
      return Number((tour?.price * (amountOfAdult) + ((tour?.price * 0.8) * amountOfChildren)))
    } catch {
      return NaN
    }
  }
  return (
    <StyledWrapper style={{
      position: "sticky",
      top: 100
    }}>
      <div className="master-container">
        <div className="tour-summary-card cart">
          <label className="title">Your cart</label>
          <div className="tour___infos">
            <div className="tour-info___primary">
              <img src={tour?.thumbnailURL} />
              <div className='___title'>
                <span>{tour?.title}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="tour-summary-card bill">
          <label className="title">Detail</label>
          <div style={{ padding: "10px" }}>
            <div className='___detail-item'><label>Price / person:</label><span>{tour?.price.toLocaleString()}đ</span></div>
            <div className='___detail-item'><label>Amount of adult:</label><span>{amountOfAdult}</span></div>
            <div className='___detail-item'><label>Amount of children (discount 20%):</label><span>{amountOfChildren}</span></div>
            <div className='___detail-item'><label>Amount of baby (free):</label><span>{amountOfBaby}</span></div>
            <div className='___detail-item'><label>Amount of single room:</label><span>{amountOfSingleRoom}</span></div>
            <div className='___detail-item'><label>Amount of suite:</label><span>{amountOfSuite}</span></div>
          </div>
        </div>
        <div className="tour-summary-card coupons">
          <label className="title">Apply coupons</label>
          <form className="form">
            <input type="text" placeholder="Apply your coupons here" className="input_field" />
            <button>Apply</button>
          </form>
        </div>
        <div className="tour-summary-card checkout">
          <label className="title">Checkout</label>
          <div className="details">
            <span>Subtotal:</span>
            <span>{getSubtotal().toLocaleString()}đ</span>
            <span>Discount through applied coupons:</span>
            <span>0đ</span>
          </div>
          <div className="checkout--footer">
            <label className="price"><sup>VND</sup>{getSubtotal().toLocaleString()}</label>
            <button className={`checkout-btn ${!hasEmail || !hasName || !hasPhone ? 'off' : 'on'}`} onClick={onCheckOut}
              disabled={!hasEmail || !hasName || !hasPhone}
            >{!hasEmail || !hasName || !hasPhone ? 'Fill in all infomations' : 'Next to payment'}</button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .master-container {
    display: grid;
    grid-template-columns: auto;
    gap: 5px;
  }

  .tour-summary-card {
    background: #FFFFFF;
    box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  }

  .title {
    width: 100%;
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-bottom: 1px solid #efeff3;
    font-weight: 700;
    font-size: 11px;
    color: #63656b;
  }

  /* cart */
  .cart {
    border-radius: 19px 19px 7px 7px;
  }

  .cart .tour___infos {
    display: flex;
    flex-direction: column;
    padding: 10px;
    
  }

  .cart .tour___infos .tour-info___primary {
    display: flex;
    gap: 10px;
    img{
        width: 200px;
        height: 130px;
        object-fit: cover;
        border-radius: 10px;
        overflow: hidden;
    }
  }

  .cart .tour___infos .tour-info___primary .___title {
    flex: 2;
    font-size: 13px;
    font-weight: 600;
    color: #47484b;
    margin-bottom: 8px;
    display: block;
  }

  .cart .tour___infos .tour-info___primary p {
    font-size: 11px;
    font-weight: 600;
    color: #7a7c81;
  }

  .tour-summary-card .small {
    font-size: 15px;
    margin: 0 0 auto auto;
  }

  .tour-summary-card .small sup {
    font-size: px;
  }
  
  .coupons {
    border-radius: 7px;
  }

  .coupons form {
    display: grid;
    grid-template-columns: 1fr 80px;
    gap: 10px;
    padding: 10px;
  }

  .input_field {
    width: auto;
    height: 36px;
    padding: 0 0 0 12px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #e5e5e5;
    filter: drop-shadow(0px 1px 0px #efefef)
      drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
  }

  .input_field:focus {
    border: 1px solid transparent;
    box-shadow: 0px 0px 0px 2px #242424;
    background-color: transparent;
  }

  .coupons form button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 18px;
    gap: 10px;
    width: 100%;
    height: 36px;
    background: linear-gradient(180deg, #4480FF 0%, #115DFC 50%, #0550ED 100%);
    box-shadow: 0px 0.5px 0.5px #EFEFEF, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
    border-radius: 5px;
    border: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: #ffffff;
  }

  /* Checkout */
  .checkout {
    border-radius: 9px 9px 19px 19px;
  }

  .checkout .details {
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 10px;
    gap: 5px;
  }

  .checkout .details span {
    font-size: 13px;
    font-weight: 600;
  }

  .checkout .details span:nth-child(odd) {
    font-size: 11px;
    font-weight: 700;
    color: #707175;
    margin: auto auto auto 0;
  }

  .checkout .details span:nth-child(even) {
    font-size: 13px;
    font-weight: 600;
    color: #47484b;
    margin: auto 0 auto auto;
  }

  .checkout .checkout--footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 10px 20px;
    background-color: #efeff3;
  }

  .price {
    position: relative;
    font-size: 22px;
    color: #2B2B2F;
    font-weight: 900;
  }

  .price sup {
    font-size: 13px;
  }

  .price sub {
    width: fit-content;
    position: absolute;
    font-size: 11px;
    color: #5F5D6B;
    bottom: 5px;
    display: inline-block;
  }

  .checkout .checkout-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 36px;
    box-shadow: 0px 0.5px 0.5px #EFEFEF, 0px 1px 0.5px rgba(239, 239, 239, 0.5);
    border-radius: 7px;
    border: 0;
    outline: none;
    font-sirgba(13, 12, 12, 1)x;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
    font-size: 13px
  }
  .checkout .checkout-btn.on {
    background: linear-gradient(180deg, #4480FF 0%, #115DFC 50%, #0550ED 100%);
    color: #ffffff;
  }
  .checkout .checkout-btn.off {
    background: linear-gradient(180deg, #818a9dff 0%, #7f889cff 50%, #8990a0ff 100%);
    color: #ffffff;
  }
  `
  
  ;

export default BookingSummary;
