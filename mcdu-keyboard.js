const _mcduFunctionalKeys = {
  Tab: 'DIR',
  Insert: 'PROG',
  Home: 'PERF',
  PageUp: 'INIT',
  Enter: 'DATA',
  NumpadEnter: 'DATA',
  Delete: 'FPLN',
  End: 'RAD',
  PageDown: 'FUEL',
  Escape: 'MENU',
  ShiftLeft: 'AIRPORT',
  ArrowLeft: 'PREVPAGE',
  ArrowRight: 'NEXTPAGE',
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  Backspace: 'CLR',
  Space: 'SP',
  Minus: 'PLUSMINUS',
  NumpadSubtract: 'PLUSMINUS',
  NumpadAdd: 'PLUSMINUS',
  Period: 'DOT',
  NumpadDecimal: 'DOT',
  NumpadDivide: 'DIV',
  Slash: 'DIV',
  NumpadMultiply: 'OVFY',
};

const _mcduGetKey = (keyEvent) => {
  // match mcdu L/R row input for F keys
  if (keyEvent.code.match(/F\d+/)) {
    const fn = parseInt(keyEvent.code.replace('F', ''));
    return fn <= 6 ? `L${fn}` : `R${fn - 6}`;
  }

  // match a-z
  if (keyEvent.code.match(/Key[A-Z]/)) {
    return keyEvent.code.replace('Key', '').toLocaleUpperCase();
  }

  // match 0-9
  if (keyEvent.code.match(/(Digit|Numpad)\d/i)) {
    return keyEvent.code.replace(/Digit|Numpad/i, '').toLocaleUpperCase();
  }

  // match mcdu function keys
  return _mcduFunctionalKeys[keyEvent.code];
};

let _mcduKeyboardInput = (keyEvent) => {
  //console.log('event', { key: keyEvent.key, code: keyEvent.code });
  const key = _mcduGetKey(keyEvent);

  if (key) {
    keyEvent.preventDefault();
    keyEvent.stopPropagation();
  } else {
    return;
  }

  console.log(`mcdu key: ${key}`);

  window._mcduSoc?.send(`event:left:${key}`);
};

window.onbeforeunload = () => { return false; }
window._mcduSoc = new WebSocket(`ws://${window.location.host}/interfaces/v1/mcdu`);
window.addEventListener('keydown', _mcduKeyboardInput);
