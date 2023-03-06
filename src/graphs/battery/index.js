// Simple plots
import CurrentDatetimeArea from './currentDatetimeArea'
import PercentageDatetimeArea from './percentageDatetimeArea'
import VoltageDatetimeArea from './voltageDatetimeArea'
import PowerDatetimeArea from './powerDatetimeArea'
import BatteryBullets from './groupBullet'
import TemperatureDatetimeArea from './temperatureDatetimeArea'

const list = {
    SimplePlot: [
        {
            plot: <CurrentDatetimeArea />,
            title: "Battery current by time",
            label: "Current by time",
            key: "battery-current-time-are",
        },
        {
            plot: <PercentageDatetimeArea />,
            title: "Battery percentage by time",
            label: "Percent by time",
            key: "battery-percent-time-area",
        },
        {
            plot: <VoltageDatetimeArea />,
            title: "Battery voltage by time",
            label: "Voltage by time",
            key: "battery-voltage-time-area",
        },
        {
            plot: <PowerDatetimeArea />,
            title: "Battery power by time",
            label: "Power by time",
            key: "battery-power-time-area",
        },
        {
            plot: <TemperatureDatetimeArea />,
            title: "Battery temperature by time",
            label: "Temperature by time",
            key: "battery-temperature-time-bullet",
        },
        {
            plot: <BatteryBullets />,
            title: "Battery actual states",
            label: "Bullets",
            key: "battery-battery--bullet",
        },
    ],
    LargePlot:  [],
    BigPlot:    [],
}

export default list