// Keyboard Script（键盘脚本）
// 为光标前的每个字中间插入空格；如果输入框中无文本，则获取剪切板文本然后插入空格。
// Insert space between every character before the cursor. 
// If there's no text, get the content from the clipboard and insert space.

var text = "";
if (!$keyboard.hasText) {
  text = $clipboard.text;
} else {
  text = $keyboard.textBeforeInput;
}

// no keyboard text and get undefined in keyboard.
if (text === undefined) {
  return;
}

const items = text.split("");
const joined = items.join(" ");
for (i = 1; i <= joined.length; i++) {
  $keyboard.delete();
}
$keyboard.insert(joined);

// insert a space if there are character(s) after the cursor
if ($keyboard.textAfterInput.length > 0) {
  $keyboard.insert(" ");
}
