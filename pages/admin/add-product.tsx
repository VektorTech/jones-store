import Form, { beforeSubmitType } from "@Components/Form";
import { cloudinaryUpload } from "@Lib/utils";
import {
  TextField,
  Checkbox,
  Autocomplete,
  Select,
  FormControl,
  FormControlLabel,
  InputLabel,
  Input,
  MenuItem,
  Button,
  FormGroup,
} from "@mui/material";
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
        {/* <fieldset>
          <legend></legend>
        </fieldset> */}
        <TextField name="id" label="ID" />

        <TextField name="stockQty" label="Stock Quantity" />

        <TextField name="title" label="Title" />

        <TextField name="price" label="Price" />

        <TextField name="discount" label="Discount" />

        <TextField name="shippingCost" label="Shipping Cost" />

        <TextField name="details" fullWidth multiline label="Details" />

        <input id="product-images" type="file" accept="image/*" multiple />

        <Autocomplete
          disablePortal
          id=""
          options={CategoriesData.colorways}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} name="color" label="Main Color" />
          )}
        />

        <FormControl>
          <InputLabel id="">Year</InputLabel>
          <Input
            name="year"
            type="number"
            inputProps={{
              min: 1985,
              max: new Date().getFullYear(),
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
          />
        </FormControl>

        <TextField name="sku" label="SKU" />

        <FormControl>
          {" "}
          {/**Affect sizes array */}
          <InputLabel id="">Gender</InputLabel>
          <Select
            labelId=""
            id=""
            // value={Gender["MEN"]}
            name="gender"
            label="Gender"
            onChange={() => {}}
          >
            {Object.keys(Gender).map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormGroup>
          {[...Array(40)]
            .map((_, i) => 1 + i / 2)
            .map((size) => (
              <FormControlLabel
                control={<Checkbox value={size.toString()} name="sizes" />}
                key={size}
                label={size}
              />
            ))}
        </FormGroup>

        <FormControl>
          <InputLabel id="">Type</InputLabel>
          <Select
            labelId=""
            id=""
            name="type"
            label="Category Type"
            onChange={() => {}}
          >
            {Object.keys(Category).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit">Add To Inventory</Button>

        <input type="reset" value="Reset Form" />
      </Form>
    </div>
  );
}
