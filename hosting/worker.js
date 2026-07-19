const serveIndex = (request, assets) => {
  const url = new URL(request.url);
  url.pathname = "/index.html";
  return assets.fetch(new Request(url, request));
};

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    return acceptsHtml ? serveIndex(request, env.ASSETS) : response;
  },
};
