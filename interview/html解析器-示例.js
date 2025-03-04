function parseHTML(input) {
    let i = 0;
    let state = 'DATA';  // 初始状态：处理文本
    let currentText = '';
    let currentTag = null;
    let currentAttrName = '';
    let currentAttrValue = '';
    let currentQuote = null;
    let endTagName = '';
    let currentComment = '';
    let currentDoctype = '';
    
    const root = { type: 'root', children: [] };
    const stack = [root];
  
    while (i < input.length) {
      const ch = input[i];
  
      switch (state) {
        case 'DATA':
          if (ch === '<') {
            // 先判断下一个字符
            const nextCh = input[i + 1];
            // 如果下一个字符不符合标签开始要求，则把 '<' 当作文本
            if (nextCh !== '!' && nextCh !== '/' && !/[a-zA-Z]/.test(nextCh)) {
              currentText += ch;
            } else {
              // 之前累积的文本存入节点
              if (currentText) {
                stack[stack.length - 1].children.push({ type: 'text', content: currentText });
                currentText = '';
              }
              // 如果遇到 '<!'，判断是否为注释或 DOCTYPE
              if (nextCh === '!') {
                if (input.substr(i, 4) === '<!--') {
                  state = 'COMMENT';
                  currentComment = '';
                  i += 3; // 跳过 "<!--"
                } else if (input.substr(i, 9).toUpperCase() === '<!DOCTYPE') {
                  state = 'DOCTYPE';
                  currentDoctype = '';
                  i += 8; // 跳过 "<!DOCTYPE"
                } else {
                  // 不是合法的 <! 声明，视为文本
                  currentText += ch;
                }
              } else {
                state = 'TAG_OPEN';
              }
            }
          } else {
            currentText += ch;
          }
          break;
  
        case 'TAG_OPEN':
          if (ch === '/') {
            state = 'END_TAG_OPEN';
            endTagName = '';
          } else if (/[a-zA-Z]/.test(ch)) {
            state = 'TAG_NAME';
            currentTag = { type: 'element', tagName: '', attributes: {}, children: [] };
            continue; // 重新处理当前字符作为标签名的首字符
          } else {
            // 如果不满足条件，则把 '<' 视为文本，再回到 DATA 状态
            currentText += '<' + ch;
            state = 'DATA';
          }
          break;
  
        case 'TAG_NAME':
          if (/\s/.test(ch)) {
            state = 'BEFORE_ATTRIBUTE_NAME';
          } else if (ch === '>') {
            stack[stack.length - 1].children.push(currentTag);
            stack.push(currentTag);
            currentTag = null;
            state = 'DATA';
          } else {
            currentTag.tagName += ch;
          }
          break;
  
        case 'BEFORE_ATTRIBUTE_NAME':
          if (ch === '>') {
            stack[stack.length - 1].children.push(currentTag);
            stack.push(currentTag);
            currentTag = null;
            state = 'DATA';
          } else if (!/\s/.test(ch)) {
            state = 'ATTRIBUTE_NAME';
            currentAttrName = '';
            debugger
            continue;
          }
          break;
  
        case 'ATTRIBUTE_NAME':
          if (ch === '=') {
            state = 'BEFORE_ATTRIBUTE_VALUE';
          } else if (/\s/.test(ch)) {
            // 属性名无值（布尔属性）
            currentTag.attributes[currentAttrName] = true;
            state = 'AFTER_ATTRIBUTE_NAME';
          } else {
            currentAttrName += ch;
          }
          break;
  
        case 'AFTER_ATTRIBUTE_NAME':
          if (ch === '=') {
            state = 'BEFORE_ATTRIBUTE_VALUE';
          } else if (!/\s/.test(ch)) {
            state = 'ATTRIBUTE_NAME';
            currentAttrName = '';
            continue;
          }
          break;
  
        case 'BEFORE_ATTRIBUTE_VALUE':
          if (ch === '"' || ch === "'") {
            state = 'ATTRIBUTE_VALUE';
            currentQuote = ch;
            currentAttrValue = '';
          } else if (!/\s/.test(ch)) {
            state = 'ATTRIBUTE_VALUE_UNQUOTED';
            currentAttrValue = ch;
          }
          break;
  
        case 'ATTRIBUTE_VALUE':
          if (ch === currentQuote) {
            currentTag.attributes[currentAttrName] = currentAttrValue;
            state = 'BEFORE_ATTRIBUTE_NAME';
          } else {
            currentAttrValue += ch;
          }
          break;
  
        case 'ATTRIBUTE_VALUE_UNQUOTED':
          if (/\s/.test(ch) || ch === '>') {
            currentTag.attributes[currentAttrName] = currentAttrValue;
            state = 'BEFORE_ATTRIBUTE_NAME';
            continue;
          } else {
            currentAttrValue += ch;
          }
          break;
  
        case 'COMMENT':
          // 累积注释内容直到遇到 "-->"
          if (input.substr(i, 3) === '-->') {
            stack[stack.length - 1].children.push({ type: 'comment', content: currentComment });
            i += 2; // 跳过 "-->"
            state = 'DATA';
          } else {
            currentComment += ch;
          }
          break;
  
        case 'DOCTYPE':
          // 累积 DOCTYPE 内容直到遇到 '>'
          if (ch === '>') {
            stack[stack.length - 1].children.push({ type: 'doctype', content: currentDoctype.trim() });
            state = 'DATA';
          } else {
            currentDoctype += ch;
          }
          break;
  
        case 'END_TAG_OPEN':
          if (ch === '>') {
            // 弹出匹配的开始标签
            while (stack.length > 1) {
              const node = stack.pop();
              if (node.tagName === endTagName.trim()) {
                break;
              }
            }
            state = 'DATA';
          } else {
            endTagName += ch;
          }
          break;
  
        default:
          throw new Error(`未知状态：${state}`);
      }
      i++;
    }
  
    if (currentText.trim()) {
      stack[stack.length - 1].children.push({ type: 'text', content: currentText });
    }
  
    return root;
  }
  
  // 测试输入
  const htmlStr = `
  <!DOCTYPE html>
  <!-- This is a comment -->
  <div class="container">
    <h1>Hello, World!</h1>
    <p id="intro">This is a simple HTML parser using a state machine.</p>
  </div>
  `;
  
  console.log(JSON.stringify(parseHTML(htmlStr), null, 2));
  