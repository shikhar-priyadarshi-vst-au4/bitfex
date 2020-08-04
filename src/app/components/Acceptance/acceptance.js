import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import "./acceptance.css";

const Toggle = ({ name, handleChange, ...props }) => (<>
    <Switch
        checked={props[name]}
        onChange={handleChange}
        color="primary"
        name={name}
        inputProps={{ 'aria-label': 'primary checkbox' }}
    />
</>)

export const Acceptance = () => {
    const [acceptance, setAcceptance] = useState({
        loc1: false,
        loc2: false,
        loc3: false,
        risk1: false,
        risk2: false,
        risk3: false,
        liq1: false,
        liq2: false,
        usrAgreement: false,
        privacyPolicy: false,
        kyc: false
    })
    const onChangeHandle = (e) => {
        setAcceptance({ ...acceptance, [e.target.name]: !acceptance[e.target.name] });
    }
    return (<>
        <div className="container">
            <div className="acceptance-wrapper">
                <div className="agreement-header d-flex flex-column align-items-center">
                    <div className="agreement-heading d-flex flex-column align-items-center">
                        <span>Alpha5 - User Agreement</span>
                        <span>acceptance questions</span>
                    </div>
                    <div className="agreement-body d-flex flex-column align-items-center">
                        <span>Thank you for applying to open an account with Alpha5.</span>
                        <span>
                            Before we can open your account, we need you to read and agree to the
                            following important notices about trading on Alpha5.
        </span>
                    </div>
                </div>
                <div className="list-head">Prohibited Locations</div>
                <div
                    className="list-item d-flex flex-md-row flex-column-reverse"
                >
                    <div className="switch">
                        <Toggle name="loc1" handleChange={onChangeHandle} {...acceptance} />
                    </div>
                    <div className="item-decription">
                        I CONFIRM AND CERTIFY THAT I AM NOT A CITIZEN OR RESIDENT OF THE UNITED
                        STATES OF AMERICA
      </div>
                </div>
                <div

                    className="list-item d-flex flex-md-row flex-column-reverse"
                >
                    <div className="switch">
                        <Toggle name="loc2" handleChange={onChangeHandle} {...acceptance} />
                    </div>
                    <div className="item-decription">
                        I CONFIRM THAT I WILL NOT ACCESS OR ATTEMPT TO ACCESS ALPHA5 WHILE
                        PHYSICALLY LOCATED IN THE UNITED STATES OF AMERICA
      </div>
                </div>
                <div

                    className="list-item d-flex flex-md-row flex-column-reverse"
                >
                    <div className="switch">
                        <Toggle name="loc3" handleChange={onChangeHandle} {...acceptance} />
                    </div>
                    <div className="item-decription">
                        I confirm and certify that I am not a citizen or resident of, and am
                        will not access or attempt to access Alpha5 while physically located in,
                        any of the following locations: Belarus, Burma, Crimea and Sevastopol,
                        Cote d’Ivoire, Cuba, Democratic Republic of Congo,Iran, Iraq, Liberia,
                        North Korea, Sudan, Syria, Zimbabwe
      </div>
                </div>
                <div className="list-head">Risk Of Trading On Alpha5</div>
                <div

                    className="list-item d-flex flex-md-row flex-column-reverse"
                >
                    <div className="switch">
                        <Toggle name="risk1" handleChange={onChangeHandle} {...acceptance} />
                    </div>
                    <div className="item-decription">
                        I confirm that I understand the risks of loss involved with trading
                        leveraged financial instruments.
      </div>
                </div>
                <div

                    className="list-item d-flex flex-md-row flex-column-reverse"
                >
                    <div className="switch">
                        <Toggle name="risk2" handleChange={onChangeHandle} {...acceptance} />
                    </div>
                    <div className="item-decription">
                        I confirm and certify that I am a professional trader with prior
                        experience trading sophisticated financial products including
                        derivatives and leveraged trading
      </div>
                </div>
                <div

                    className="list-item d-flex flex-md-row flex-column-reverse"
                >
                    <div className="switch">
                        <Toggle name="risk3" handleChange={onChangeHandle} {...acceptance} />
                    </div>
                    <div className="item-decription">
                        I confirm and certify that I am not a citizen or resident of, and am
                        will not access or attempt to access Alpha5 while physically located in,
                        any of the following locations: Belarus, Burma, Crimea and Sevastopol,
                        Cote d’Ivoire, Cuba, Democratic Republic of Congo,Iran, Iraq, Liberia,
                        North Korea, Sudan, Syria, Zimbabwe
      </div>
                </div>
                <div className="list-head">Liquidations</div>
                <div

                    className="list-item d-flex flex-md-row flex-column-reverse"
                >
                    <div className="switch">
                        <Toggle name="liq1" handleChange={onChangeHandle} {...acceptance} />
                    </div>
                    <div className="item-decription">
                        I confirm that I have read and understand the operation of Alpha5’s
                        margin requirements, liquidation program, late liquidity pool and
                        insurance fund.
      </div>
                </div>
                <div

                    className="list-item d-flex flex-md-row flex-column-reverse"
                >
                    <div className="switch">
                        <Toggle name="liq2" handleChange={onChangeHandle} {...acceptance} />
                    </div>
                    <div className="item-decription">
                        I confirm that I understand it is my responsibility to ensure my account
                        meets margin requirements at all time, and that if I fail to do so, I
                        MAY LOSE THE ENTIRE VALUE OF MY POSITION AND MY MARGIN COLLATERAL, UP TO
                        THE TOTAL VALUE OF FUNDS IN MY ACCOUNT.
      </div>
                </div>
                <div className="list-head">Agreements</div>
                <div className="final-wrapper row">
                    <div className="final-agreements col-md-6 col-sm-12">
                        <div className="point-description">
                            I confirm that I have read, understood and agree to be bound by each
                            of the following documents
        </div>
                        <div style={{ marginTop: "2rem" }} className="d-flex flex-column">
                            <div className="point d-flex">
                                <Toggle name="usrAgreement" handleChange={onChangeHandle} {...acceptance} />
                                <span>User Agreement</span>
                            </div>
                            <div className="point d-flex">
                                <Toggle name="privacyPolicy" handleChange={onChangeHandle} {...acceptance} />
                                <span>Privacy Policy</span>
                            </div>
                            <div className="point d-flex">
                                <Toggle name="kyc" handleChange={onChangeHandle} {...acceptance} />
                                <span>KYC Policy</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className="continue col-md-6 col-sm-12 d-flex flex-column align-items-md-start"
                    >
                        <div className="point-description">
                            If you have any questions about any of these notices or trading on
                            Alpha5, we would be happy to assist you. Please contact us at
                            info@alpha5.io at any time
          <br />
                            <button >
                                CONTINUE
          </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>)
}