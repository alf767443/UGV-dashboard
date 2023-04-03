// Simple plots
import AMCL_Yaw from "./AMCLyawDatetimeArea"
import Yaw from "./yawDatetimeArea"

const list = {
    SimplePlot:  [{
        plot: <AMCL_Yaw />,
        title: "AMCL yaw by time",
        label: "AMCL yaw by time",
        key: "AMCL-yaw-time-are",
    }, {
        plot: <Yaw />,
        title: "Odometry yaw by time",
        label: "Odometry yaw by time",
        key: "odometry-yaw-time-are",
    },],
    LargePlot:  [],
    BigPlot: [],
}

export default list