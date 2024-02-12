import { loadMercadoPago } from '@mercadopago/sdk-js';

export class MercadoPagoInstance {
  static publicKey = null;
  static options = {};
  static instanceMercadoPago = undefined;
  static loadedInstanceMercadoPago = false;

  static async getInstance() {
    if (this.publicKey) {
      if (!this.loadedInstanceMercadoPago) {
        await loadMercadoPago();
        this.loadedInstanceMercadoPago = true;
      }
      if (!this.instanceMercadoPago) {
        this.instanceMercadoPago = new window.MercadoPago(this.publicKey, this.options);
      }
      return this.instanceMercadoPago;
    } else {
      console.error('Expected the PUBLIC_KEY to render the MercadoPago SDK React');
    }
  }
}

function isOptionsObjectUnchanged(oldOption, newOption) {
  const checkOptionObject =
    Object.keys(oldOption).length === Object.keys(newOption).length &&
    Object.keys(oldOption).every(key => {
      return Object.prototype.hasOwnProperty.call(newOption, key) && oldOption[key] === newOption[key];
    });
  return checkOptionObject;
}

const initMercadoPago = (publicKey, options) => {
  const injectFrontEndOption = { ...options, frontEndStack: 'react' };

  const didOptionsChange = !isOptionsObjectUnchanged(MercadoPagoInstance.options, injectFrontEndOption);
  if (publicKey !== MercadoPagoInstance.publicKey || didOptionsChange) {
    MercadoPagoInstance.publicKey = publicKey;
    MercadoPagoInstance.options = injectFrontEndOption;
    MercadoPagoInstance.instanceMercadoPago = undefined;
  }
};

export default initMercadoPago;
