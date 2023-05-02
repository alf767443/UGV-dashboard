
/* eslint-disable no-unused-vars */
import RobotWrapper from "pages/robot/styles/RobotWrapper";
import UploadImage from "components/ImagePicker/index";
import ImageCarousel from "components/ImagePicker/carrousel";

const DebugPage = () => {
    return(
        <div>
            <RobotWrapper>
                {/* <RobotRegister /> */}
                {UploadImage(null)}
                <ImageCarousel />
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