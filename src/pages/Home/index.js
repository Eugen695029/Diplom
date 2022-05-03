import React, {useState, useEffect} from 'react'
import SpecialButton from '../../button/SpecialButton.jsx'
import ServiceCard from '../../component/ServiceCard.js'
import classes from './Home.module.css'
import videStreamIMG from '../../img/video-stream.png'
import paymentIMG from '../../img/payment.png'
import encyclopediaIMG from '../../img/encyclopedia.png'
import contentManagementIMG from '../../img/content-management.png'
import videoMarketingIMG from '../../img/video-marketing.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { v4 } from 'uuid'

export default function Home() {
        const [advertisement,setAdvertisement] = useState([]);
        useEffect(() => {
            if(localStorage.token){
                axios.post(`http://localhost:3001/advertisement?companyName=${localStorage.company}`)
                .then((resp) => {
                  const allAdvertisement = resp.data.advertisementInfo;
                  setAdvertisement(allAdvertisement);
                }).catch((e) => {
                  alert(e.message)
                });
            }
        }, [setAdvertisement]);
    
    const advertisementReturn = advertisement.map((obj) => {return [<div key={v4()} className={classes.item}><div key={v4()} className={classes.card}><h1>{obj.title}</h1><p>{obj.text}</p></div></div>]});
        return (
            <div className={classes.mainContainer}>
                <div className={classes.container1}>
                    <ServiceCard title="Droom" text="Сервис видео конференций" img={videStreamIMG} goTo={'/createConference'} />
                    <ServiceCard title="" text="Телефонный справочник" img={encyclopediaIMG} goTo={'/telephoneDirectory'} />
                    <ServiceCard title="" text="Настройки рабочего стола" img={contentManagementIMG} goTo={'/settingContainer'} />
                    {
                        localStorage.role == 2 ? 
                        
                        <div></div>
                        :
                        <ServiceCard title="" text="Объявления" img={videoMarketingIMG} goTo={'/advertisement'} />
                    }
                    
                </div>
                {
                    localStorage.token != null ?

                    <div className={classes.container2}>
                    <Carousel>
                        {advertisementReturn}
                    </Carousel>
                    </div>
                    :
                    <div></div>
                }
            </div>
        );
}
