import AutoComplete from "@Components/common/formControls/AutoComplete";
import Button from "@Components/common/formControls/Button";
import Dropdown from "@Components/common/formControls/Dropdown";
import RadioList from "@Components/common/formControls/RadioList";
import TextField from "@Components/common/formControls/TextField";

import SEO from "@Components/common/SEO";
import AuthForm from "@Components/user/AuthForm";
import HeroBanner from "@Components/HeroBanner";

export default function SignInPage() {
  return (
    <>
      <HeroBanner short />
      <SEO title="Sign In" />
      <AuthForm />

      <br />

      <div style={{ width: "50%", margin: "0 auto" }}>
        <TextField name="email" type="email" required label="Email" />
        <TextField multiline label="Full Name" />
        <TextField type="password" label="Password" />
        <Button>Test Action</Button>
        <Dropdown options={["red", "blue", "green", "indigo", "violet"]} />
        <AutoComplete options={["red", "blue", "green", "indigo", "violet"]} />
        <RadioList
          label="Select Colors"
          name="color"
          values={["red", "blue", "green", "indigo", "violet"]}
        />
        <RadioList
          label="Select One Fruit"
          name="fruit"
          checkbox
          values={[
            "apple",
            "banana",
            "grape",
            "mango",
            "melon",
            "orange",
            "pineapple",
          ]}
        />
      </div>
    </>
  );
}
