import { NextApiRequest, NextApiResponse } from "next";
import { AsyncAPIHandler } from "src/types/shared";
import { catchAsyncErrors, ServerError } from "./utils";
import { withSessionRoute } from "./withSession";

export class RouteHandler {
	private methodActions: { [key: string]: Function | null } = {
		"GET": null,
		"POST": null,
		"PUT": null,
		"DELETE": null
	};

	private handlers?: AsyncAPIHandler [];
	private request?: NextApiRequest;
	private response?: NextApiResponse;

	private next(error?: ServerError) {
		if (error && this.response) {
			this.response
				?.status(error.status || 500)
				 .json({ success: false, message: error.message || "Internal Server Error" });
		} else {
			if (this.request && this.response && this.handlers && this.handlers[0]) {
				catchAsyncErrors(this.handlers?.shift() as Function)(this.request, this.response, this.next.bind(this));
			}
		}
	}

	private start(req: NextApiRequest, res: NextApiResponse, next: Function) {
		this.request = req;
		this.response = res;

		const action: Function | null = this.methodActions[req.method || ""];

		if (action) {
			return action(req, res, next);
		}

		return res.status(404).json({ success: false, message: "Route Not Found" });
	}

	private setHandlers(handler: AsyncAPIHandler, handlers: AsyncAPIHandler[], method: string) {
		this.handlers = handlers;
		this.methodActions[method] = withSessionRoute((req, res) => catchAsyncErrors(handler)( req, res, this.next.bind(this) ));
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