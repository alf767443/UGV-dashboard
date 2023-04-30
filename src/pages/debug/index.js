import RobotWrapper from "pages/robot/styles/RobotWrapper";
// import RobotRegister from "pages/robot/RobotRegister";

const DebugPage = () => {
    return(
        <div>
            {/* <Login /> */}
            {/* <UploadImage /> */}
            <RobotWrapper>
                {/* <RobotRegister /> */}
            </RobotWrapper>
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