function getLinks(isLoggedIn) {
  const links = [{ href: "/", text: "Home" }];

  if (isLoggedIn) {
    links.push({ href: "/file/upload", text: "Upload File" });
    links.push({ href: "/folder/new", text: "New folder" });
    links.push({ href: "/user/logout", text: "Log Out" });
  } else {
    links.push({ href: "/user/login", text: "Log In" });
    links.push({ href: "/user/signup", text: "Sign Up" });
  }
  return links;
}

module.exports = { getLinks };
