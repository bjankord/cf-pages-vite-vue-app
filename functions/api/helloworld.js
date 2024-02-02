export function onRequest(context) {
  const data = {
    hello: "world",
  };
  return Response.json(data);
};
