const links = [
  { href: "/", text: "Home" },
  { href: "/login", text: "Log In" },
  { href: "/signup", text: "Sign Up" },
  { href: "/upload", text: "Upload File" },
];

function indexGet(req, res) {
  res.render("index", { links });
}

function uploadFileGet(req, res) {
  res.render("file-upload-form", { links });
}

function loginGet(req, res) {
  res.render("login", { links });
}

function signupGet(req, res) {
  res.render("signup", { links });
}

module.exports = { indexGet, uploadFileGet, loginGet, signupGet };
