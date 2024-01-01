fetch('../info.json')
  .then((response) => response.json())
  .then((data) => {
    // 이름을 성씨의 가나다 순으로 정렬
    const people = data.sort((a, b) => a.name.localeCompare(b.name, 'ko'));

    // 이름을 클릭했을 때의 동작
    function onClickName(event) {
      const name = event.target.innerText;
      const person = people.find((p) => p.name === name);

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
      const person = people.find((p) => p.name === inputName);

      if (person) {
        // 해당 내용으로 이동
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
      li.innerText = p.name;
      li.addEventListener('click', onClickName);
      ul.appendChild(li);
    });

    // "Show" 버튼에 이벤트 리스너 추가
    document.querySelector('button').addEventListener('click', onSearch);
  })
  .catch((error) => console.error('Error:', error));
