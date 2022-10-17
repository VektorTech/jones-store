import { withSessionSsr } from "@Lib/withSession";
import Image from "next/image";
import { User } from "@prisma/client";
import prisma from "@Lib/prisma";
import { ChangeEvent, useState } from "react";
import { cloudinaryUpload } from "@Lib/utils";
import { phoneRegExp, userSchema } from "@Lib/validations";

export default function Profile({ user }: { user: User }) {
  const [img, setImg] = useState("/assets/images/user-avatar.jpg");

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    // cloudinaryUpload(e.target.files, (r) => setImg(r[0]?.secure_url));
  };

  return (
    <div className="profile">
      <div className="profile__avatar">
        {/* <Image /> */}
        <button>Edit</button>
      </div>

      <Image
        objectFit="cover"
        src={img}
        width={200}
        height={200}
        alt="profile"
      />

      <form action="">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <input type="submit" value="Upload" />
      </form>

      <br />

      <form action={`/api/auth/edit/${""}`} method="POST">
        <label htmlFor="">
          Username
          <input name="username" type="text" />
        </label>
        <label htmlFor="">
          Email
          <input name="email" type="email" />
        </label>
        <label htmlFor="">
          First Name
          <input name="firstName" type="text" />
        </label>
        <label htmlFor="">
          Last Name
          <input name="lastName" type="text" />
        </label>
        <label htmlFor="">
          Phone
          <input name="phoneNumber" type="text" />
        </label>
        <label htmlFor="">
          Password
          <input name="password" type="password" />
        </label>
        <label htmlFor="">
          Avatar
          <input name="avatarURL" type="text" />
        </label>
        <input type="submit" value="Save" />
      </form>

      <br />

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

export const getServerSideProps = withSessionSsr(async function ({
  params,
  req,
  query,
}) {
  const { user } = req.session;

  const userRecord = await prisma.user
    .findUnique({
      where: { id: user?.id },
    })
    .catch(console.log);

  if(!userRecord) return {
    redirect: {
      destination: "/signin",
      permanent: false,
    }
  }

  return {
    props: {
      user: userRecord || null,
    },
  };
});
