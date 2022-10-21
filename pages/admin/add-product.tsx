import Form, { beforeSubmitType } from "@Components/Form";
import { cloudinaryUpload } from "@Lib/utils";

import TextField from "@Components/common/formControls/TextField";
import AutoComplete from "@Components/common/formControls/AutoComplete";
import Button from "@Components/common/formControls/Button";
import Dropdown from "@Components/common/formControls/Dropdown";
import RadioList from "@Components/common/formControls/RadioList";

import { Gender, Category } from "@prisma/client";

const CategoriesData = require("@Lib/CategoriesData.json");

export default function AddProduct() {
  const handleSubmit: beforeSubmitType = async (params, formElement) => {
    const { files } = formElement.getElementById(
      "product-images"
    ) as HTMLInputElement;

    if (files) {
      const uploads = await cloudinaryUpload(files);
      params["mediaURLs"] = uploads.map((r) => r.secure_url).join("\n");

      return [params, true];
    }
  };

  return (
    <div className="admin__section">
      <Form beforeSubmit={handleSubmit} method="POST" action="/api/products">
        <TextField name="id" label="ID" />

        <TextField name="stockQty" label="Stock Quantity" />

        <TextField name="title" label="Title" />

        <TextField name="price" label="Price" />

        <TextField name="discount" label="Discount" />

        <TextField name="shippingCost" label="Shipping Cost" />

        <TextField name="details" multiline label="Details" />

        <input id="product-images" type="file" accept="image/*" multiple />

        <AutoComplete
          name="color"
          options={CategoriesData.colorways.reduce(
            (obj: any, colorway: any) => {
              return (obj[colorway] = colorway);
            },
            {}
          )}
        />

        <TextField
          pattern="[0-9]*"
          min={1985}
          max={new Date().getFullYear()}
          name="year"
          type="number"
          inputMode="numeric"
          label="Details"
        />

        <TextField name="sku" label="SKU" />

        <Dropdown name="gender" label="Gender" options={Gender} />

        <RadioList name="size" label="Select Sizes" values={[...Array(40)].map((_, i) => String(1 + i / 2))} />

        <Dropdown name="type" label="Category Type" options={Category} />

        <Button type="submit">Add To Inventory</Button>

        <Button type="reset">Reset Form</Button>
      </Form>
    </div>
  );
}
