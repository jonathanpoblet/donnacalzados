import { MercadoPagoInstance } from '../../../mercadoPago/initMercadoPago';

export const initBrick = async ({ settings, name, divId, controller }) => {
  const instanceMercadoPago = await MercadoPagoInstance.getInstance();
  const bricksBuilder = instanceMercadoPago?.bricks();

  window[controller] = await bricksBuilder?.create(name, divId, settings);
};
