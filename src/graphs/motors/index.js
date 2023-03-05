// Simple plots
import CurrentDatetimeLine from "./currentDatetimeLine"
import MotorBullets from "./groupBullet"
import PWMDatetimeLine from "./PWMDatetimeLine"
import RrateDatetimeLine from "./rrateDatetimeLine"

const list = {
    SimplePlot: [
        {
            plot: <CurrentDatetimeLine />,
            title: "Motors currents by time",
            label: "Current by time",
            key: "motors-current-time-are",
        },
        {
            plot: <MotorBullets />,
            title: "Motors actual states",
            label: "Bullets",
            key: "motors-motors--bullet",
        },
        {
            plot: <PWMDatetimeLine />,
            title: "Motors PWM by time",
            label: "PWM by time",
            key: "motors-PWM-time-are",
        },
        {
            plot: <RrateDatetimeLine />,
            title: "Motors rotation rate by time",
            label: "Rotation rate by time",
            key: "motors-rrate-time-are",
        },
    ],
}

export default list