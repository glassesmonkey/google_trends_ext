// content.js
function addButtons() {
  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    const risingValueDiv = item.querySelector('.rising-value');
    if (risingValueDiv && !risingValueDiv.querySelector('.custom-buttons')) {
      const buttonsDiv = document.createElement('div');
      buttonsDiv.className = 'custom-buttons';

      const compareButton = createButton('对比GPTS', () => handleButtonClick(item, 'compare'));
      const searchButton = createButton('搜索', () => handleButtonClick(item, 'search'));

      buttonsDiv.appendChild(compareButton);
      buttonsDiv.appendChild(searchButton);

      risingValueDiv.appendChild(buttonsDiv);
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

function handleButtonClick(item, action) {
  const labelText = item.querySelector('.label-text span');
  if (labelText) {
    const text = labelText.textContent.trim();
    if (action === 'compare') {
      const url = `https://trends.google.com/trends/explore?q=${encodeURIComponent(text)},gpts`;
      window.open(url, '_blank');
    } else if (action === 'search') {
      const url = `https://www.google.com.hk/search?q=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    }
  }
}

// 初始运行
function initializeExtension() {
  addButtons();
  // 每秒检查一次是否有新的项目需要添加按钮
  setInterval(addButtons, 1000);
}

// 等待页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
  initializeExtension();
}

// styles.css 保持不变
