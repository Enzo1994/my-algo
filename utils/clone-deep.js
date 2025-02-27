function deepClone(value, visited = new WeakMap()) {
    if (typeof value !== 'object' || value === null) {
        return value; // 基本类型或 null 直接返回
    }

    // 处理循环引用：如果已经访问过该对象，直接返回已克隆的版本
    if (visited.has(value)) {
        return visited.get(value);
    }

    // 对象或数组的深度复制
    let result;
    if (Array.isArray(value)) {
        result = [];
        visited.set(value, result); // 记录当前数组的克隆
        for (let i = 0; i < value.length; i++) {
            result[i] = deepClone(value[i], visited);
        }
    } else {
        result = {};
        visited.set(value, result); // 记录当前对象的克隆
        for (let key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
                result[key] = deepClone(value[key], visited);
            }
        }
    }
    return result;
}

export default deepClone