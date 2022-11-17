export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "code",
});

export const currencyFormatter2 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
