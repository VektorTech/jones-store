import { NextApiRequest, NextApiResponse } from "next";
import { AsyncAPIHandler } from "src/types/shared";
import { catchAsyncErrors, ServerError } from "./utils";
import { withSessionRoute } from "./withSession";

export class RouteHandler {
  private methodActions: { [key: string]: Function | null } = {
    GET: null,
    POST: null,
    PUT: null,
    DELETE: null,
  };
  private restMethodActions: { [key: string]: AsyncAPIHandler[] | null } = {
    GET: null,
    POST: null,
    PUT: null,
    DELETE: null,
  };

  private request?: NextApiRequest;
  private response?: NextApiResponse;

  private async next(error?: ServerError, actionIndex = 0) {
    if (error && this.response) {
      this.response?.status(error.status || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    } else {
      const method = this.request?.method || "";

      if (
        this.request &&
        this.response &&
        this.restMethodActions &&
        this.restMethodActions[method]?.[actionIndex]
      ) {
        await catchAsyncErrors(
          this.restMethodActions[method]?.[actionIndex] as Function
        )(this.request, this.response, (err: ServerError) =>
          this.next.call(this, err, actionIndex + 1)
        );
      }
    }
  }

  private start(req: NextApiRequest, res: NextApiResponse) {
    this.request = req;
    this.response = res;

    const action: Function | null = this.methodActions[req.method || ""];

    if (action) {
      return action(req, res);
    }

    res.status(404).json({ success: false, message: "Route Not Found" });
  }

  private setHandlers(
    handler: AsyncAPIHandler,
    handlers: AsyncAPIHandler[],
    method: string
  ) {
    this.restMethodActions[method] = handlers;
    this.methodActions[method] = withSessionRoute((req, res) =>
      catchAsyncErrors(handler)(req, res, (err: ServerError) =>
        this.next.call(this, err, 0)
      )
    );
  }

  get(handler: AsyncAPIHandler, ...handlers: AsyncAPIHandler[]) {
    this.setHandlers(handler, handlers, "GET");
    return this;
  }

  post(handler: AsyncAPIHandler, ...handlers: AsyncAPIHandler[]) {
    this.setHandlers(handler, handlers, "POST");
    return this;
  }

  put(handler: AsyncAPIHandler, ...handlers: AsyncAPIHandler[]) {
    this.setHandlers(handler, handlers, "PUT");
    return this;
  }

  delete(handler: AsyncAPIHandler, ...handlers: AsyncAPIHandler[]) {
    this.setHandlers(handler, handlers, "DELETE");
    return this;
  }

  init = () => this.start.bind(this);
}
