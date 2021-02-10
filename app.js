const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range=document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const CANVAS_SIZE = 700;
const INITIAL_COLOR="#2c2c2c"

//canvas.width = 700;
//canvas.height=700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; // 시작할때의 기본 색 초기화 = 검정 
ctx.fillStyle = INITIAL_COLOR;// 채우기 기능 시작할때의 기본 색 초기화
ctx.lineWidth = 2.5; //range 버튼을 이용해 선의 두께 결정


let painting = false; // 페인팅의 디폴트 값은 false
let filling = false; // 채우기 값의 디폴트는 false


function stopPainting() { //마우스가 놓이면 stopPainting() 호출 페인팅이 다시 false
  painting = false;
}

function startPainting() {
    painting = true;
  }

function onMouseMove(event) { // 마우스 좌표 저장
  const x = event.offsetX; //offsetX 는 canvas 안 마우스의 x좌표
  const y = event.offsetY; //offsetY 는 canvas 안 마우스의 y좌표
  if(!painting){
    //console.log("creating path in",x,y);
      ctx.beginPath();
      ctx.moveTo(x,y); //// 여기까지함 
  } else{
     //console.log("creating line in",x,y);
      ctx.lineTo(x,y);
      ctx.stroke();
  }
}



function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle=color;
}
function handleRangeChange(event){
    const size = event.target.value; // target인지는 콘솔창에서 확인
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
      filling = false;
      mode.innerText = "Fill";
    } else {
      filling = true;
      mode.innerText = "Paint";
      ctx.fillStyle=ctx.strokeStyle;
      //strokeStyle은 색상표에서 선택한 색상
    }
  }
function handleCanvasClick() {
    if (filling) {
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
  }
  
function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}

if (canvas) {  //canvas가 있다면
  canvas.addEventListener("mousemove", onMouseMove); // canvas 안에서 움직임 감지
  canvas.addEventListener("mousedown", startPainting); // canvas 안에서 마우스의 클릭 감지
  canvas.addEventListener("mouseup", stopPainting); // canvas에서 마우스가 놓임을 감지
  canvas.addEventListener("mouseleave", stopPainting); // 마우스가 canvas에서 벗어나는것을 감지
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));



if(range){
    //range가 정의되지 않으면
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
  }


  if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
  }