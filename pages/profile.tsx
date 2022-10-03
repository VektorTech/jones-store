import Image from "next/image";

export default function Profile() {
  return (
    <div className="profile">
      <div className="profile__avatar">
        {/* <Image /> */}
        <button>Edit</button>
      </div>

      <form>
        <label htmlFor="">
          Username
          <input type="text" />
        </label>
        <label htmlFor="">
          Email
          <input type="text" />
        </label>
        <label htmlFor="">
          First Name
          <input type="text" />
        </label>
        <label htmlFor="">
          Last Name
          <input type="text" />
        </label>
        <label htmlFor="">
          Phone
          <input type="text" />
        </label>
      </form>

      <form action="">
        <label htmlFor="">
          Address Line 1
          <input type="text" />
        </label>
        <label htmlFor="">
          Address Line 2
          <input type="text" />
        </label>
        <label htmlFor="">
          Unit #
          <input type="text" />
        </label>
        <label htmlFor="">
          City
          <input type="text" />
        </label>
        <label htmlFor="">
          Region
          <input type="text" />
        </label>
        <label htmlFor="">
          Postal Code
          <input type="text" />
        </label>
        <label htmlFor="">
          Country
          <input type="text" />
        </label>
      </form>
    </div>
  );
}
