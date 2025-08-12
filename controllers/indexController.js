const links = [
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

module.exports = { indexGet, uploadFileGet };
