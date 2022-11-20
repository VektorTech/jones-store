import Head from "next/head";

export default function PaymentCancel() {
  return (
    <div className="page">
      <div className="page__container">
        <Head>
          <title>Payment Cancelled</title>
        </Head>
        <h1 className="main-heading">Payment Cancelled</h1>
        <section>
          <p>
            Forgot to add something to your cart? Shop around then come back to
            pay!
          </p>
        </section>
      </div>
    </div>
  );
}
