import { createFormAction } from "remix-forms";
// For Remix, import it like this
import { redirect, json } from "@remix-run/node";
// For React Router 6.4, like this

const formAction = createFormAction({ redirect, json });

export { formAction };
