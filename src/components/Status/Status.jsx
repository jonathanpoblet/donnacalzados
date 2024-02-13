import React, { useEffect, useState } from 'react';

function Status({ payId }) {
  console.log(payId);
  const [renderStatus, setRenderStatus] = useState(false);

  useEffect(() => {
    if (renderStatus) {
      const fetchData = async () => {
        const mp = new MercadoPago('TEST-907ca3b4-73cf-4b28-895c-6604f59c5000', {
          locale: 'es-AR',
        });
        const bricksBuilder = mp.bricks();
        const renderStatusScreenBrick = async bricksBuilder => {
          const settings = {
            initialization: {
              paymentId: payId,
            },
            customization: {
              visual: {
                hideStatusDetails: true,
                hideTransactionDate: true,
                style: {
                  theme: 'default',
                },
              },
              backUrls: {
                error: 'http://localhost:5173/donnacalzados/#/',
                return: 'http://localhost:5173/donnacalzados/#/',
              },
            },
            callbacks: {
              onReady: () => {
                // Callback called when Brick is ready
              },
              onError: error => {
                // Callback called for all Brick error cases
              },
            },
          };
          window.statusScreenBrickController = await bricksBuilder.create('statusScreen', 'statusScreenBrick_container', settings);
        };
        renderStatusScreenBrick(bricksBuilder);
      };

      fetchData();
    }
  }, [renderStatus]);

  useEffect(() => {
    setRenderStatus(true);
  }, []);

  if (payId)
    return (
      <>
        <h1 style={{ letterSpacing: '1px', fontSize: '15px', marginBottom: '50px', marginTop: '20px' }}>
          Muchas gracias por su compra! Recibira un email con los detalles de los productos comprados. Recuerde que los envios se realizan a partir de los 5 dias habiles despues de haber realizado la
          compra. Una vez enviado los calzados, recibira un email con el codigo de seguimiento.
        </h1>
        <div id='statusScreenBrick_container'></div>
      </>
    );
}

export default Status;
