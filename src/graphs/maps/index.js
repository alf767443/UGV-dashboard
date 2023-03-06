// Big plots
import HeatMapConnectivity from './heatmaps/connectivityHeatmap'
import HeatMapPosition from './heatmaps/positionHeatmap'
import HeatMapRTT from './heatmaps/RTTHeatmap'

import PointMapPosition from './pointmaps/positionMap'
import PointMapTrack from './pointmaps/trackMap'

const list = {
    BigPlot: [
        {
            plot: <HeatMapConnectivity />,
            title: "Connectivity heatmap",
            label: "Connectivity heatmap",
            key: "map-heat-connectivity-map",
        },
        {
            plot: <HeatMapPosition />,
            title: "Position heatmap",
            label: "Position heatmap",
            key: "map-heat-position-map",
        },
        {
            plot: <HeatMapRTT />,
            title: "RTT heatmap",
            label: "RTT heatmap",
            key: "map-heat-RTT-map",
        },
        {
            plot: <PointMapPosition />,
            title: "Position map",
            label: "Position map",
            key: "map-point-position-map",
        },
        {
            plot: <PointMapTrack />,
            title: "Breadcrumbs map",
            label: "Breadcrumbs map",
            key: "map-point-breadcrumbs-map",
        },
    ],
}

export default list