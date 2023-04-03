import battery from "./battery/index";
import motors from "./motors/index";
import log from "./log/index"
import maps from "./maps/index"
import nodes from "./nodes/index"
import cpu from "./computer/index"
import position from "./position/index"
import connection from "./connectivity/index"

const list = {
    SimplePlot: [...battery.SimplePlot, ...motors.SimplePlot, ...log.SimplePlot, ...maps.SimplePlot, ...nodes.SimplePlot, ...cpu.SimplePlot, ...position.SimplePlot, ...connection.SimplePlot],
    LargePlot:  [...battery.LargePlot, ...motors.LargePlot, ...log.LargePlot, ...maps.LargePlot, ...nodes.LargePlot, ...cpu.LargePlot, ...position.LargePlot, ...connection.LargePlot],
    BigPlot:    [...battery.BigPlot, ...motors.BigPlot, ...log.BigPlot, ...maps.BigPlot, ...nodes.BigPlot, ...cpu.BigPlot, ...position.BigPlot, ...connection.BigPlot],
}

export default list