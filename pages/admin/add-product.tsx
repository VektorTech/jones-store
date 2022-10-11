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
import { FormEvent, FormEventHandler } from "react";

const colorways = [
  // see sidebar
  {
    name: "Dark Mocha",
    path: "",
  },
  {
    name: "Brown",
    path: "",
  },
  {
    name: "University Blue Black",
    path: "",
  },
  {
    name: "University Blue",
    path: "",
  },
  {
    name: "Blue",
    path: "",
  },
  {
    name: "Chicago",
    path: "",
  },
  {
    name: "Lucky Green",
    path: "",
  },
  {
    name: "Pink Glaze",
    path: "",
  },
  {
    name: "Court Purple",
    path: "",
  },
  {
    name: "Clay Green",
    path: "",
  },
  {
    name: "Twist W Panda",
    path: "",
  },
  {
    name: "Midnight Navy",
    path: "",
  },
  {
    name: "Yellow Toe",
    path: "",
  },
  {
    name: "Multi Color",
    path: "",
  },
  {
    name: "Shadow",
    path: "",
  },
  {
    name: "Black",
    path: "",
  },
  {
    name: "Bred",
    path: "",
  },
  {
    name: "Varsity Red",
    path: "",
  },
  {
    name: "Black Red",
    path: "",
  },
  {
    name: "Fire Red",
    path: "",
  },
  {
    name: "White",
    path: "",
  },
  {
    name: "Denim",
    path: "",
  },
  {
    name: "Pinksicle",
    path: "",
  },
  {
    name: "Wolf Grey",
    path: "",
  },
  {
    name: "Grey",
    path: "",
  },
];

async function submitForm(form: HTMLFormElement) {
  const inputElements = form.querySelectorAll("[name]");
  const params = new URLSearchParams();
  new Array<HTMLInputElement>().forEach.call(inputElements, (input) => {
    if (input.type == "checkbox" || input.type == "radio") {
      input.checked && params.append(input.name, input.value);
    } else {
      params.append(input.name, input.value);
    }
  });
  // return console.log(params.toString());
  return fetch(form.action, {
    method: form.method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: params,
  }).then((res) => res.json());
}

export default function AddProduct() {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { files } = document.getElementById(
      "product-images"
    ) as HTMLInputElement;
    if (files) {
      const uploads = await cloudinaryUpload(files);
      form["mediaURLs"].textContent = uploads
        .map((r) => r.secure_url)
        .join("\n");
      const message = await submitForm(form);
      console.log(message);
      // const newForm = form.cloneNode(true) as HTMLFormElement;
      // form.parentNode?.replaceChild(newForm, form);
      // newForm.submit();
    }
  };

  return (
    <div className="admin__section">
      <form onSubmit={handleSubmit} method="POST" action="/api/products">
        <TextField name="id" label="ID" />

        <TextField name="stockQty" label="Stock Quantity" />

        <TextField name="title" label="Title" />

        <TextField name="price" label="Price" />

        <TextField name="discount" label="Discount" />

        <TextField name="shippingCost" label="Shipping Cost" />

        <TextField name="details" fullWidth multiline label="Details" />

        <input id="product-images" type="file" accept="image/*" multiple />
        <textarea
          style={{ display: "none" }}
          name="mediaURLs"
          id="mediaURLs"
        ></textarea>

        <Autocomplete
          disablePortal
          id=""
          options={colorways.map(({ name }) => name)}
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
      </form>
    </div>
  );
}
