import * as d3 from 'd3';
import { d3keybinding } from '../lib/d3.keybinding.js';
import { uiFlash } from '../ui/index';


/* Creates a keybinding behavior for an operation */
export function behaviorOperation(context) {
    var which, keybinding;


    var behavior = function () {
        if (which) {
            keybinding = d3keybinding('behavior.key.' + which.id);
            keybinding.on(which.keys, function() {
                d3.event.preventDefault();
                if (which.available() && !which.disabled() && !context.inIntro()) {
                    which();
                }
                uiFlash().text('you did ' + which.title);
            });
            d3.select(document).call(keybinding);
        }
        return behavior;
    };


    behavior.off = function() {
        if (keybinding) {
            d3.select(document).call(keybinding.off);
        }
    };


    behavior.which = function (_) {
        if (!arguments.length) return which;
        which = _;
        return behavior;
    };


    return behavior;
}
