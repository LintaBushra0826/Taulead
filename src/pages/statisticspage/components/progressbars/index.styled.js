// ProgressBar.styled.js
import styled from 'styled-components';

export const ProgressBarWrapper = styled.div`
overflow: scroll;

.progressbar{
	position: relative;
	overflow: hidden;
	width: 270px;
	height: 15px;
	border-radius: 10px;
	background-color: #061161;
}

.progressPercent{
	font-weight: 600;
	font-family:'Franklin Gothic Medium';
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	color: white;
	/* text-shadow: -1px 0 #555, 0 1px #555, 1px 0 #555, 0 -1px #555; */
}

/* .btn{
	display: block;
	margin: 5rem auto;
	border: none;
	border-radius: 3px;     
	outline: none;
	width: 100px;
	height: 40px;
	background-color: #937DC2;
	transition: box-shadow 0.5s;
	font-size: 16px;
	font-family:arial;
	color: #fff;
	cursor: pointer;
}

.btn:hover{
	-webkit-box-shadow: inset 100px 0 0 0 #7c54d1;
    box-shadow: inset 100px 0 0 0 #7c54d1;
} */

`;

export default ProgressBarWrapper;
