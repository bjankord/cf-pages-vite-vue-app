/* globals HTMLRewriter */
// https://developers.cloudflare.com/pages/functions/middleware/

const handleErrors = async (context) => {
  try {
    return await context.next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
};

const handleHtmlTemplate = async (context) => {
  const response = await context.next();

  // If the response is HTML, it can be transformed with
  // HTMLRewriter -- otherwise, it should pass through
  if (response.headers && !response.headers.get("content-type").startsWith("text/html")) return response;

  class ElementHandler {
    element(element) {
      if(element.getAttribute('id') === 'bootstrap') {
        // TODO - update this with data from API call for bootstrap data
        element.replace(`<script>
          window.bootstrap = {
            initialPageData: true,
          };
        </script>`, { html: true })
      }
    }
  }

  return await new HTMLRewriter()
    .on('template', new ElementHandler()).transform(response)
};

export const onRequest = [
  handleErrors,
  handleHtmlTemplate,
];
