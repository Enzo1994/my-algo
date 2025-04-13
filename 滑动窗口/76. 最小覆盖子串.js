
/**
    难度：难 
    关键：
        1. valid 值，《中间有空隙》：
            1. 包含所有字符的子串类：
                1. 最小覆盖子串
                2. 判断字符串 s 是否包含字符串 t 的排列
            2. 满足**频次条件**的子串，《当前窗口中不同字符的数量》
                1. 找出所有长度为 k 的无重复字符子串
                2. 找出最多包含 k 个不同字符的最长子串
            3. 字符频率配对类问题
                1. 替换 k 个字符使得字符串变成只包含同一个字符的最长子串
 */
var minWindow = function (s, t) {
    let left = 0;
    let right = 0;
    let valid = 0;
    let need = new Map();
    let str = '';
    let window = new Map();
    for(const char of t) {
        need.set(char, (need.get(char) || 0) + 1)
    }

    for (; right < s.length; right++) {
        const rightChar = s[right];
        window.set(rightChar, (window.get(rightChar) || 0) + 1)

        if (window.get(rightChar) === need.get(rightChar)) {
            valid++
        }

        while(valid === need.size) {
            const leftChar = s[left];
            const thisStr = s.substring(left, right + 1 )

            left++
            
            if(window.get(leftChar) === need.get(leftChar)) {
                valid--
            }
            window.set(leftChar, window.get(leftChar) - 1)

            
            if (!str.length || thisStr.length < str.length) {
                str = thisStr
            }
        }
    }
    return str
};