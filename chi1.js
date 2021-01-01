const http = require('http')
const url = require('url')
function requestHandler(request, response) {
  let params = url.parse(request.url, true)
  console.log(params.pathname)
  console.log(params.query)
  if (params.pathname === '/') {
    response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
    response.write(generateResponse(params.query))
    response.end()
  } else {
    response.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'})
    response.write(`NodeJSサーバーからの応答 : ${params.pathname} ${params.query.value}`)

    response.end()
  }
}
function generateResponse(query) {
  let message = numberGame(query)

  return `
<html lang="ja">

<head>
<meta charset="utf-8">
<title>数あてゲーム</title>
<style>
input[type="text"] { height: 40px; }
button { border-radius: 10px; padding: 10px;}
</style>
</head>

<body>
<form method="GET">
<input type="text" name="value" placeholder="１〜10の数値">
<button type="submit">回答する</button>
</form>
<h1>${message}</h1>
<a href="/">もう一度</a>
</body>

</html>
`
}

let number = 0

function numberGame(query) {

  if ('value' in query) {

    let value = parseInt(query.value)
    if (value == number) {
      message = `正解！ ${value}です`
    } else if (value > number) {
      message = `${value}よりもっと小さい数字です`
    } else if (value < number) {
      message = `${value}よりもっと大きな数字です`
    } else {
      message = '数字を入れてね'
    }
  } else {
    number = Math.floor(Math.random() * 9) + 1
    message = '数字を当ててね'
    console.log(number)
  }

  return message
}

const server = http.createServer(requestHandler)
server.listen(3000)