/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.size = capacity;
  this.map = new Map();
  this.list = new LRUCache.LinkedList();
  this._hoistNode = function (node) { // 用于提升当前的访问节点
    if (this.list.head.next !== node) { // 如果已经是最近访问节点，则可以忽略
      this.list.delete(node);
      this.list.insertFirst(node);
    }
  }
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  const node = this.map.get(key);
  if (node) {
    this._hoistNode(node);
    return node.val;
  }
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  let node = this.map.get(key);
  if (node) {
    this._hoistNode(node);
    node.val = value;
  } else {
    node = new LRUCache.LinkedList.Node(key, value);
    if (this.size === this.map.size) {
      const lstNode = this.list.tail.prev;
      this.map.delete(lstNode.key);
      this.list.delete(lstNode);
    }
    this.list.insertFirst(node);
  }
  this.map.set(key, node);
};


LRUCache.LinkedList = function () {
  this.head = new LRUCache.LinkedList.Node(null);
  this.tail = new LRUCache.LinkedList.Node(null);
  this.head.next = this.tail;
  this.tail.prev = this.head;
}

/**
 * @param {LRUCache.LinkedList.Node} node
 */
LRUCache.LinkedList.prototype.insertFirst = function (node) {
  node.next = this.head.next;
  node.prev = this.head;
  node.next.prev = node;
  this.head.next = node;
}

/**
 * @param {LRUCache.LinkedList.Node} node
 */
LRUCache.LinkedList.prototype.delete = function (node) {
  node.prev.next = node.next;
  node.next.prev = node.prev;
}

LRUCache.LinkedList.Node = function (key, val) {
  this.val = val;
  this.key = key;
  this.prev = this.next = null;
}
/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
