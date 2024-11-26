
/* ========== Configuration ========== */

/* 404 or error route */
const Route404 = "/404.html";

/* format :
  const Routes = {
    "<routeInBrowser>": "<routeToDisplay>",
    "<routeInBrowser>": {route: "<routeToDisplay>", replacePath: "<replaceRouteInBrowser>"},
  }
*/

const Routes = {
  "/": "/",
  "/lol": {route: "/test/index.html", replacePath: "/test/"},
  "/about": "/about.html",
  "/top": "/test/",
  "/bootstrap": "/bootstrap.html",
  '/404': Route404,
}


/* ========== Global Router Object ========== */
const Router = {
  route: Router__route,
  redirect: Router__redirect,
  delay: 0,
  path: "",
}

/* ========== Router functions ========== */
async function Router__route(routeObj) {

  let routeLoc = routeObj
  let routeDelay = Router.delay
  let replacePath = '';

  if ( typeof routeObj === "object" ) {
    routeLoc = routeObj.route;
    routeDelay = routeObj.delay ?? routeDelay
    replacePath = routeObj.replacePath ?? replacePath
  }

  let loc = `${routeLoc || location.pathname}`;

  let queryPos = loc.indexOf('?') + 1;
  let hashPos = loc.indexOf('#') + 1;

  // capture only upto '#' or '?' whichever comes first
  let captureLast = queryPos && hashPos ? Math.min(queryPos, hashPos) : Math.max(queryPos, hashPos)
  if ( captureLast )
    loc = loc.substring(0, captureLast-1)

  // get matching route if exists else Route404
  let route = Object.keys(Routes).filter(x => x == loc)[0];
  route = route ? Routes[route]: Route404;

  let routePath = route;

  // check for replacePath and/or route property in object.
  if (typeof route === "object") {
    routePath = route.route ?? Route404;
    replacePath = route.replacePath ?? "";
  }

  try {
    let fetchContent = await Router__fetch(routePath);
    if (!fetchContent) {
      Router__route(Route404);
    };
    Router.path = route; /* update router path */

    let html = document.querySelector('html');

    html.classList.add('route_out') /* for animation & stuff */

    /* add delay for animation & stuff */
    setTimeout(() => {

      html.classList.remove('route_out'); /* for animation & stuff */
      html.innerHTML = fetchContent; /* update whole page */
      html.classList.add('route_in') /* for animation & stuff */

    }, Router.delay)

    if ( replacePath ) {
      window.history.pushState({}, '', replacePath);
    }
  } catch(e) {
    Router__route(Route404);
  }
}

async function Router__fetch(routeLoc) {
  return (await fetch(routeLoc)).text();
}

async function Router__redirect(routeLoc) {
  await Router__route({route: routeLoc, replacePath: routeLoc});
}