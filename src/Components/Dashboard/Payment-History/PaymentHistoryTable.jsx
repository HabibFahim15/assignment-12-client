
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
    <td className="text-green-600 font-semibold uppercase text-base">
      {item.status}
    </td>
  </tr>
  );
};

export default PaymentHistoryTable;