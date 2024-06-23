
const PaymentHistoryTable = ({item}) => {
  return (
    <tr>
        <td>
      {item.date}
    </td>
    <td>
      {item.price}
    </td>
    <td>
      {item.transactionId}
    </td>
  </tr>
  );
};

export default PaymentHistoryTable;