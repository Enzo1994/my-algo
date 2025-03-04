class CycleArray {
    constructor(size) {
        this.size = size
        this.arr = new Array(size);
        this.startIdx = 0;
        this.endIdx = 0;
    }
    addFirst(val) {

        this.startIdx = (this.size + this.startIdx - 1) % this.size
        this.arr[this.startIdx] = val

    }
}

const a = new CycleArray(5);

a.addFirst(1)
a.addFirst(2)

console.log(a)