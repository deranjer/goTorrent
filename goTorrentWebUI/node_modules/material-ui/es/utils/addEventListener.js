export default function (node, event, handler, capture) {
  node.addEventListener(event, handler, capture);
  return {
    remove() {
      node.removeEventListener(event, handler, capture);
    }
  };
}