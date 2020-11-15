const Trie = function () {
  this.children = [];
  this.isEnd = false;
}

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  if (typeof word === 'string' && word.length > 0) {
    const aCode = 'a'.charCodeAt();
    let current = this;
    word.split('').forEach(c => {
      const cCode = c.charCodeAt() - aCode;
      if (!current.children[cCode]) {
        current.children[cCode] = new Trie();
      }
      current = current.children[cCode];
    });
    current.isEnd = true;
  }
}

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  const node = this._searchPrefix(word);
  return !!node && node.isEnd;
}

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  const node = this._searchPrefix(prefix);
  return !!node;
}

/**
 * Common function
 * @param {string} prefix
 * @return {Trie|null}
 */
Trie.prototype._searchPrefix = function (prefix) {
  if (typeof prefix === 'string' && prefix.length > 0) {
    const aCode = 'a'.charCodeAt();
    let cur = this;
    for (let i = 0; i < prefix.length; i++) {
      const code = prefix[i].charCodeAt() - aCode;
      cur = cur.children[code];
      if (!cur) return null;
    }
    return cur;
  }
  return null;
}
