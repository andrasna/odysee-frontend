// @flow
import * as ICONS from 'constants/icons';
import * as MODALS from 'constants/modal_types';
import * as PAGES from 'constants/pages';
import React from 'react';
import CreditAmount from 'component/common/credit-amount';
import Button from 'component/button';
import HelpLink from 'component/common/help-link';
import Card from 'component/common/card';
import Icon from 'component/common/icon';
import LbcSymbol from 'component/common/lbc-symbol';
import I18nMessage from 'component/i18nMessage';
import { formatNumberWithCommas } from 'util/number';

type Props = {
  totalTippedAmount: number,
  accountDetails: any,
};



const WalletBalance = (props: Props) => {
  const {
    accountDetails,
    totalTippedAmount,
  } = props;

  const [detailsExpanded, setDetailsExpanded] = React.useState(false);


  console.log('total tipped amount')
  console.log(totalTippedAmount)

  // console.log('account details');
  // console.log(accountDetails);

  return (
    <>{1 == 1 && <Card
      title={<><Icon size="18" icon={ICONS.FINANCE} />{totalTippedAmount} USD</>}
      subtitle={
          <I18nMessage>
            The total amount you have tipped to different creators
          </I18nMessage>
      }
      actions={
        <>
          <h2 className="section__title--small">
            ${accountDetails && accountDetails.total_tipped / 100 } Received Total
          </h2>

          <h2 className="section__title--small">
            ${accountDetails && accountDetails.total_paid_out/100 }  Withdrawn
            <Button
              button="link"
              label={detailsExpanded ? __('View less') : __('View more')}
              iconRight={detailsExpanded ? ICONS.UP : ICONS.DOWN}
              onClick={() => setDetailsExpanded(!detailsExpanded)}
            />
          </h2>

          {/* view more section */}
          {detailsExpanded && (
            <div className="section__subtitle">
              <dl>
                <dt>
                  <span className="dt__text">{__('...earned from others')}</span>
                  <span className="help--dt">({__('Unlock to spend')})</span>
                </dt>
                <dd>
                  <span className="dd__text">
                    {Boolean(tipsBalance) && (
                      <Button
                        button="link"
                        className="dd__button"
                        disabled={operationPending}
                        icon={ICONS.UNLOCK}
                        onClick={() => doOpenModal(MODALS.MASS_TIP_UNLOCK)}
                      />
                    )}
                    <CreditAmount amount={tipsBalance} precision={4} />
                  </span>
                </dd>

                <dt>
                  <span className="dt__text">{__('...on initial publishes')}</span>
                  <span className="help--dt">({__('Delete or edit past content to spend')})</span>
                </dt>
                <dd>
                  <CreditAmount amount={claimsBalance} precision={4} />
                </dd>

                <dt>
                  <span className="dt__text">{__('...supporting content')}</span>
                  <span className="help--dt">({__('Delete supports to spend')})</span>
                </dt>
                <dd>
                  <CreditAmount amount={supportsBalance} precision={4} />
                </dd>
              </dl>
            </div>
          )}

          <div className="section__actions">
            <Button button="primary" label={__('Receive Payout')} icon={ICONS.SEND}  />
            <Button button="secondary" label={__('Account Configuration')} icon={ICONS.SETTINGS} navigate={`/$/${PAGES.SETTINGS_STRIPE_ACCOUNT}`} />
          </div>
        </>
      }
    />}</>
  );
};

export default WalletBalance;
