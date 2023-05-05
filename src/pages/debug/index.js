
/* eslint-disable no-unused-vars */
import GraphEditor from "components/GraphEditor/index";
import PlotTile from "components/Tiles/tableTile";

const DebugPage = () => {
    return(
        <div>
            <GraphEditor graphID={"6453e23840275ce9ed3eec2d"}/>
        </div>
    );
}

export default DebugPage

// var raw = (img) => JSON.stringify({
// 	"dataSource": "CeDRI",
// 	"database": "CeDRI_UGV_dashboard",
// 	"collection": "robot",
// 	"filter": {'name': 'Robot CeDRI - Magni'},
// 	"update": [
// 		{
// 			'$set': {
//         'img': img,
//       },
// 		}
// 	],
// });

// function handleMenuClick(e) {
//   console.log(e)
//   fetch('http://192.168.217.183:8000/update/', requestOptions(raw(e)))
//     .then(()=>console.log('Ok'))
//     .catch((error) => {
//       console.log(error);
//     });
// }