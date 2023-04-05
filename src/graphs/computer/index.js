// Simple plots
import MemoryDatetimeArea from "./memoryDatetimeArea"
import CPUDatetimeline from './CPUDatetimeLine'
import CPUuserSunburst from './CPUuserSunburst'
import MemoryUserSunburst from './memoryuserSunburst'

const list = {
    SimplePlot: [
        {
            plot: <MemoryDatetimeArea />,
            title: "Memory percent by time",
            label: "Memory by time",
            key: "cpu-memory-time-area",
        },
        {
            plot: <CPUDatetimeline />,
            title: "CPU percent by time",
            label: "CPU by time",
            key: "cpu-cpu-time-area",
        },
        {
            plot: <CPUuserSunburst />,
            title: "CPU sunburst",
            label: "CPU sunburst",
            key: "cpu-user-sun-brush",
        },
        {
            plot: <MemoryUserSunburst />,
            title: "Memory sunburst",
            label: "Memory sunburst",
            key: "memory-user-sun-brush",
        },
    ],
    LargePlot: [],
    BigPlot:  [],
}

export default list