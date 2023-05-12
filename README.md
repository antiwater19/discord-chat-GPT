# 프로젝트: GPT 3.5 Discord Chat Bot

프로젝트 기간: 2023.04.24 ~ 2023.05.13

프로젝트 동기: <br>카카오톡이나 라인같은 메신저보다는 디스코드 메신저를 친구들과 소통하는데 많이 쓰기 때문에
              친구들의 반응도 궁금하고 친구들과 같이 chatGPT를 캡쳐나 화면 공유를 통해 보여주는것보다
              디스코드 내에서 사용함으로써 즉석으로 공유가 가능하고 여러사람의 질문을 받을 수 있기 때문에 
              재미로 만들어 보기로 했다.

개발환경: <img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=#007ACC">, discord-developer-portal, <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=#5865F2">

사용된 것들 discord.js, <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=#CB3837">, <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">, discord-chat-gpt

사용된 API: OpenAI API, Discord API


### 

1. Clone the Github repo in your current directory

```bash
git clone https://github.com/notunderctrl/discord-chat-bot.git .
```

---

2. Install all the packages

- If you're using npm

```bash
npm install
```

- If you're using yarn

```bash
yarn
```

---

3. Run the bot

For development

- Using npm

```bash
npm run dev
```

- Using yarn

```bash
yarn dev
```

For production

- Using npm

```bash
npm run start
```
이걸 하게되면 nodmon을 사용하게 되는데 이것은
코드를 바로 바꾼후 저장을 하면 서버를 새로고침하면서
바로 피드백이 수정되게 된다.
- Using yarn

```bash
yarn start
```
