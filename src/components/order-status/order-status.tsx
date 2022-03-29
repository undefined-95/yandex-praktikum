import React, { FC } from 'react';

type TStatus = {
  status: string;
};

const OrderStatus: FC<TStatus> = ({ status }) => {
  let textStyle = '';
  let statusRus = '';
  switch (status) {
    case 'pending':
      textStyle = '#00CCCC';
      statusRus = 'Готовится';
      break;
    case 'reject':
      textStyle = '#E52B1A';
      statusRus = 'Отменен';
      break;
    default:
      textStyle = '#F2F2F3';
      statusRus = 'Выполнен';
  }

  return (
    <>
      <span
        className='text text_type_main-default pt-2'
        style={{ color: textStyle }}
      >
        {statusRus}
      </span>
    </>
  );
};

export default OrderStatus;
