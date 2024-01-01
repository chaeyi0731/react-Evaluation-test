// React 라이브러리와 그 안에 있는 useEffect와 useState라는 두 가지 훅을 가져온다.
// React 훅(Hook)은 React의 기능을 함수형 컴포넌트에서 사용할 수 있게 해주는 기능
//!(후에 노션에 정리할것)

import React, { useEffect, useState } from 'react';
import './App.css';
import info from './info.json';

const App = () => {
  const [people, setPeople] = useState([]);
  // 이 코드는 people이라는 상태와 그 상태를 변경하는 함수인 setPeople을 생성합니다. 초기 상태는 빈 배열
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
    const sortedPeople = info.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    setPeople(sortedPeople);
  }, []);

  const onClickName = (name) => {
    //이 코드는 이름을 클릭했을 때 실행되는 함수를 정의합니다. 이 함수는 선택된 이름을 selectedName 상태에 저장하고, 해당 이름의 사람 정보를 selectedPerson 상태에 저장
    setSelectedName(name);
    const person = people.find((p) => p.name === name);
    setSelectedPerson(person);
  };

  const onSearch = () => {
    const person = people.find((p) => p.name === searchName);
    setSelectedPerson(person);
  };

  return (
    <div id="root">
      <div className="width-50vw height-70vh border-4px flex align-items justifyContent-ard">
        <div className="width-10vw height-65vh">
          <ul>
            {people.map((person) => (
              <li
                key={person.name}
                onClick={() => onClickName(person.name)}
                style={{
                  color: selectedName === person.name ? 'black' : '#919191',
                  textAlign: selectedName === person.name ? 'end' : 'center',
                }}
              >
                {person.name}
                {selectedName === person.name && <div className="dot"></div>}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-1px height-65vh"></div>
        <div className="width-30vw height-65vh flex justifyContent-ard flexDirection-co">
          <div className="width-30vw height-50vh flex justifyContent-ard align-items flexDirection-co">
            <div className="width-25vw height-5vh font-2em fontColor-919191" id="bigIntro">
              {selectedPerson ? `${selectedPerson.name} 소개` : ''}
            </div>
            <div className="width-25vw height-20vh fontSize-9 fontAlign-jus fontColor-919191" id="intro">
              {selectedPerson ? selectedPerson.intro : ''}
            </div>
            <div className="width-25vw height-5vh font-1-5 fontColor-919191" id="bigAdvan">
              {selectedPerson ? `${selectedPerson.name} 장점` : ''}
            </div>
            <div className="width-25vw height-15vh fontSize-9 fontAlign-jus fontColor-919191" id="advan">
              {selectedPerson ? selectedPerson.advantage : ''}
            </div>
          </div>
          <div className="width-30vw height-10vh flex justifyContent-ard align-items flexDirection-co">
            <input
              className="width-25vw height-4vh fontSize-8 bgc-white borderRadius-10"
              id="search"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Write your name."
            />
            <button className="width-25vw height-4vh fontColor-white borderRadius-10 bgc-9191914D font-16" onClick={onSearch}>
              Show
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
