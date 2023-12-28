import type { ActionFunction } from "@remix-run/node";
import type { FormSchema, FormProps } from "remix-forms";

import { mdf } from "domain-functions";

import { testSchema } from "~/schema";
import { formAction } from "~/form-action.server";
import { Form } from "~/form";

type FormRenderProperties<Schema extends FormSchema> = Parameters<NonNullable<FormProps<Schema>["children"]>>[0];

const mutation = mdf(testSchema)(async (values) => console.log(values));

export const action: ActionFunction = async ({ request }) =>
  formAction({
    request,
    schema: testSchema,
    mutation,
    successPath: "/success",
  });

function LastNameField({ Field }: FormRenderProperties<typeof testSchema>) {
  return (
    <Field name="lastName">
      {({ Label, SmartInput, Errors }) => (
        <>
          <Label>Last name</Label>
          <SmartInput />
          <Errors />
        </>
      )}
    </Field>
  );
}

function BrokenForm() {
  return (
    <Form schema={testSchema}>
      {(render) => (
        <>
          <render.Field name="firstName" />
          <LastNameField {...render} />
          <render.Button />
        </>
      )}
    </Form>
  );
}

function WorkingForm() {
  return (
    <Form schema={testSchema}>
      {({ Field, Button }) => (
        <>
          <Field name="firstName" />
          <Field name="lastName">
            {({ Label, SmartInput, Errors }) => (
              <>
                <Label>Last name</Label>
                <SmartInput />
                <Errors />
              </>
            )}
          </Field>
          <Button />
        </>
      )}
    </Form>
  );
}

export default function Index() {
  return (
    <div>
      <div>Working (errors are shown):</div>
      <WorkingForm />

      <br />
      <br />
      <br />
      <br />

      <div>Broken (Last name error not showing):</div>
      <BrokenForm />
    </div>
  );
}
