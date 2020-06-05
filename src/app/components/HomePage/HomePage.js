import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './HomePage.css';
import Perpetual from '../../../assets/img/Perpetual.svg';
import Futures from '../../../assets/img/Futures.svg';
import Quoted from '../../../assets/img/Quoted-Spreads.svg';
import Unique from '../../../assets/img/Unique-Trading.svg';
import Zero from '../../../assets/img/Zero-Trading.svg';
import Best from '../../../assets/img/Best-Security.svg';
import Intuitive from '../../../assets/img/Intuitive-Interface.svg';

class HomePage extends Component {
  render() {
    return (
      <div>
        {/*Banner Start*/}
        <section className="main-banner">
          <div className="banner-content d-flex">
            <div className="banner-left">
              <h1>
                <span>
                  The <span className="strong">First</span> Complete
                </span>
                <strong>Crypto Derivatives Exchange</strong>
              </h1>
              <p>Trade Perpetual, Futures and Exchange-quoted Spreads</p>
              <div className="view-exchange-btn">
                <Link to="/trade" target="_blank">
                  Trade
                </Link>
              </div>
            </div>
            <div className="banner-right">
              <div className="banner-rightcol-bottom">
                <h3>
                  Bitfex Exchange is Live
                  <br />
                </h3>
                <p>
                  Register and get <b>One Trade BTC</b> to trade instantly
                </p>

                <div className="banner-tagline">
                  <div className="signup-btn">
                    <a href="register">Register</a>
                  </div>
                </div>
              </div>
              <div className="banner-row-3">
                <h3>
                  Bitfex Referral Program
                  <br />
                </h3>
                <p>
                  Refer your friends and earn upto 90% of their trading
                  commissions
                  <br />
                </p>
                <div className="banner-tagline">
                  <div className="signup-btn">
                    <a
                      href="login"
                      style={{marginTop: '10px', fontSize: '14px'}}
                    >
                      Join Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*Contract Type*/}
        <section className="contract-type-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h3>Contract Types</h3>
                <div className="tag-content">
                  Trade three different types of Bitcoin Contracts with
                  leverage.
                  <br className="d-none d-lg-block" />
                  Contracts for more cryptocurrencies launching soon!
                </div>

                <div className="contract-type-list d-flex">
                  <div className="contract-type-each">
                    <div className="contract-type-icon">
                      <img src={Perpetual} />
                    </div>
                    <h4>Perpetual</h4>
                    <p>
                      Easy-to-trade, non-expiring crypto derivatives contracts.
                    </p>
                  </div>
                  <div className="contract-type-each">
                    <div className="contract-type-icon">
                      <img src={Futures} alt="Futures" />
                    </div>
                    <h4>Futures</h4>
                    <p>
                      Cash-settled derivatives contracts for going long or short
                      of future Bitcoin prices.
                    </p>
                  </div>
                  <div className="contract-type-each">
                    <div className="contract-type-icon">
                      <img src={Quoted} alt="Exchange-Quoted Spreads" />
                    </div>
                    <h4>Exchange-Quoted Spreads</h4>
                    <p>
                      Low-risk trading instruments to easily trade the price
                      difference of underlying futures and perpetual contracts.
                      Introduced for the first time in crypto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="why-bitfex-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h3>Why Bitfex</h3>
                <div className="tag-content">
                  Built by veteran traders and supported by a diverse community
                  of
                  <br className="d-none d-lg-block" />
                  VCs, Traders and Investors from both traditional and crypto
                  space.
                </div>

                <div className="why-bitfex-features d-flex flex-wrap">
                  <div className="why-bitfex-feature d-flex">
                    <div className="why-bitfex-feature-icon">
                      <img src={Unique} alt="Unique Trading Products" />
                    </div>
                    <div className="why-bitfex-feature-content">
                      <h4>Unique Trading Products</h4>
                      <p>
                        First to launch Exchange Quoted Spreads which
                        dramatically reduce execution risk in volatile markets.
                      </p>
                    </div>
                  </div>
                  <div className="why-bitfex-feature d-flex">
                    <div className="why-bitfex-feature-icon">
                      <img src={Zero} alt="Zero-Trading Fees" />
                    </div>
                    <div className="why-bitfex-feature-content">
                      <h4>Zero-Trading Fees</h4>
                      <p>
                        No trading fees for traders maintaining BFX threshold on
                        the Bitfex exchange.
                      </p>
                    </div>
                  </div>
                  <div className="why-bitfex-feature d-flex">
                    <div className="why-bitfex-feature-icon">
                      <img src={Best} alt="Unique Trading Products" />
                    </div>
                    <div className="why-bitfex-feature-content">
                      <h4>Maximum Security</h4>
                      <p>
                        Funds stored in multi-signature deep cold storage.
                        Insurance Fund from Day 1.
                      </p>
                    </div>
                  </div>
                  <div className="why-bitfex-feature d-flex">
                    <div className="why-bitfex-feature-icon">
                      <img src={Intuitive} alt="Unique Trading Products" />
                    </div>
                    <div className="why-bitfex-feature-content">
                      <h4>Intuitive Interface</h4>
                      <p>
                        Easy-to-use, highly customisable and trader-friendly
                        platform.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*About BFX*/}
        <section className="about-BFX-section" id="about-BFX">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h3>About BFX</h3>
                <div className="tag-content">
                  BFX is the ERC-20 utility token powering the Bitfex Ecosystem.
                  Integral to the exchange, the BFX demand is fuelled by the
                  various utilities it provides to its holders and its
                  diminishing circulating supply.
                </div>
                <div className="row BFX-benefits">
                  <div className="col-sm-12">
                    <h4>BFX Utility & Benefits</h4>
                    <ul className="d-flex flex-wrap">
                      <li>
                        <strong>For Retail Traders:</strong> HODL a minimum
                        number of BFX and get rewarded with Zero-Fee Trading
                      </li>
                      <li>
                        <strong>For Institutional Clients:</strong> HODL BFX and
                        get rewarded with Free Master Account
                      </li>
                      <li>
                        <strong>Disinflationary token supply:</strong> BFX
                        equivalent to 20% of revenue will be burnt till supply
                        reaches 500 mn BFX
                      </li>
                      <li>
                        HODL BFX and get early access to various exchange
                        events, referral programs and more
                      </li>
                      <li>USE BFX to pay trading fees and get 50% discount</li>
                      <li>
                        Stake BFX on Bitfex exchange to unlock exclusive
                        benefits and rewards
                      </li>
                    </ul>
                    <div className="buy-BFX-CTA text-center">
                      <a
                        href="https://www.probit.com/app/exchange/BFX-BTC"
                        target="_blank"
                        className="buy-bfx-btn"
                      >
                        Buy BFX on ProBit
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        /*Crypto Derivatives Trading*/
        <section className="crypto-derivatives-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h3>Want to learn how to Trade Crypto Derivatives?</h3>
                <p>
                  Register and Get <b>1 Test BTC</b> to Trade BTC Perpetual,
                  Futures &amp; Exchange-Quoted Spreads
                </p>
                <a href="register" className="try-sestnet-btn">
                  Register
                </a>
              </div>
            </div>
          </div>
        </section>
        {/*Crypto Derivatives Trading*/}
        <section className="live-trading-steps-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h3>Start Live Trading in 3 Easy Steps</h3>
                <ul className="trading-easy-steps d-flex flex-wrap">
                  <li>
                    <h4>Register</h4>
                    <p>Sign-up for your free account in less than a minute</p>
                  </li>
                  <li>
                    <h4>Deposit</h4>
                    <p>Fund your account by depositing Bitcoin</p>
                  </li>
                  <li>
                    <h4>Trade</h4>
                    <p>Make your first trade</p>
                  </li>
                </ul>
                <div className="trading-steps-CTA">
                  <a href="#" className="trading-register-btn">
                    Coming Soon
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="menu-overlay"></div>
      </div>
    );
  }
}

export default HomePage;
