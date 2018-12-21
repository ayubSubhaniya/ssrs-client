import React from "react";
import Section from "./Section";
import { Button, Link } from "./Button";
import Scrollable from "./Scrollable";
import Box from "./Box";
import Heading from './Heading';
const Demo = ({ openTour}) => (
  <div>
   
      <div style={{
        position: 'fixed',
        bottom: '2%',
        left: '1%'
      }}>
      <Button h="4" onClick={openTour} style={{fontWeight: 'bold', color: 'black'}}>
      <i class="fa fa-question-circle"></i> Help !
      </Button>
      </div>
      
  
      
      
    
  </div>
);

export default Demo;
