import { Row, Button, Card , Alert} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Image from "next/legacy/image";

export default function Thanks(props) {
 
  const [id, setId] = useState("");
  const [link, setLink] = useState("")
  const [staticRandom, setStaticRandom] = useState("")
  const random = Math.floor(100000 + Math.random() * 900000);
  
    useEffect(() => {
      const test = () => {
        if(localStorage.getItem('isId')){
          var test_link = `https://trk.ultraind.in/pixel?adid=62b2e34fcf422d5bfe305554&sub1=${localStorage.getItem('isId')}`
          setLink(test_link)
        } else {
          localStorage.setItem('isId' , random)
          var test_link = `https://trk.ultraind.in/pixel?adid=62b2e34fcf422d5bfe305554&sub1=${localStorage.getItem('isId')}`
          setLink(test_link)
        }   
      }
       test()
    }, [])
   

    return (
      <div>
         <section>
             <Row>
          <div className="col-md-12 VKmt0" style={{  marginBottom: "10px" }}>
            <div
              className="add-area m-t-0"
              style={{
                width: "100%",
              }}
            >
              <div className="desktop-ads">
                {/* <img src="https://trk.ultraind.in/pixel?adid=62b2e34fcf422d5bfe305554&sub1={Lead_ID}" style={{width:"0px", height:"0px"}}/>
                <a src="http://skytechlimited.com/callback.php?t_id={clickid}&sub_affid1={pubid}" style={{width:"0px", height:"0px"}}/>
                <img src="https://xyno.gotrackier.com/pixel?av=62b1969d24fefc2ec03ed8af" style={{width:"0px", height:"0px"}}/> */}
                
                <a target="_blank" rel="noreferrer" href="https://carbike360.com">
                  <Image src="/images/Carbike360_Banner.jpg" width={728} height={90} alt="banner" layout="responsive" />
                </a>
                  
              </div>
              <div className="mobile-ads">
                {/* <img src="https://trk.ultraind.in/pixel?adid=62b2e34fcf422d5bfe305554&sub1={Lead_ID}" style={{width:"0px", height:"0px"}}/>
                <a src="http://skytechlimited.com/callback.php?t_id={clickid}&sub_affid1={pubid}" style={{width:"0px", height:"0px"}}/>
                <img src="https://xyno.gotrackier.com/pixel?av=62b1969d24fefc2ec03ed8af" style={{width:"0px", height:"0px"}}/> */}
                
                <a target="_blank" rel="noreferrer" href="https://carbike360.com">
                  <Image src="/images/Carbike360_Banner.jpg" width={728} height={90} alt="banner" layout="responsive" />
                </a>
              </div>
            </div>
          </div>
          
        </Row>
            
          <div className="startSurvey">
             <h2>Thanks for participating in the survey. <span style={{color:"darksalmon"}}>5 Lucky Winners</span> will be announced soon.
             </h2>
              <Button className="nextBtn" style={{width:"200px", marginTop:"30px"}}><a  href={"/"}>Home</a></Button>
            </div>
              
        </section>
            <img src="https://edsolutions.o18.click/p?o=18333536&m=4261&t=i" width="0px" height="0px"></img>
            <img src={link}></img>
      </div>
      
    );
}

