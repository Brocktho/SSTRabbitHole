import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import vine from "~/vine";
import { useEffect, useRef } from "react";
import { CreateNoteModel } from "~/db/schema";

import { createNote } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { CollectFormIntoObj } from "~/utils";

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request
    .formData()
    .then((data) => CollectFormIntoObj(data));
  let body_err: string | null = null;
  let title_err: string | null = null;
  const note_id = await vine
    .then(async (v) => {
      console.log(formData);
      v.validate({ schema: await CreateNoteModel, data: formData })
        .then((result) => {
          return createNote({
            body: result.body,
            title: result.title,
            userId,
          });
        })
        .catch((e) => {
          console.error(e);
          return null;
        });
    })
    .catch((e) => {
      console.error(e);
      return null;
    });

  if (note_id === null) {
    return json(
      {
        errors: {
          body: body_err,
          title: title_err,
        },
      },
      { status: 400 }
    );
  }
  return redirect(`/notes/${note_id}`);
};

export default function NewNotePage() {
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.body) {
      bodyRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Title: </span>
          <input
            ref={titleRef}
            name="title"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.title ? true : undefined}
            aria-errormessage={
              actionData?.errors?.title ? "title-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.title ? (
          <div className="pt-1 text-red-700" id="title-error">
            {actionData.errors.title}
          </div>
        ) : null}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Body: </span>
          <textarea
            ref={bodyRef}
            name="body"
            rows={8}
            className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
            aria-invalid={actionData?.errors?.body ? true : undefined}
            aria-errormessage={
              actionData?.errors?.body ? "body-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.body ? (
          <div className="pt-1 text-red-700" id="body-error">
            {actionData.errors.body}
          </div>
        ) : null}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
