function getLinks(req, res, next) {
  const links = [{ href: "/", text: "Home" }];

  if (req.isAuthenticated()) {
    links.push({ href: "/file/upload", text: "Upload File" });
    links.push({ href: "/folder/new", text: "New folder" });
    links.push({ href: "/user/logout", text: "Log Out" });
  } else {
    links.push({ href: "/user/login", text: "Log In" });
    links.push({ href: "/user/signup", text: "Sign Up" });
  }
  req.links = links;
  next();
}

module.exports = { getLinks };
