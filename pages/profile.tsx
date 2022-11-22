import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { User } from "@prisma/client";

import TextField from "@Components/formControls/TextField";
import Button from "@Components/formControls/Button";
import Form from "@Components/common/Form";

import { withSessionSsr } from "@Lib/withSession";
import prisma from "@Lib/prisma";
import { NextPage } from "next";

const ProfilePage: NextPage<ProfilePageType> = ({ user }) => {
  const [imageSrc] = useState("/assets/images/user-avatar.jpg");

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className="profile">
      <h1 className="profile__main-heading">Edit User Profile</h1>

      <div className="profile__avatar">
        <h2 className="profile__heading">Avatar</h2>
        <Image
          objectFit="cover"
          src={user.avatarURL ?? imageSrc}
          width={200}
          height={200}
          alt="profile"
        />
        <form action="">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <Button type="submit">Upload New Avatar</Button>
        </form>
      </div>

      <Form action={`/api/auth/edit/${user.id}`} method="POST">
        <fieldset className="profile__fieldset">
          <legend className="profile__heading">User Info</legend>
          <TextField label="Username" value={user.username} name="username" />
          <TextField
            label="Email"
            value={user.email}
            name="email"
            type="email"
          />
          <TextField
            className="profile__name-input"
            label="First Name"
            value={user.firstName ?? ""}
            name="firstName"
          />
          <TextField
            className="profile__name-input"
            label="Last Name"
            value={user.lastName ?? ""}
            name="lastName"
          />
          <TextField
            label="Phone"
            value={user.phoneNumber ?? ""}
            name="phoneNumber"
          />
          <TextField label="Password" name="password" type="password" />
          <Button type="submit">Save</Button>
        </fieldset>
      </Form>

      <br />

      <Form action="" method="POST">
        <fieldset className="profile__fieldset">
          <legend className="profile__heading">Address</legend>
          <TextField label="Address Line 1" />
          <TextField label="Address Line 2" />
          <TextField className="profile__address-input" label="Unit #" />
          <TextField className="profile__address-input" label="City" />
          <TextField className="profile__address-input" label="Region" />
          <TextField className="profile__address-input" label="Postal Code" />
          <TextField label="Country" />
        </fieldset>
      </Form>
    </div>
  );
};

export const getServerSideProps = withSessionSsr(async function ({
  params,
  req,
  query,
}) {
  const { user } = req.session;

  const userRecord = await prisma.user
    .findUnique({
      select: {
        username: true,
        avatarURL: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        id: true,
        email: true,
        role: true,
        userAddress: true,
      },
      where: { id: user?.id },
    })
    .catch(console.log);

  if (!userRecord)
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };

  return {
    props: {
      user: userRecord,
    },
  };
});

export default ProfilePage;

interface ProfilePageType {
  user: User;
}
