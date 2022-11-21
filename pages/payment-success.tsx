import Head from "next/head";

export default function PaymentSuccess() {
  return (
    <div className="page">
      <div className="page__container">
        <Head>
          <title>Thanks for your order!</title>
        </Head>
        <h1 className="main-heading">Payment Received</h1>
        <section>
          <p>
            We appreciate your business! If you have any questions, please email
            {" "}<a href="mailto:orders@jones.com">orders@jones.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
