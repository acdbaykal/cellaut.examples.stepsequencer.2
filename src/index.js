import {CellAutArray, RuleMap} from "cellaut";
import {StepSequencerRender} from "cellaut.stepsequencer";
import domready from "domready";

const row_count = 500;
const row_length = 30;
const rule_2 = RuleMap(2);
const arr = CellAutArray(rule_2, row_length);
arr.generate(row_count);

domready(() => {
  /*eslint-disable no-undef*/
  const AudioContext  = window.AudioContext || window.webkitAudioContext;
  const render = StepSequencerRender(new AudioContext, 100);
  /*eslint-enable no-undef*/
  render(arr);
});
