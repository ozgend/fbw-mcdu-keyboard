// inject this script into the McduButton to get access to the socket
// webpack://fbw-simbridge/apps/mcdu/src/components/McduButtons.jsx

// window._mcduSoc = socket;

// ws://10.0.0.35:8380/interfaces/v1/mcdu

const _mcduOpts = {
  rowInput: false,
  rowInputToggleKey: 'Enter',
};

const _mcduNavKeys = {
  ArrowLeft: 'PREVPAGE',
  ArrowRight: 'NEXTPAGE',
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  Backspace: 'CLR',
  '.': 'DOT',
  '/': 'DIV',
  '+': 'PLUSMINUS',
  '-': 'PLUSMINUS',
};

const _mcduRowInputToggle = (isOn) => {
  _mcduOpts.rowInput = isOn;
  document.querySelectorAll('div.button-grid:first-child div.button').forEach(n => { n.style.border = _mcduOpts.rowInput ? 'solid 1px rgba(0,255,0,0.4)' : 'none' });
};

const _mcduGetKey = (keyEvent) => {
  // match mcdu L/R row input F keys with Enter toggle
  if (_mcduOpts.rowInput && keyEvent.key.match(/F\d+/)) {
    const fn = parseInt(keyEvent.key.replace('F', ''));
    return fn <= 6 ? `L${fn}` : `R${fn - 6}`;
  }
  // match a single char
  else if (keyEvent.key.length === 1 && keyEvent.key.match(/[\w\d]/i)) {
    return keyEvent.key.toLocaleUpperCase();
  }
  // match mcdu nav keys
  else {
    return _mcduNavKeys[keyEvent.key];
  }
};

let _mcduKeyboardInput = (keyEvent) => {
  console.log('event', keyEvent);

  if (keyEvent.key === _mcduOpts.rowInputToggleKey) {
    _mcduRowInputToggle(!_mcduOpts.rowInput);
    return;
  }

  if (keyEvent.key.match(/F\d+/)) {
    keyEvent.preventDefault();
  }

  const key = _mcduGetKey(keyEvent);

  if (!key) {
    return;
  }

  console.log(`mcdu key: ${key}`);
  window._mcduSoc?.send(`event:left:${key}`);

  _mcduRowInputToggle(false);
};

window._mcduSoc = new WebSocket(`ws://${window.location.host}/interfaces/v1/mcdu`);
window.onbeforeunload = () => { return false; }
window.addEventListener('keydown', _mcduKeyboardInput);
