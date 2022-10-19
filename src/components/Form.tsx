import { ReactElement, FormEventHandler, useRef } from "react";
import { DefaultResponse } from "src/types/shared";

type beforeSubmitReturnType = [
  updatedParams?: { [key: string]: string },
  shouldContinue?: boolean
] | void;

export type beforeSubmitType = (
  params: { [key: string]: string },
  form: HTMLFormElement
) => beforeSubmitReturnType | Promise<beforeSubmitReturnType>;

export type afterSubmitType = (
  responseData: DefaultResponse,
  statusCode: number
) => void | Promise<void>;

export default function Form({
  children,
  method = "GET",
  action,
  beforeSubmit,
  afterSubmit,
}: {
  children: ReactElement | ReactElement[];
  method?: "GET" | "POST" | "PUT" | "DELETE";
  action: string;
  beforeSubmit?: beforeSubmitType;
  afterSubmit?: afterSubmitType;
}) {
  const ref = useRef<HTMLFormElement>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      const form = ref.current;
      if (!form) {
        return;
      }

      event.preventDefault();

      const formControls: HTMLInputElement[] = Array.from(
        form.querySelectorAll("[name]")
      );
      const params: { [key: string]: string } = {};

      formControls.forEach((element) => {
        if (element.type == "checkbox" || element.type == "radio") {
          if (element.checked) params[element.name] = element.value;
        } else {
          params[element.name] = element.value;
        }
      });

      const [updatedParams = params, shouldContinue = true] =
        (await beforeSubmit?.(Object.assign({}, params), form)) || [
          params,
          true,
        ];

      if (shouldContinue == false) {
        return;
      }

      const searchParams = new URLSearchParams(updatedParams);

      const response = await fetch(action + (method == "GET" ? searchParams : ""), {
        method: method,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: (method != "GET" ? searchParams : null),
      });

      afterSubmit?.(await response.json(), response.status);
    } catch (e) {
      console.log("Network Error", e);
    }
  };

  return (
    <form onSubmit={onSubmit} ref={ref} action={action}>
      {children}
    </form>
  );
}
