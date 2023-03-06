import battery from "./battery/index";
import motors from "./motors/index";
import log from "./log/index"
import maps from "./maps/index"

const list = {
    SimplePlot: [...battery.SimplePlot, ...motors.SimplePlot],
    LargePlot:  [...log.LargePlot],
    BigPlot:    [...maps.BigPlot],
}

export default list