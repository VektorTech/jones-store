import { Gender, Category } from "@prisma/client";

import { cloudinaryUpload, listToEnum } from "src/utils";

import Form, { beforeSubmitType } from "@Components/common/Form";
import TextField from "@Components/formControls/TextField";
import AutoComplete from "@Components/formControls/AutoComplete";
import Button from "@Components/formControls/Button";
import Dropdown from "@Components/formControls/Dropdown";

import SizeOptions from "@Components/common/SizeOptions";
import { toast } from "react-toastify";

const CategoriesData = require("@Lib/CategoriesData.json");
const Categories = listToEnum(CategoriesData?.colorways ?? []);

export default function AddProduct() {
  const handleSubmit: beforeSubmitType = async (params, formElement) => {
    const { files } = formElement.querySelector(
      "#product-images"
    ) as HTMLInputElement;

    if (files) {
      const uploads = await cloudinaryUpload(files);
      params["mediaURLs"] = uploads.map((r) => r.secure_url).join("\n");

      return [params, true];
    }
  };

  return (
    <div className="admin__section">
      <h2>Add Product</h2>
      <Form
        beforeSubmit={handleSubmit}
        afterSubmit={(res) => {
          if (res.success) {
            toast("Successfully Added Product To Database", {
              type: "success",
            });
          }
        }}
        method="POST"
        action="/api/products"
      >
        <TextField name="title" label="Title" />
        <TextField name="id" label="ID" />
        <div className="admin__section-field">
          <label htmlFor="product-images">Choose Images To Upload: </label>
          <input id="product-images" type="file" accept="image/*" multiple />
        </div>
        <TextField name="details" multiline label="Details" />
        <Dropdown name="type" label="Category Type" options={Category} />
        <Dropdown name="gender" label="Gender" options={Gender} />
        <TextField
          pattern="[0-9]*"
          min={1985}
          max={new Date().getFullYear()}
          defaultValue={new Date().getFullYear()}
          name="year"
          type="number"
          inputMode="numeric"
          label="Year"
        />
        <TextField name="price" type="number" label="Price" />
        <TextField name="discount" type="number" label="Discount Amount" />
        <TextField name="shippingCost" type="number" label="Shipping Cost" />
        <TextField name="stockQty" type="number" label="Stock Quantity" />
        <TextField name="sku" label="SKU" />
        <SizeOptions checkbox label="Select Sizes" />
        <AutoComplete name="color" label="Main Colorway" options={Categories} />
        <Button className="admin__section-button" type="submit">
          Add To Inventory
        </Button>
      </Form>
      <br />
    </div>
  );
}
