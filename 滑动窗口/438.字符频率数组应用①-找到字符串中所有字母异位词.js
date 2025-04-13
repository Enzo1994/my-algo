// 字符一样，数量相同，用数组比对最轻松
// 用数组统计频率
// 关键：窗口长度固定

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    const window = Array(26).fill(0)
    const target = Array(26).fill(0)

    const compare = (a1,a2) => a1.every((c, idx) => a2[idx] === c)

    let left = 0;
    let right = 0;
    let res = [];
    for(const char of p) {
        const idx = char.charCodeAt(0) - 97
        target[idx] = (target[idx] || 0) + 1
    }
    for(; right < s.length ; right++) {
        const rightChar = s[right];
        window[rightChar.charCodeAt(0) - 97] = (window[rightChar.charCodeAt(0) - 97] || 0) + 1

        // 窗口长度是否固定
        while(right - left + 1 > p.length) {
            const leftChar = s[left];
            window[leftChar.charCodeAt(0) - 97] = window[leftChar.charCodeAt(0) - 97] - 1
            left++
        }
        if (compare(window, target)) {
            res.push(left)
        }
        
    }
    return res
};