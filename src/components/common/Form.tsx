import { ReactNode, FormEventHandler, useRef, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { DefaultResponse, HTTPMethods } from "src/types/shared";

type beforeSubmitReturnType =
  | [updatedParams?: { [key: string]: string }, shouldContinue?: boolean]
  | void;

export type beforeSubmitType = (
  params: { [key: string]: string },
  form: HTMLFormElement
) => beforeSubmitReturnType | Promise<beforeSubmitReturnType>;

export type afterSubmitType = (
  responseData: DefaultResponse
) => void | Promise<void>;

export default function Form({
  children,
  method = "GET",
  action,
  beforeSubmit,
  afterSubmit,
}: PropTypes) {
  const ref = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");

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
        (await beforeSubmit?.(Object.assign({}, params), form)) ?? [
          params,
          true,
        ];

      if (shouldContinue == false) {
        return;
      }

      const searchParams = new URLSearchParams(updatedParams);

      const response = await fetch(
        action + (method == "GET" ? searchParams : ""),
        {
          method: method,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: method != "GET" ? searchParams : null,
        }
      );
      const responseBody = await response.json();
      if (!response.ok) {
        throw new Error(responseBody.message);
      }
      afterSubmit?.(responseBody);
    } catch (e: unknown) {
      if (e instanceof TypeError) {
        setError("Network Error");
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Something Went Wrong");
      }
    }
  };

  return (
    <form className="form" onSubmit={onSubmit} ref={ref} action={action}>
      {error && (
        <div className="form__error">
          <RiErrorWarningFill className="form__error-icon" />
          <span className="form__error-message">
            {error.split("\n").map((err) => (
              <>
                {err}
                <br />
              </>
            ))}
          </span>
        </div>
      )}
      <div className="form__content">{children}</div>
    </form>
  );
}

interface PropTypes {
  children: ReactNode;
  method?: HTTPMethods;
  action: string;
  beforeSubmit?: beforeSubmitType;
  afterSubmit?: afterSubmitType;
}
