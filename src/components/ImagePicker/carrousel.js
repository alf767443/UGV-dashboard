


import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { djangoFetch } from 'API/url';
import UploadImage from './index';

// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = error => reject(error);
//     });
//   }



class ImageCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: {
                dots: true,
                infinite: false,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 0,
                centerMode: true,
            },
            robots: null,
        }
    }
    

    componentDidMount(){
        djangoFetch('/robot', '/?name=', 'GET', '')
            .then((response) => response.json())
            .then((json) => {
                this.setState({robots: json})
            })
            .catch((e) => console.error(e))
    }

    render(){    
        ////console.log(this.state.robots)
        if(this.state.robots !== null){
            ////console.log(this.state.robots.map((robot, index)  => {//console.log(robot); //console.log(index)}))
            return (
                <Slider {...this.state.settings}>
                    {this.state.robots.map((robot, index) => (
                        UploadImage(robot.img)
                    ))}
                </Slider>
            )
        }
        else{
            <div></div>
        }
        
    }
}

export default ImageCarousel;
