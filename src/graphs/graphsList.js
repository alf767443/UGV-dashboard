import battery from "./battery/index";
import motors from "./motors/index";

const list = {
    SimplePlot: [...battery.SimplePlot, ...motors.SimplePlot],
}

export default list