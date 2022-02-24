const socket = io('/chattings');
//소켓을 다는 함수
const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

// global socket handler
socket.on('user_connected', (username) => {
  drawNewChat(`${username} connected`);
});
socket.on('new_chat', (data) => {
  const { chat, username } = data;
  drawNewChat(`${username}:${chat}`);
});

// event callback func
const handlesSubmit = (event) => {
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    // 화면에 그리기
    drawNewChat(`me: ${inputValue}`);
    event.target.elements[0].value = '';
  }
};

// draw func
const drawHelloStranger = (username) => {
  helloStrangerElement.innerText = `Hello ${username} Stranger :)`;
};
const drawNewChat = (message) => {
  const wrapperChatBox = document.createElement('div');
  const chatBox = `<div>${message}</div>`;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};


function helloUser() {
  const username = prompt(`What is your name`);
  // emit 서버-클라/클라-서버로 보낼 때 사용 on은 받을 때
  // 첫번째인자-이벤트이름, 두번째인자-데이터(서버에 보낼)
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
  // 이벤트 연결
  formElement.addEventListener('submit', handlesSubmit);
}

init();