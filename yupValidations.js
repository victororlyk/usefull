// first validate if email is unique on server + if passwords are the same.
const AccountInfoSchema = yup.object().shape({
  companyName: yup.string().min(2).required(),
  protocol: yup.string().required(),
  domain: yup.string().required(),
  email: yup
    .string()
    .email()
    .required()
    .test("is-available", "Email is already used", async (value) => {
      const resp = await fetch(`${apiUrl}/api/unique/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: value }),
      });
      const parsed = await resp.json();
      return parsed.success;
    }),
  firstName: yup.string().min(2).required(),
  lastName: yup.string().min(2).required(),
  password: yup
    .string()
    .required()
    .min(7)
    .matches(/[a-z]/, "Password must have at least one lowercase char")
    .matches(/[A-Z]/, "Password must have at least one uppercase char")
    .matches(/\d+/, "Password must have at least one number"),
  passwordConfirmation: yup
    .string()
    .required()
    .label("Confirm password")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});
