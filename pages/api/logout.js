import cookie from "cookie";

export default (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ status: 'fail', message: 'Method not allowed here!' });

  if (req.body.key === 'static_key') {
    res.setHeader("Set-Cookie", [
      cookie.serialize("auth", "false", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: true,
        maxAge: 5,
        path: "/",
      })
    ]);

    return res.status(200).json({ roles: null, auth: false });
  }

  return res.status(400).json({ status: 'fail', message: 'Bad request happened!' });
};