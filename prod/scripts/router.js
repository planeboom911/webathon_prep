
/* ========== Router.js ========== */
/*
  Has various functions, global `Router` and `Routes` object to manage
  routes efficiently and to redirect / relocate pages smoothly without external
  hard redirect
*/

/* 404 or error route */
var Route404 = "/404.html";

/* ========== Global Routes Object ========== */

/* format :
  const Routes = {
    Name: {
      [required] route: '<routeInBrowser>[string/RegExp/function]', path: '<actualPath>',
      [optional] redirect: true/false, replacePath: '<replacePathWith>'
    }
  }
*/

var Routes = {
  home: {route: "/", path: "/index.html"},
  ping: {route: "/ping", path: "/pong.html"},
  notFound: {route: "/404", path: Route404},
  ecommerce: {route: /^\/e(-|)commerce/, path: "/ecommerce/", redirect: true},
  product: {route: /^\/products\/\w+$/, path: "/products/", dynamicPath: x => x.match(/^\/products\/(\w+)$/)[1]},
  search: {route: '/search', path: "/ecommerce/search/", redirect: true},
}

/* ========== Global Router Object ========== */

var Router = {
  route: Router__route,
  redirect: Router__redirect,
  ping: 0,
  delay: 0,
  path: "",
}

/* ========== Router functions ========== */
async function Router__route(routeObj) {

  let startTime = Date.now();
  let routeDelay = Router.delay
  let replacePath = '';
  let routeDynamicPath = '';
  let routePath = routeObj;

  if ( typeof routeObj === "object" ) {
    routePath = routeObj.route;
    routeDelay = routeObj.delay || routeDelay
    replacePath = routeObj.replacePath || ''
    routeDynamicPath = routeObj.dynamicPath || '';
  }

  let loc = routePath || location.pathname

  if ( replacePath )
    replacePath += loc.substring(routePath.length + 1); /* add leftover path */

  try {
    let fetchContent = await Router__fetch(routePath);
    
    if (!fetchContent) {
      Router__route(Route404);
    };

    Router.path = routeDynamicPath || routePath; /* update router path */

    if ( typeof Router.path === "function" ) {
      Router.path = Router.path(loc);
    }

    let html = document.querySelector('html');

    html.classList.add('route_out') /* for animation & stuff */

    /* add delay for animation & stuff */
    if ( routeDelay ) {
      setTimeout(() => {

        document.open()
        document.write(fetchContent)
        document.close()
        document.querySelector('html').classList.add('route_in') /* for animation & stuff */
        Router.ping = Date.now() - startTime
  
      }, routeDelay)
      
    } else {

      document.open()
      document.write(fetchContent)
      document.close()
      document.querySelector('html').classList.add('route_in') /* for animation & stuff */
      Router.ping = Date.now() - startTime

    }

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

async function Router__redirect(routeLoc, options) {
  await Router__route({route: routeLoc, replacePath: routeLoc, ...options});
}