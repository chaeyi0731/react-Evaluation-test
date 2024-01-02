fetch('../info.json')
  // fetch 함수는 ../info.json  URL을 통해 서버로부터 데이터 가져온다.
  .then((response) => response.json())
  .then((data) => {
    // 이름을 성씨의 가나다 순으로 정렬
    const people = data.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    //sort는 배열의 요소를 받는다 첫번째 매개변수는 정렬 기준 , 두번째 매개변수는 정렬 순서를 나타낸다.

    // 이름을 클릭했을 때의 동작
    function onClickName(event) {
      const name = event.target.innerText;
      const person = people.find((p) => p.name === name);
      // 이름 목록에서 이름을 클릭했을 때 해당 사람의 정보를 화면에 표시하기 위해 onClickName 함수를 사용했다.

      if (person) {
        // 스타일 변경
        const allNames = document.querySelectorAll('li');
        allNames.forEach((n) => {
          n.style.color = '#919191';
          n.style.textAlign = 'center';
          const dot = n.querySelector('.dot');
          if (dot) n.removeChild(dot); // 기존 도트 제거
          if (n.innerText === name) {
            n.style.color = 'black';
            n.style.textAlign = 'end';
            const newDot = document.createElement('div'); // 새 도트 생성
            newDot.className = 'dot';
            n.appendChild(newDot); // 도트 추가
          }
        });

        // 텍스트 영역 업데이트
        document.querySelector('#bigIntro').innerText = `${person.name} 소개`;
        document.querySelector('#bigAdvan').innerText = `${person.name} 장점`;
        document.querySelector('#intro').innerText = person.intro;
        document.querySelector('#advan').innerText = person.advantage;
      }
    }

    // "Show" 버튼을 클릭했을 때의 동작
    function onSearch() {
      const inputName = document.querySelector('#search').value;
      // id search 의 값을 가져온다.
      const person = people.find((p) => p.name === inputName);
      // search의 값을 비교한다.

      if (person) {
        // 해당 내용으로 이동
        // 해당 내용이 json에서 가져온 값이 되어야한다.
        onClickName({ target: { innerText: inputName } });
      } else {
        // 모든 내용 숨기기
        document.querySelector('#bigIntro').innerText = '';
        document.querySelector('#bigAdvan').innerText = '';
        document.querySelector('#intro').innerText = '';
        document.querySelector('#advan').innerText = '';
      }
    }

    // 이름 목록 생성
    const ul = document.querySelector('ul');
    ul.innerHTML = '';
    people.forEach((p) => {
      const li = document.createElement('li');
      //li를 생성한다. li에는 클릭이벤트를 적용한다.
      //내용에는 json에서의 name을 가져온다.
      //li는 ul 안에 만든다.
      li.innerText = p.name;
      li.addEventListener('click', onClickName);
      ul.appendChild(li);
    });

    // "Show" 버튼에 이벤트 리스너 추가
    document.querySelector('button').addEventListener('click', onSearch);
  })
  // onSearch에서 이름의 값을 대조 한뒤 이름의 값이 같을 시 innerText에 json의 데이터를 받아온다.
  .catch((error) => console.error('Error:', error));
