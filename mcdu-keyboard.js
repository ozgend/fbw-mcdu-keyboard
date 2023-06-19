const _mcduFunctionKeys = {
  Tab: 'DIR',
  Insert: 'PROG',
  Home: 'PERF',
  PageUp: 'INIT',
  Enter: 'DATA',
  Delete: 'FPLN',
  End: 'RAD',
  PageDown: 'FUEL',
  Escape: 'MENU',
  Shift: 'AIRPORT',
  ArrowLeft: 'PREVPAGE',
  ArrowRight: 'NEXTPAGE',
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  Backspace: 'CLR',
  Space: 'SP',
  '.': 'DOT',
  '+': 'PLUSMINUS',
  '-': 'PLUSMINUS',
  '/': 'DIV',
  '*': 'OVFY',
};

const _mcduGetKey = (keyEvent) => {
  // match a single char
  if (keyEvent.key.length === 1 && keyEvent.key.match(/[\w\d]/i)) {
    return keyEvent.key.toLocaleUpperCase();
  }

  // match mcdu L/R row input for F keys
  if (keyEvent.key.match(/F\d+/)) {
    const fn = parseInt(keyEvent.key.replace('F', ''));
    return fn <= 6 ? `L${fn}` : `R${fn - 6}`;
  }
  // match mcdu function keys
  else {
    return _mcduFunctionKeys[keyEvent.key];
  }
};

let _mcduKeyboardInput = (keyEvent) => {
  console.log('event', keyEvent);
  keyEvent.preventDefault();

  const key = _mcduGetKey(keyEvent);

  if (!key) {
    return;
  }

  console.log(`mcdu key: ${key}`);

  window._mcduSoc?.send(`event:left:${key}`);
};

window.onbeforeunload = () => { return false; }
window._mcduSoc = new WebSocket(`ws://${window.location.host}/interfaces/v1/mcdu`);
window.addEventListener('keydown', _mcduKeyboardInput);
