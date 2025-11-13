// 1. SET YOUR FAILOVER PAGE URL HERE
// This is the URL of your Cloudflare Page (e.g., "https://my-pages-project.pages.dev")
// Make sure to include the filename (502.html) if it's not the main page.
const MY_FAILOVER_PAGE_URL = "https://502-page.opensourceitsolutions.co.uk";


addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Tries to fetch the request from the origin (your tunnel).
 * If the fetch fails (e.g., tunnel is down), it serves
 * the custom 502 page from your failover URL.
 */
async function handleRequest(request) {
  try {
    // Try to fetch the request from the origin (your tunnel)
    const response = await fetch(request);
    
    // If the origin server returns a 404, you could also
    // redirect to a custom 404 page here.
    // if (response.status === 404) {
    //   const res404 = await fetch("https://.../404.html");
    //   return new Response(res404.body, { status: 404, headers: res404.headers });
    // }
    
    return response;

  } catch (e) {
    // If the fetch fails (tunnel is down), catch the error
    // and serve the custom 502 page from your Cloudflare Page.
    const custom502Response = await fetch(MY_FAILOVER_PAGE_URL);

    // Return the custom page with the correct 502 status code
    return new Response(custom502Response.body, {
      status: 502,
      headers: { 'Content-Type': 'text/html;charset=UTF-8' }
    });
  }
}