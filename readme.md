## keyboard inputs for flybywire remote mcdu display

provides keyboard inputs for flybywire remote mcdu display on browser.

1. open remote mcdu display on browser (http://localhost:8380/interfaces/mcdu)
2. inject `mcdu-keyboard.js` into the page
3. good to go

### keyboard - mcdu key mapping

| keyboard code        | mcdu key  |
| -------------------- | --------- |
| `F1`-`F6`            | LSK1-LSK6 |
| `F7`-`F12`           | RSK1-RSK6 |
| `A-Z`                | A-Z       |
| `0-9`, Digit, Numpad | 0-9       |
| `Tab`                | DIR       |
| `Insert`             | PROG      |
| `Home`               | PERF      |
| `PageUp`             | INIT      |
| `Enter`              | DATA      |
| `NumpadEnter`        | DATA      |
| `Delete`             | FPLN      |
| `End`                | RAD       |
| `PageDown`           | FUEL      |
| `Escape`             | MENU      |
| `ShiftLeft`          | AIRPORT   |
| `ArrowLeft`          | PREVPAGE  |
| `ArrowRight`         | NEXTPAGE  |
| `ArrowUp`            | UP        |
| `ArrowDown`          | DOWN      |
| `Backspace`          | CLR       |
| `Space`              | SP        |
| `Period`             | DOT       |
| `Slash`              | DIV       |
| `Minus`              | PLUSMINUS |
| `NumpadSubtract`     | PLUSMINUS |
| `NumpadAdd`          | PLUSMINUS |
| `NumpadDecimal`      | DOT       |
| `NumpadDivide`       | DIV       |
| `NumpadMultiply`     | OVFY      |

### refs

- [fbw simbridge mcdu display](https://docs.flybywiresim.com/simbridge/simbridge-feature-guides/remote-displays/remote-mcdu/)
- [fbw mcdu interface doc](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/mcdu/interface/)
