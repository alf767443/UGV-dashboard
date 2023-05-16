
/* eslint-disable no-unused-vars */
import GraphEditor from "components/GraphEditor/index";
import DashboardLayout from "components/gridLayout/index";

const DebugPage = () => {
    return(
        <DashboardLayout edit={true}/>
        // <GraphEditor graphID={"6453e23840275ce9ed3eec2d"}/>
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
//   //console.log(e)
//   fetch('http://192.168.217.183:8000/update/', requestOptions(raw(e)))
//     .then(()=>//console.log('Ok'))
//     .catch((error) => {
//       //console.log(error);
//     });
// }