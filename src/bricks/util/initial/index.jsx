const onSubmitDefault = async () => {};
const onReadyDefault = () => {};
const onErrorDefault = error => {
  console.error(error);
};
const onBinChangeDefault = bin => {
  {
    console.log(bin);
  }
};
const onClickEditShippingDataDefault = () => {
  console.log('onClickEditShippingData default implementation');
};
const onClickEditBillingDataDefault = () => {
  console.log('onClickEditShippingData default implementation');
};
const onRenderNextStepDefault = currentStep => {
  console.log(currentStep);
};
const onRenderPreviousStepDefault = currentStep => {
  console.log(currentStep);
};

export { onErrorDefault, onReadyDefault, onSubmitDefault, onBinChangeDefault, onClickEditShippingDataDefault, onClickEditBillingDataDefault, onRenderNextStepDefault, onRenderPreviousStepDefault };
