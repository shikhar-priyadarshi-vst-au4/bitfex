import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Footer.css';
import Bitfex from '../../../assets/img/Bitfex-logo.svg';

class index extends Component {
  render() {
    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-12">
              <div className="footer-content">
                <a href="#">
                  <img src={Bitfex} />
                </a>
                <p>
                  Bitfex is a Crypto Derivatives Exchange, providing traders a
                  diverse range of trading products, a highly secure and
                  intuitive trading interface. Bitfex is owned by Ananta Global,
                  registered in Seychelles.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-4">
              <div className="footer-links">
                <h4>About</h4>
                <ul className="footer-common-links">
                  <li>
                    <a href="assets/about-us.html" target="_blank">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="assets/privacy-policy.html"
                      target="_blank"
                      title="Privacy Policy"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="assets/terms-of-use.html" target="_blank">
                      Terms of Use
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-4">
              <div className="footer-links">
                <h4>CONTACT US</h4>
                <div className="footer-contact-links">
                  <ul>
                    <li>
                      <strong>Investors:</strong>
                      <a href="mailto:investment@idap.io">investment@idap.io</a>
                    </li>
                    <li>
                      <strong>Queries:</strong>
                      <a href="mailto:info@bitfex.com">info@bitfex.com</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-sm-3">
              <div className="footer-links">
                <h4>Social</h4>
                <div className="footer-social-media">
                  <ul className="d-flex flex-wrap">
                    <li>
                      <a
                        href="https://t.me/BitfexDotCom"
                        title="Telegram"
                        target="_blank"
                        className="telegram-icon"
                      >
                        Telegram
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/BitfexDotCom"
                        target="_blank"
                        title="Twitter"
                        className="twitter-icon"
                      >
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/company/bitfex/"
                        target="_blank"
                        title="LinkedIn"
                        className="linkedin-icon"
                      >
                        Linkedin
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.facebook.com/BitfexDotCom"
                        target="_blank"
                        title="Facebook"
                        className="facebook-icon"
                      >
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/bitfexdotcom"
                        title="Instagram"
                        target="_blank"
                        className="instagram-icon"
                      >
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.youtube.com/channel/UCGAJakK0ziGmn51yC_-9pyQ"
                        title="YouTube"
                        target="_blank"
                        className="youtube-icon"
                      >
                        Youtube
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-container d-flex flex-wrap">
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <div className="copyright">
                  Copyright © 2019 Bitfex, All Right Reserved
                </div>
              </div>
              <div className="col-sm-4">
                <div className="UTC-dated" id="UTC-dated">
                  2019/09/10 13:39:20
                </div>
              </div>
              <div className="col-sm-4">
                <div className="powered-by">
                  Powered By
                  <a href="https://www.idap.io/" target="_blank">
                    idap.io
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default index;
