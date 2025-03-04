function parseHTML(str) {
    let i = 0;
    let state = 'DATA'
    let endTagName = '';
    let currentTag = null;
    let currentText = '';
    let currentQuote = '';
    let currentAttrName = '';
    let currentAttrValue = '';
    const root = { type: 'root', children: [] };
    const stack = [root];

    while(i < str.length) {
        const char = str[i];
        const nextChar = str[i + 1];
 
        switch(state) {
            case 'DATA': {
                if(char === '<') {
                    
                    // 如果下一个字符不是 '!'、'/' 或字母，则视为普通文本
                    if (nextChar != '!' && nextChar != '/' && !/[a-zA-Z]/.test(nextChar)) {
                        currentText += char
                    } else {
                        if (currentText) {
                            stack[stack.length - 1].children.push({type: 'text', content: currentText})
                        }
                        currentText = '';
                        state = 'TAG_OPEN';
                    }
                } else {
                    currentText += char
                }
                break;
            }

            case 'TAG_OPEN': {
                if (char === '!') {
                    if (str.substring(i, i + 3) === '!--') {
                        state = 'COMMENT'
                        // 遇到开始点，重置下
                        currentComment = '';
                        // 跳过已存索引
                        i += 2
                    } else if (str.substring(i, i + 7).toUpperCase() === '!DOCTYPE') {
                        // state = 'DOCTYPE';
                    }
                } else if (char === '/') {
                    state = 'END_TAG_OPEN'
                    endTagName = ''
                } else if (/[a-zA-Z]/.test(char)) {
                    currentTag = {type: 'element', tagName: '', attributes: {}, children: []}
                    state = 'TAG_NAME'
                    continue;
                }
                break;
            }

            case 'TAG_NAME': {
                if (/\s/.test(char)) {
                    state = 'BEFORE_ATTRIBUTE_NAME'
                } else if (char === '>') {
                    // 结束，更新 AST
                    // 把当前标签放入父节点的子节点数组中
                    stack[stack.length - 1].children.push(currentTag)
                    // 把当前标签入栈
                    stack.push(currentTag);
                    // 结束，重置状态
                    state = 'DATA'
                    currentTag = null
                } else {
                    currentTag.tagName += char;
                }
                break;
            }
            
            case 'BEFORE_ATTRIBUTE_NAME': {
                if (!/\s/.test(char)) {
                    state = 'ATTRIBUTE_NAME'
                    currentAttrName = ''
                    continue;
                } else if (char === '>') {
                    stack[stack.length - 1].children.push(currentTag)
                    stack.push(currentTag)
                    currentTag = null;
                    state = 'DATA';
                }
                break
            }
            case 'ATTRIBUTE_NAME': {
                if(char === '=') {
                    state = 'BEFORE_ATTRIBUTE_VALUE'
                } else if (/\s/.test(char)) {
                    // 属性名无值（布尔属性）
                    currentTag.attributes[currentAttrName] = true;
                    state = 'AFTER_ATTRIBUTE_NAME'
                } else {
                    currentAttrName += char
                }
                break;
            }

            case 'AFTER_ATTRIBUTE_NAME': {
                if (char === '=') {
                    state = 'BEFORE_ATTRIBUTE_VALUE'
                } else if (!/\s/.test(char)) {
                    // 不是空格
                    state = 'ATTRIBUTE_NAME';
                    currentAttrName = '';
                    continue;
                }
            }
            
            case 'BEFORE_ATTRIBUTE_VALUE': {
                if (char === '"' || char === "'") {
                    state = 'ATRIBUTE_VALUE'
                    currentQuote = char
                    currentAttrValue = ''
                } else if (!/\s/.test(char)) {
                    // 说明是不带引号属性值
                    state = 'ATTRIBUTE_VALUE_UNQUOTED'
                    currentAttrValue = ch
                }
                break;
            }

            case 'ATTRIBUTE_VALUE': {
                if (char === currentQuote) {
                    // 已结束，存储+重置
                    currentTag.attributes[currentAttrName] = currentAttrValue
                    state = 'AFTER_ATTRIBUTE_VALUE'
                } else {
                    currentAttrValue += char
                }
                break
            }
            case 'ATTRIBUTE_VALUE_UNQUOTED': {
                if (/\s/.test(char)) {
                    currentTag.attributes[currentAttrName] = currentAttrValue
                    state = 'BEFORE_ATTRIBUTE_NAME'
                } else if (char === '>') {
                    // 正确做法：直接结束当前标签
                    currentTag.attributes[currentAttrName] = currentAttrValue;
                    state = 'DATA'; // 回到普通文本解析状态
                } else {
                    currentAttrValue += char
                }
                break
            }
            case 'END_TAG_OPEN': {
                if (char === '>') {
                    while(stack.length > 1) {
                        const node = stack.pop();
                        if (node.tagName === endTagName.trim()) {
                            break
                        }
                    }
                    state = 'DATA'
                } else {
                    endTagName += char
                }
            }
        }

        i++
    }
    if (currentText.trim()) {
        stack[stack.length - 1].children.push({ type: 'text', content: currentText });
      }
    
    return root
}

const str = '<div>你好<!--这是个注释--></div>'
const res = parseHTML(str)

console.log(res)