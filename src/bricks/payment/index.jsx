import React, { useEffect } from 'react';
import { DEBOUNCE_TIME_RENDER } from '../util/constants';
import {
  onBinChangeDefault,
  onClickEditBillingDataDefault,
  onClickEditShippingDataDefault,
  onErrorDefault,
  onReadyDefault,
  onRenderNextStepDefault,
  onRenderPreviousStepDefault,
  onSubmitDefault,
} from '../util/initial';
import { initBrick } from '../util/renderBrick';

const Payment = ({
  onReady = onReadyDefault,
  onError = onErrorDefault,
  onSubmit = onSubmitDefault,
  onBinChange = onBinChangeDefault,
  onClickEditShippingData = onClickEditShippingDataDefault,
  onClickEditBillingData = onClickEditBillingDataDefault,
  onRenderNextStep = onRenderNextStepDefault,
  onRenderPreviousStep = onRenderPreviousStepDefault,
  initialization,
  customization,
  locale,
}) => {
  useEffect(() => {
    let timer;
    const PaymentBrickController = {
      settings: {
        initialization,
        customization,
        locale,
        callbacks: {
          onReady,
          onError,
          onSubmit,
          onBinChange,
          onClickEditShippingData,
          onClickEditBillingData,
          onRenderNextStep,
          onRenderPreviousStep,
        },
      },
      name: 'payment',
      divId: 'paymentBrick_container',
      controller: 'paymentBrickController',
    };
    timer = setTimeout(() => {
      initBrick(PaymentBrickController);
    }, DEBOUNCE_TIME_RENDER);

    return () => {
      clearTimeout(timer);
      window.paymentBrickController?.unmount();
    };
  }, [initialization, customization, onReady, onError, onSubmit, onBinChange]);

  return <div id='paymentBrick_container'></div>;
};

const usePaymentBrick = () => {
  const update = updateValues => {
    if (window.paymentBrickController) {
      window.paymentBrickController.update(updateValues);
    } else {
      console.warn('[Checkout Bricks] Payment Brick is not initialized yet, please try again after a few seconds.');
    }
  };
  return { update };
};

export default Payment;
export { usePaymentBrick };
