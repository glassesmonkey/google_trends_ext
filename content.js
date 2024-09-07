
// styles.css

// content.js
function addButtons() {
  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    const risingValueDiv = item.querySelector('.rising-value');
    if (risingValueDiv && !risingValueDiv.querySelector('.custom-buttons')) {
      const labelText = item.querySelector('.label-text span');
      if (labelText) {
        const text = labelText.textContent.trim();

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'custom-buttons';

        const compareButton = createButton('对比GPTS', () => {
          const url = `https://trends.google.com/trends/explore?q=${encodeURIComponent(text)},gpts`;
          window.open(url, '_blank');
        });

        const searchButton = createButton('搜索', () => {
          const url = `https://www.google.com.hk/search?q=${encodeURIComponent(text)}`;
          window.open(url, '_blank');
        });

        buttonsDiv.appendChild(compareButton);
        buttonsDiv.appendChild(searchButton);

        // 保存原始文本
        const originalText = risingValueDiv.textContent.trim();
        
        // 清空 rising-value div
        risingValueDiv.innerHTML = '';
        
        // 创建一个新的 span 来包含原始文本
        const textSpan = document.createElement('span');
        textSpan.textContent = originalText;
        
        // 将原始文本和按钮添加到 rising-value div
        risingValueDiv.appendChild(textSpan);
        risingValueDiv.appendChild(buttonsDiv);
      }
    }
  });
}

function createButton(text, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = 'custom-button';
  button.onclick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClick();
  };
  return button;
}

// Run the function initially and then every 2 seconds to catch dynamically loaded content
addButtons();
setInterval(addButtons, 2000);