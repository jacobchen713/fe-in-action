class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node('head');
  }

  findLastNode() {
    let currntNode = this.head;

    while (currntNode.next) {
      currntNode = currntNode.next;
    }

    return currntNode;
  }

  append(value) {
    const node = new Node(value);
    const currentNode = this.findLastNode();

    currentNode.next = node;
    node.next = null;
  }

  display() {
    let currentNode = this.head;
    let list = ''

    while (currentNode) {
      list += currentNode.value;

      currentNode = currentNode.next;

      if (currentNode) {
        list += '->'
      }
    }

    console.log(list);
  }

  // 链表转置
  transpose() {
    let current = this.head.next;
    let prev = null;
    let next = null;
    
    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.head.next = prev;
  }
}

const link1 = new LinkedList();

link1.append(1);
link1.append(2);
link1.append(3);

link1.display(); // head->1->2->3

link1.transpose();

link1.display(); // head->3->2->1
