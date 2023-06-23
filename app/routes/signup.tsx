import type { LoaderArgs } from "@remix-run/node";
import { requireUser } from "~/session.server";
import { Form } from "@remix-run/react";
import { InvalidMethod /* RequireFormModel */ } from "~/utils/FormHelpers";
/* import { CreateUserModel } from "~/db/schema";
import { PutObjectCommand } from "@aws-sdk/client-s3"; */

export const action = async ({ request }: LoaderArgs) => {
  await requireUser(request);
  const method = request.method.toLowerCase();
  if (method === "post") {
    const data = await request.formData();
    const avatar_img = data.get("avatar_img");
    if (avatar_img instanceof File) {
      /*       const command = new PutObjectCommand({
        ACL: "public-read",
        Key: crypto.randomUUID(),
        Bucket: process.env.BUCKET,
      }); */
      //const url = await getSignedUrl(new S3Client({}), command);
      //const avatar = await fetch();
    }
    /*     const new_user = RequireFormModel(data, CreateUserModel); */
  }
  return InvalidMethod();
};

const SignupRoute = () => {
  return (
    <Form method="POST">
      <input accept="image/*" name="avatar_img" type="file" />
      <label htmlFor="Email">Email</label>
      <input type="email" name="email" id="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <button type="submit">Sign Up</button>
    </Form>
  );
};

export default SignupRoute;
