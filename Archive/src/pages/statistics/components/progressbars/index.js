import React, {useState, useEffect} from 'react';
import {ProgressBarWrapper} from './index.styled';

export default function Progressbar() {
	const [filled, setFilled] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	
	useEffect(() => {
		if (filled < 100 && isRunning) {
			setTimeout(() => setFilled(prev => prev += 1), 50)
		}
	},[filled, isRunning])
	
  return (
	  <ProgressBarWrapper>
      <h6 style={{ fontSize: "12px", color:"black", padding:"5px"}}>CHP-1</h6>
		  <div className="progressbar" onClick={() => {setIsRunning(true)}}>
			  <div style={{
				  height: "50%",
				  width: `${filled}%`,
				  transition:"width 0.2s"
			  }}>
				</div>
			  <span className="progressPercent">100%</span>
				</div>
				
		  {/* <button className="btn" onClick={() => {setIsRunning(true)}}>Run</button> */}
	</ProgressBarWrapper>
  )
}