import type { AsyncAPIHandler, HTTPMethods } from "src/types/shared";
import type { NextApiRequest, NextApiResponse } from "next";

import { withSessionRoute } from "./withSession";
import { catchAsyncErrors, ServerError } from "./utils";

interface RouteHandlerReturnType {
  (req: NextApiRequest, res: NextApiResponse): void;
  get: (...handlers: AsyncAPIHandler[]) => RouteHandlerReturnType;
  post: (...handlers: AsyncAPIHandler[]) => RouteHandlerReturnType;
  put: (...handlers: AsyncAPIHandler[]) => RouteHandlerReturnType;
  delete: (...handlers: AsyncAPIHandler[]) => RouteHandlerReturnType;
}

export default function RouteHandler() {
  const methodActions: Record<HTTPMethods, AsyncAPIHandler[]> = {
    GET: [],
    POST: [],
    PUT: [],
    DELETE: [],
  };

  const next = async (
    request: NextApiRequest,
    response: NextApiResponse,
    error?: ServerError,
    actionIndex = 0
  ) => {
    if (response.headersSent) {
      return;
    }

    if (error) {
      if (error.meta?.target?.length) {
        error.status = 409;
        error.message = error.meta?.target + " already exists in database";
      }

      response.status(error.status || 500).json({
        success: false,
        error: true,
        message: error.message || "Internal Server Error",
      });
    } else {
      const { method } = request;

      if (methodActions[method as HTTPMethods][actionIndex]) {
        await catchAsyncErrors(
          methodActions[method as HTTPMethods][actionIndex]
        )(request, response, (err: ServerError) =>
          next(request, response, err, actionIndex + 1)
        );
      }
    }
  };

  const setHandlers = (handlers: AsyncAPIHandler[], method: HTTPMethods) => {
    methodActions[method] = handlers;
  };

  const createRouter: RouteHandlerReturnType = (req, res) => {
    if (!methodActions[req.method as HTTPMethods]?.length) {
      return res
        .status(404)
        .json({ success: false, message: "Route Not Found" });
    } else {
      return withSessionRoute(next)(req, res);
    }
  };

  createRouter.get = (...handlers) => {
    setHandlers(handlers, "GET");
    return createRouter;
  };

  createRouter.post = (...handlers) => {
    setHandlers(handlers, "POST");
    return createRouter;
  };

  createRouter.put = (...handlers) => {
    setHandlers(handlers, "PUT");
    return createRouter;
  };

  createRouter.delete = (...handlers) => {
    setHandlers(handlers, "DELETE");
    return createRouter;
  };

  return createRouter;
}
