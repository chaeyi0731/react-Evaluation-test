import React, { useEffect, useState } from 'react';
import './App.css';
import info from './info.json';

const App = () => {
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    const sortedPeople = info.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    setPeople(sortedPeople);
  }, []);

  const onClickName = (name) => {
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
                  color: selectedPerson && selectedPerson.name === person.name ? 'black' : '#919191',
                  textAlign: selectedPerson && selectedPerson.name === person.name ? 'end' : 'center',
                }}
              >
                {person.name}
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
            <div className="width-25vw height-4vh fontSize-8 bgc-white borderRadius-10">
              <p className="marginLeft-50px fontColor-919191 font-16" id="search">
                Write your name.
              </p>
            </div>
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
