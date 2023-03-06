import battery from "./battery/index";
import motors from "./motors/index";
import log from "./log/index"
import maps from "./maps/index"
import nodes from "./nodes/index"

const list = {
    SimplePlot: [...battery.SimplePlot, ...motors.SimplePlot, ...log.SimplePlot, ...maps.SimplePlot, ...nodes.SimplePlot],
    LargePlot:  [...battery.LargePlot, ...motors.LargePlot, ...log.LargePlot, ...maps.LargePlot, ...nodes.LargePlot],
    BigPlot:    [...battery.BigPlot, ...motors.BigPlot, ...log.BigPlot, ...maps.BigPlot, ...nodes.BigPlot],
}

export default list