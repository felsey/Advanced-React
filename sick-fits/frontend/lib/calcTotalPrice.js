const calcTotalPrice = (array_items) => {
  const totalPrice = array_items.reduce((total, item) => {
    if (!item.product) return total;
    return total + item?.quantity * item?.product?.price;
  }, 0);

  return totalPrice;
};

export default calcTotalPrice;
