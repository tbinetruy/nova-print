function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function getThemeColor(hex, opacity, inverse = false) {
  const {r, g, b} = hexToRgb(hex);
  let rgb = `rgba(${r},${g},${b},${opacity})`;
  if (inverse) {
    rgb = `rgba(${255 - r},${255 - g},${255 - b},${opacity})`;
  }
  return rgb;
}

const copyToClipboard = str => {
  var textField = document.createElement("textarea");
  textField.innerText = str;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
};

export {getThemeColor, copyToClipboard};
