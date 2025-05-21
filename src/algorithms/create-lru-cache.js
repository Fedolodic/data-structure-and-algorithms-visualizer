function createLRUCache(capacity = 2) {
  const map = new Map();
  const head = { prev: null, next: null };
  const tail = { prev: head, next: null };
  head.next = tail;

  function remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  function insert(node) {
    node.prev = tail.prev;
    node.next = tail;
    tail.prev.next = node;
    tail.prev = node;
  }

  function get(key) {
    if (!map.has(key)) return null;
    const node = map.get(key);
    remove(node);
    insert(node);
    return node.value;
  }

  function put(key, value) {
    if (map.has(key)) {
      const node = map.get(key);
      node.value = value;
      remove(node);
      insert(node);
    } else {
      if (map.size >= capacity) {
        const lru = head.next;
        remove(lru);
        map.delete(lru.key);
      }
      const node = { key, value };
      insert(node);
      map.set(key, node);
    }
  }

  function entries() {
    const result = [];
    let cur = head.next;
    while (cur !== tail) {
      result.push([cur.key, cur.value]);
      cur = cur.next;
    }
    return result;
  }

  return { get, put, entries };
}

module.exports = createLRUCache;
