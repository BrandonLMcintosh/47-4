/** Node: node for a singly linked list. */

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

/** LinkedList: chained together nodes. */

class LinkedList {
	constructor(vals = []) {
		this.head = null;
		this.tail = null;
		this.length = 0;

		for (let val of vals) this.push(val);
	}

	/** push(val): add new value to end of list. */

	push(val) {
		const node = new Node(val);
		if (!this.head) {
			this.head = node;
			this.length++;
			return (this.tail = node);
		}
		this.tail.next = node;
		this.tail = node;
		this.length++;
	}

	/** unshift(val): add new value to start of list. */

	unshift(val) {
		const node = new Node(val);
		if (!this.head) {
			this.tail = node;
		}
		node.next = this.head;
		this.head = node;
		this.length++;
	}

	/** pop(): return & remove last item. */

	pop() {
		return this.removeAt(this.length - 1);
	}

	/** shift(): return & remove first item. */

	shift() {
		return this.removeAt(0);
	}

	/** getAt(idx): get val at idx. */

	_getIndex(idx) {
		if (idx >= this.length || idx < 0) throw new Error("invalid index");

		let index = 0;
		let cur = this.head;
		while (index !== idx) {
			index++;
			cur = cur.next;
		}

		return cur;
	}

	getAt(idx) {
		const node = this._getIndex(idx);
		return node.val;
	}

	/** setAt(idx, val): set val at idx to val */

	setAt(idx, val) {
		if (idx >= this.length || idx < 0) throw new Error("invalid index");
		let node = this._getIndex(idx);
		node.val = val;
	}

	_setTail() {
		const tail = this._getIndex(this.length - 1);
		this.tail = tail;
	}

	/** insertAt(idx, val): add node w/val before idx. */

	insertAt(idx, val) {
		if (idx > this.length || idx < 0) throw new Error("invalid index");
		if (idx === 0) {
			return this.unshift(val);
		}
		if (idx === this.length - 1) {
			return this.push(val);
		}
		let node = new Node(val);
		let prev = this._getIndex(idx - 1);
		node.next = prev.next;
		prev.next = node;
		this.length++;
		this._setTail();
	}

	/** removeAt(idx): return & remove item at idx, */

	removeAt(idx) {
		if (idx >= this.length || idx < 0) throw new Error("invalid index");
		if (idx === 0) {
			let val = this.head.val;
			this.head = this.head.next;
			this.length--;
			if (this.length < 2) this.tail = this.head;
			if (this.length === 0) this.tail = this.head = null;
			return val;
		}

		const prev = this._getIndex(idx - 1);

		const val = prev.next.val;

		if (idx === this.length - 1) {
			prev.next = null;
			this.tail = prev;
			this.length--;
			return val;
		}
		prev.next = prev.next.next;
		this.length--;

		return val;
	}

	/** average(): return an average of all values in the list */

	average() {
		if (this.length === 0) return 0;
		let sum = 0;
		let count = 0;
		let cur = this.head;

		while (cur) {
			sum += cur.val;
			count++;
			cur = cur.next;
		}

		return sum / count;
	}
}

module.exports = LinkedList;
