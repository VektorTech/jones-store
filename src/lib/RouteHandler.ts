import { NextApiRequest, NextApiResponse } from "next";
import { AsyncAPIHandler } from "src/types/shared";
import { catchAsyncErrors, ServerError } from "./utils";
import { withSessionRoute } from "./withSession";

type requestMethod = "GET" | "POST" | "PUT" | "DELETE";
export class RouteHandler {
  private methodActions: Record<requestMethod, Function | null> = {
    GET: null,
    POST: null,
    PUT: null,
    DELETE: null,
  };
  private restMethodActions: Record<requestMethod, AsyncAPIHandler[] | null> = {
    GET: null,
    POST: null,
    PUT: null,
    DELETE: null,
  };

  private async next(
    request: NextApiRequest,
    response: NextApiResponse,
    error?: ServerError,
    actionIndex = 0
  ) {
    if (response.headersSent) {
      return;
    }

    if (error && response) {
      if (error.meta?.target?.length) {
        error.status = 409;
      }

      response.status(error.status || 500).json({
        success: false,
        error: true,
        message: error.message || "Internal Server Error",
      });
    } else {
      const method = request.method || "";

      if (
        request &&
        response &&
        this.restMethodActions &&
        this.restMethodActions[method as requestMethod]?.[actionIndex]
      ) {
        await catchAsyncErrors(
          this.restMethodActions[method as requestMethod]?.[
            actionIndex
          ] as AsyncAPIHandler
        )(request, response, (err: ServerError) =>
          this.next.call(this, request, response, err, actionIndex + 1)
        );
      }
    }
  }

  private start(req: NextApiRequest, res: NextApiResponse) {
    const action: Function | null =
      this.methodActions[(req.method as requestMethod) || ""];

    if (action) {
      return action(req, res);
    }

    res.status(404).json({ success: false, message: "Route Not Found" });
  }

  private setHandlers(
    handler: AsyncAPIHandler,
    handlers: AsyncAPIHandler[],
    method: requestMethod
  ) {
    this.methodActions[method] = withSessionRoute((req, res) =>
      catchAsyncErrors(handler)(req, res, (err: ServerError) =>
        this.next.call(this, req, res, err, 0)
      )
    );
    this.restMethodActions[method] = handlers;
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
