import { useState ,useEffect, useRef} from 'react';
import './App.css';

function App() {
  const YMDInput = useRef();
  const GRAInput = useRef();
  const CLAInput = useRef();
  const SEMInput = useRef();

  const [SEM, setSEM] = useState(0);
  const [YMD, setYMD] = useState(0);
  const [GRADE, setGRADE] = useState(0);
  const [CLASS, setCLASS] = useState(0);

  const SET = () => {
      fetch(`https://open.neis.go.kr/hub/hisTimetable?KEY=b6c91682e75c4125ace90f142a1bd501&Type=json&pIndex=1&pSize=10&ATPT_OFCDC_SC_CODE=F10&SD_SCHUL_CODE=7380292&AY=2022&SEM=${SEM}&ALL_TI_YMD=${YMD}&GRADE=${GRADE}&CLASS_NM=${CLASS}`,)
          .then((res) => res.json())
          .then((json) => {for(let i =0; i<7; i++){
              const inner = document.getElementById(`${i}`); 
              try{
                  inner.innerText = `${YMD} ${i+1}교시 ${json.hisTimetable[1].row[i].ITRT_CNTNT}`;
              }
              catch{
                  inner.innerText = `${YMD} ${i+1}교시 데이터값 없음`;
              }
          }})
  }

  useEffect(() => { // 처음 시작할 때 오늘의 시간표를 불러오는 유즈 이팩트
    const date = new Date();
    const year = String(date.getFullYear());
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth()+1).padStart(2, "0");
    const YYYYMMDD = `${year}${month}${day}`;
    const ymd = parseInt(YYYYMMDD);
    fetch(`https://open.neis.go.kr/hub/hisTimetable?KEY=b6c91682e75c4125ace90f142a1bd501&Type=json&pIndex=1&pSize=10&ATPT_OFCDC_SC_CODE=F10&SD_SCHUL_CODE=7380292&AY=2022&SEM=2&ALL_TI_YMD=${ymd}&GRADE=1&CLASS_NM=3`,)
          .then((res) => res.json())
          .then((json) => {for(let i =0; i<7; i++){
              const inner = document.getElementById(`${i}`); 
              try{ // 없는 값을 입력했을 때에 오류를 잡아주는 트라이 캐치문
                  inner.innerText = `Today ${i+1}교시 ${json.hisTimetable[1].row[i].ITRT_CNTNT}`;
              }
              catch{
                  inner.innerText = `Today ${i+1}교시 데이터값 없음`;
              } 
          }})
  },[])

  const handleChange = (event) => { // input에 변화가 일어났을 때에 Use State를 설정해주는 함수
    const Value = event.target.value;
      if(event.target.id === 'i2'){
          if(Value !== '1' && Value !== '2' && Value !== '3'){
            const P = document.getElementById('P');
            P.innerText = "학년은 1과 2와 3만 해당됩니다";
          }
          else{
            const P = document.getElementById('P');
            P.innerText = " ";
            setGRADE(Value);
          }
      }
      if(event.target.id === 'i1'){
          setYMD(Value);
      }
      if(event.target.id === 'i3'){
          setCLASS(Value);
      }
      if(event.target.id === 'i4'){
        if(Value !== '1' && Value !== '2'){
          const P = document.getElementById('P');
          P.innerText = "학기는 1과 2만 해당됩니다";
        }
        else{
          const P = document.getElementById('P');
          P.innerText = " ";
          setSEM(Value);
        }
      }
  }

  const onclick = () => {
    SET();
  }

  return (
    <div className="App" src="	http://www.yonexmall.com/images/banner/mainSlide/1440/2022/banner_0818.jpg
    ">
      <div className="inputs">
        <input onChange={handleChange} placeholder="날짜를 입력하세요(YYYYMMDD)" type="number" ref={YMDInput}  id="i1"/>
        <input onChange={handleChange} placeholder="학년을 입력하세요(n)" type="number" ref={GRAInput} id="i2"/>
        <input onChange={handleChange} placeholder="반을 입력하세요(n)" type="number" ref={CLAInput} id="i3"/>
        <input onChange={handleChange} placeholder="학기를 입력하세요(n)" type="number" ref={SEMInput} id="i4"/> <p id='P'></p>
        <button onClick={onclick}>검색 버튼</button>
      </div>
      <ul>
          <li id="0">1교시 </li>
          <li id="1">2교시 </li>
          <li id="2">3교시 </li>
          <li id="3">4교시 </li>
          <li id="4">5교시 </li>
          <li id="5">6교시 </li>
          <li id="6">7교시 </li>
      </ul>
    </div>
  );
}

export default App;