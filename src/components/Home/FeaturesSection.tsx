import { AiOutlineTags } from "react-icons/ai";
import { MdSupportAgent } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";

export default function FeaturesSection() {
  return (
    <section className="features">
      <div className="features__container">
        <div className="features__col">
          <div className="features__icon">
            <AiOutlineTags className="features__icon-element" />
          </div>
          <h3 className="features__title">100% money-back guarantee</h3>
          <p className="features__text">
            We offer a <strong>100% money-back guarantee</strong> for any
            returns in the 14 days protection.
          </p>
        </div>
        <div className="features__col">
          <div className="features__icon">
            <RiSecurePaymentLine className="features__icon-element" />
          </div>
          <h3 className="features__title">secure payment</h3>
          <p className="features__text">
            <strong>All cards</strong> accepted.
          </p>
        </div>
        <div className="features__col">
          <div className="features__icon">
            <MdSupportAgent className="features__icon-element" />
          </div>
          <h3 className="features__title">online support</h3>
          <p className="features__text">
            Our customer service is <strong>available 24h</strong>.
          </p>
        </div>
        <div className="features__col">
          <div className="features__icon">
            <TbTruckDelivery className="features__icon-element" />
          </div>
          <h3 className="features__title">fast shipping</h3>
          <p className="features__text">
            No matter where you are from, you&apos;ll have <strong>FAST</strong>{" "}
            shipping purchasing in Jones.
          </p>
        </div>
      </div>
    </section>
  );
}
