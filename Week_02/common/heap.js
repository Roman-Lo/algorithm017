function BinaryHeap(minOrMax = 'max') {
    const compareMode = minOrMax === 'min' ? 'min' : 'max';
    this.data = [];
    const that = this;
    this._methods = {
        _heapifyUp: function (idx) {
            if (idx === 0) return;
            const val = that.data[idx];
            while (idx > 0) {
                parent = this._parentOf(idx);
                if (Math[compareMode](that.data[parent], val) === val) {
                    that.data[idx] = that.data[parent];
                    idx = parent;
                } else {
                    break;
                }
            }
            that.data[idx] = val;
        },
        _heapifyDown: function (idx) {
            if (idx === that.data.length - 1) return;
            const val = that.data[idx];
            const maxIdx = that.data.length - 1;
            let left = this._kthLeftChild(idx);
            while (left <= maxIdx) {
                let right = left + 1;
                const child = right < maxIdx
                    ? (
                        Math[compareMode](that.data[left], that.data[right]) === that.data[left]
                            ? left : right
                    )
                    : left;
                if (Math[compareMode](val, that.data[child]) === val) {
                    break;
                }
                that.data[idx] = that.data[child];
                idx = child;
                left = this._kthLeftChild(idx);
            }
            that.data[idx] = val;
        },
        _parentOf: function (i) {
            return Math.floor((i - 1) / 2);
        },
        _kthLeftChild: function (k) {
            return 2 * k + 1;
        }
    }
}

BinaryHeap.prototype.insert = function (...items) {
    items.forEach(el => {
        this._methods._heapifyUp(this.data.push(el) - 1);
    });
    return this.data.length;
}

BinaryHeap.prototype.getTop = function () {
    return this.data[0];
}

BinaryHeap.prototype.delete = function (i) {
    if (this.data.length > i) {
        const val = this.data[i];
        const lst = this.data.pop();
        if (this.data.length > i) {
            this.data[i] = lst;
            this._methods._heapifyDown(i);
        }
        return val;
    }
    return null;
}

BinaryHeap.prototype.clear = function () {
    this.data = [];
}

BinaryHeap.prototype.print = function () {
    let depth = 0;
    return console.log(this.data);    
}

var nthUglyNumber_heap = function (n) {
    const heap = new BinaryHeap('min');
    const set = new Set([2, 3, 5]);
    heap.insert(2, 3, 5);
    let target = 1;
    for (let i = 1; i < n; i++) {
        target = heap.delete(0);
        const a = target * 2, b = target * 3, c = target * 5;
        if (!set.has(a)) { heap.insert(a); set.add(a); };
        if (!set.has(b)) { heap.insert(b); set.add(b); };
        if (!set.has(c)) { heap.insert(c); set.add(c); };
    }
    return target;
}

nthUglyNumber_heap(10);