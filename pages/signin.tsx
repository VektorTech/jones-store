import AutoComplete from "@Components/common/formControls/AutoComplete";
import Button from "@Components/common/formControls/Button";
import Dropdown from "@Components/common/formControls/Dropdown";
import RadioList from "@Components/common/formControls/RadioList";
import TextField from "@Components/common/formControls/TextField";
import IconButtonRound from "@Components/common/IconButtonRound";

import { GrCloudDownload } from "react-icons/gr";

import SEO from "@Components/common/SEO";
import AuthForm from "@Components/user/AuthForm";
import HeroBanner from "@Components/HeroBanner";

export default function SignInPage() {
  return (
    <>
      <HeroBanner short />
      <SEO title="Sign In" />
      <AuthForm />

      ----------
      <br />
      ----------

      <div>
        <TextField multiline label="Email" />
        <Button>Test</Button>
        <Dropdown options={["red", "blue", "green", "indigo", "violet"]} />
        <AutoComplete options={["red", "blue", "green", "indigo", "violet"]} />
        <RadioList label="Select Colors" checkbox values={["red", "blue", "green", "indigo", "violet"]} />
        <IconButtonRound><GrCloudDownload /></IconButtonRound>
      </div>
    </>
  );
}
